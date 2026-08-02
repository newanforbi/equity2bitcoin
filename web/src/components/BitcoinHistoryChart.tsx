import { useEffect, useRef, useState } from "react";
import {
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type SeriesMarker,
  type Time,
  PriceScaleMode,
  TickMarkType,
} from "lightweight-charts";
import {
  BTC_CYCLE_ANNOTATIONS,
  downsampleToWeekly,
  loadBtcHistory,
  toChartTime,
  type BtcHistoryPoint,
} from "../data/bitcoinCycles";

function yearFromTime(time: Time): number {
  if (typeof time === "string") return Number(time.slice(0, 4));
  if (typeof time === "object") return time.year;
  return new Date(time * 1000).getUTCFullYear();
}

/** Year-only ticks on the all-time view — month/day labels were crowding 2020–2026. */
function btcHistoryTickMarkFormatter(time: Time, tickMarkType: TickMarkType): string | null {
  if (tickMarkType === TickMarkType.Year) return String(yearFromTime(time));
  return null;
}

function nearestPoint(points: BtcHistoryPoint[], target: number): BtcHistoryPoint {
  let best = points[0];
  let bestDist = Math.abs(best.t - target);
  for (const p of points) {
    const d = Math.abs(p.t - target);
    if (d < bestDist) {
      best = p;
      bestDist = d;
    }
  }
  return best;
}

export function BitcoinHistoryChart() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let series: ISeriesApi<"Area"> | null = null;
    let chart: IChartApi | null = null;

    const ro = new ResizeObserver(() => {
      if (!chartRef.current || !hostRef.current) return;
      chartRef.current.applyOptions({ width: hostRef.current.clientWidth });
    });

    (async () => {
      try {
        const rawPoints = await loadBtcHistory();
        // Uniform weekly bars → calendar years get roughly equal width on the x-axis.
        const points = downsampleToWeekly(rawPoints);
        if (cancelled || !hostRef.current) return;

        const height = Math.min(420, Math.max(300, Math.round(host.clientWidth * 0.42)));
        chart = createChart(host, {
          width: host.clientWidth,
          height,
          layout: {
            background: { type: ColorType.Solid, color: "transparent" },
            textColor: "#cfc7b6",
            fontFamily: "Manrope, system-ui, sans-serif",
            attributionLogo: false,
          },
          grid: {
            vertLines: { color: "rgba(212, 175, 55, 0.08)" },
            horzLines: { color: "rgba(212, 175, 55, 0.08)" },
          },
          rightPriceScale: {
            borderColor: "rgba(212, 175, 55, 0.2)",
            mode: PriceScaleMode.Logarithmic,
            entireTextOnly: true,
            // Keep margins tight on log scale — large % margins explode into multi-million headroom.
            scaleMargins: { top: 0.02, bottom: 0.02 },
          },
          timeScale: {
            borderColor: "rgba(212, 175, 55, 0.2)",
            // Keep all-time history readable; page scroll must not zoom the chart.
            minBarSpacing: 0.3,
            rightOffset: 2,
            tickMarkFormatter: btcHistoryTickMarkFormatter,
          },
          crosshair: {
            vertLine: { color: "rgba(212, 175, 55, 0.35)", labelBackgroundColor: "#1f1c18" },
            horzLine: { color: "rgba(212, 175, 55, 0.35)", labelBackgroundColor: "#1f1c18" },
          },
          // Drag to pan; pinch / axis drag to zoom. Wheel stays with the page.
          handleScroll: { mouseWheel: false, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: false },
          handleScale: { axisPressedMouseMove: true, mouseWheel: false, pinch: true },
        });

        series = chart.addAreaSeries({
          lineColor: "#d4af37",
          topColor: "rgba(212, 175, 55, 0.35)",
          bottomColor: "rgba(212, 175, 55, 0.02)",
          lineWidth: 2,
          priceFormat: {
            type: "custom",
            minMove: 0.01,
            formatter: (price: number) => {
              if (price >= 1000) return `$${Math.round(price).toLocaleString("en-US")}`;
              if (price >= 1) return `$${price.toFixed(2)}`;
              return `$${price.toPrecision(2)}`;
            },
          },
          // Clamp log autoscale so marker labels don't push the axis into multi-million nonsense.
          autoscaleInfoProvider: () => ({
            priceRange: { minValue: 0.05, maxValue: 250_000 },
          }),
        });

        const data = points.map((p) => ({
          time: toChartTime(p.t) as Time,
          value: p.c,
        }));
        series.setData(data);

        const markers: SeriesMarker<Time>[] = [];
        for (const cycle of BTC_CYCLE_ANNOTATIONS) {
          const peak = nearestPoint(points, cycle.peakTime);
          const trough = nearestPoint(points, cycle.troughTime);
          markers.push({
            time: toChartTime(peak.t) as Time,
            position: "aboveBar",
            color: "#d4af37",
            shape: "arrowDown",
            text: cycle.peakLabel,
          });
          markers.push({
            time: toChartTime(trough.t) as Time,
            position: "belowBar",
            color: "#c45c4a",
            shape: "arrowUp",
            text: `${cycle.troughLabel} ${cycle.drawdownLabel}`,
          });
        }
        markers.sort((a, b) => String(a.time).localeCompare(String(b.time)));
        series.setMarkers(markers);

        // All-time window (2010 → latest). Wheel zoom is off so page scroll cannot crop this.
        chart.timeScale().fitContent();
        chartRef.current = chart;
        ro.observe(host);
        requestAnimationFrame(() => {
          if (!cancelled && chart) chart.timeScale().fitContent();
        });
        setStatus("ready");
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setError(e instanceof Error ? e.message : "Could not load Bitcoin history");
        }
      }
    })();

    return () => {
      cancelled = true;
      ro.disconnect();
      chartRef.current = null;
      chart?.remove();
    };
  }, []);

  return (
    <div className="btc-history-chart">
      {status === "loading" && <p className="form-note">Loading all-time Bitcoin price history…</p>}
      {status === "error" && (
        <p className="form-note" style={{ color: "var(--danger)" }}>
          {error ?? "Could not load the chart."}
        </p>
      )}
      <div
        ref={hostRef}
        className="btc-history-chart-canvas"
        role="img"
        aria-label="Logarithmic chart of Bitcoin price in US dollars from 2010 through today, with major cycle peaks and troughs marked"
      />
      <p className="btc-history-chart-hint form-note">
        Log scale · weekly closes · drag to pan · pinch or drag axis to zoom · USD · static snapshot from 2010 (not a
        live feed; does not prefill the calculator)
      </p>
    </div>
  );
}
