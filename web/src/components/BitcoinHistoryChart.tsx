import { useEffect, useRef, useState } from "react";
import {
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type SeriesMarker,
  type Time,
  PriceScaleMode,
} from "lightweight-charts";
import {
  BTC_CYCLE_ANNOTATIONS,
  loadBtcHistory,
  toChartTime,
  type BtcHistoryPoint,
} from "../data/bitcoinCycles";

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
        const points = await loadBtcHistory();
        if (cancelled || !hostRef.current) return;

        chart = createChart(host, {
          width: host.clientWidth,
          height: Math.min(420, Math.max(300, Math.round(host.clientWidth * 0.42))),
          layout: {
            background: { type: ColorType.Solid, color: "transparent" },
            textColor: "#cfc7b6",
            fontFamily: "Manrope, system-ui, sans-serif",
          },
          grid: {
            vertLines: { color: "rgba(212, 175, 55, 0.08)" },
            horzLines: { color: "rgba(212, 175, 55, 0.08)" },
          },
          rightPriceScale: {
            borderColor: "rgba(212, 175, 55, 0.2)",
            mode: PriceScaleMode.Logarithmic,
          },
          timeScale: {
            borderColor: "rgba(212, 175, 55, 0.2)",
          },
          crosshair: {
            vertLine: { color: "rgba(212, 175, 55, 0.35)", labelBackgroundColor: "#1f1c18" },
            horzLine: { color: "rgba(212, 175, 55, 0.35)", labelBackgroundColor: "#1f1c18" },
          },
          handleScroll: { mouseWheel: true, pressedMouseMove: true },
          handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
        });

        series = chart.addAreaSeries({
          lineColor: "#d4af37",
          topColor: "rgba(212, 175, 55, 0.35)",
          bottomColor: "rgba(212, 175, 55, 0.02)",
          lineWidth: 2,
          priceFormat: { type: "price", precision: 0, minMove: 1 },
        });

        series.setData(
          points.map((p) => ({
            time: toChartTime(p.t) as Time,
            value: p.c,
          })),
        );

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

        chart.timeScale().fitContent();
        chartRef.current = chart;
        ro.observe(host);
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
        Log scale · drag to pan · scroll to zoom · USD · static historical snapshot (not a live feed; does not
        prefill the calculator)
      </p>
    </div>
  );
}
