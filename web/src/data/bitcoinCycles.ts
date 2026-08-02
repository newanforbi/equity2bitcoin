/** Educational cycle markers for the historical BTC chart — not forecasts. */

import { BTC_FUTURE_SCENARIO, BTC_REFERENCE } from "../config/site";

export type BtcHistoryPoint = {
  /** Unix seconds (UTC) */
  t: number;
  /** Close / market price USD */
  c: number;
};

export type BtcProjectionWaypoint = {
  time: number;
  priceUsd: number;
  label: string;
  /** Marker placement on the dashed series */
  position: "aboveBar" | "belowBar";
  color: string;
  shape: "arrowUp" | "arrowDown" | "circle";
};

/** End-of-year 2026 illustrative low — same $35k reference the calculator uses. */
export const BTC_PROJECTION_YEAR_END_LOW: BtcProjectionWaypoint = {
  time: Date.UTC(2026, 11, 31) / 1000,
  priceUsd: BTC_REFERENCE.priceUsd,
  label: `2026 low $${(BTC_REFERENCE.priceUsd / 1000).toFixed(0)}k`,
  position: "belowBar",
  color: "#c45c4a",
  shape: "arrowUp",
};

/** Nov 2029 illustrative high — same $450k scenario the calculator uses. */
export const BTC_PROJECTION_END: BtcProjectionWaypoint = {
  time: Date.UTC(2029, 10, 1) / 1000,
  priceUsd: BTC_FUTURE_SCENARIO.priceUsd,
  label: `2029 scenario $${(BTC_FUTURE_SCENARIO.priceUsd / 1000).toFixed(0)}k`,
  position: "aboveBar",
  color: "#e0c56a",
  shape: "arrowDown",
};

export const BTC_PROJECTION_WAYPOINTS: BtcProjectionWaypoint[] = [
  BTC_PROJECTION_YEAR_END_LOW,
  BTC_PROJECTION_END,
];

export type BtcCycleAnnotation = {
  id: string;
  peakLabel: string;
  troughLabel: string;
  /** Approximate peak time (unix s) for marker placement */
  peakTime: number;
  troughTime: number;
  /** Stated drawdown for education copy */
  drawdownLabel: string;
  summary: string;
};

/**
 * Major completed-cycle peaks/troughs used in site education.
 * Dates approximate cycle extremes; drawdown labels match the disclosure language.
 */
export const BTC_CYCLE_ANNOTATIONS: BtcCycleAnnotation[] = [
  {
    id: "2013",
    peakLabel: "2013 peak",
    troughLabel: "2015 low",
    peakTime: Date.UTC(2013, 10, 30) / 1000,
    troughTime: Date.UTC(2015, 0, 14) / 1000,
    drawdownLabel: "≈ −85%",
    summary: "From the late-2013 high into the 2015 bottom, Bitcoin lost most of its value before the next cycle.",
  },
  {
    id: "2017",
    peakLabel: "2017 peak",
    troughLabel: "2018 low",
    peakTime: Date.UTC(2017, 11, 16) / 1000,
    troughTime: Date.UTC(2018, 11, 14) / 1000,
    drawdownLabel: "≈ −84%",
    summary: "After the 2017 blow-off top, the 2018 bear market erased the majority of the prior move.",
  },
  {
    id: "2021",
    peakLabel: "2021 peak",
    troughLabel: "2022 low",
    peakTime: Date.UTC(2021, 10, 10) / 1000,
    troughTime: Date.UTC(2022, 10, 21) / 1000,
    drawdownLabel: "≈ −77%",
    summary: "The 2021 high to the 2022 low again cut the market by roughly three-quarters — still life-changing if you borrowed against a home.",
  },
];

export async function loadBtcHistory(): Promise<BtcHistoryPoint[]> {
  const res = await fetch("/data/btc-usd-history.json");
  if (!res.ok) throw new Error(`Failed to load BTC history (${res.status})`);
  const body = (await res.json()) as { points: BtcHistoryPoint[] };
  return body.points.filter((p) => Number.isFinite(p.c) && p.c > 0 && Number.isFinite(p.t));
}

/**
 * Lightweight Charts spaces each bar equally — not by calendar time.
 * Our snapshot is ~4-day early history + daily from 2019, which stretches recent
 * years and crowds the x-axis. Weekly closes restore roughly even year spacing.
 */
export function downsampleToWeekly(points: BtcHistoryPoint[]): BtcHistoryPoint[] {
  if (points.length === 0) return [];
  const weekSec = 7 * 86_400;
  const out: BtcHistoryPoint[] = [];
  let bucket = Math.floor(points[0].t / weekSec);
  let last = points[0];
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    const b = Math.floor(p.t / weekSec);
    if (b !== bucket) {
      out.push(last);
      bucket = b;
    }
    last = p;
  }
  out.push(last);
  return out;
}

export function toChartTime(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function appendLogLinearSegment(
  out: BtcHistoryPoint[],
  from: BtcHistoryPoint,
  to: BtcHistoryPoint,
  weekSec: number,
): void {
  if (to.t <= from.t || from.c <= 0 || to.c <= 0) {
    out.push(to);
    return;
  }
  const log0 = Math.log(from.c);
  const log1 = Math.log(to.c);
  const span = to.t - from.t;
  for (let t = from.t + weekSec; t < to.t; t += weekSec) {
    const u = (t - from.t) / span;
    out.push({ t, c: Math.exp(log0 + u * (log1 - log0)) });
  }
  out.push(to);
}

/**
 * Dashed extension: last close → illustrative end-2026 $35k low → 2029 $450k scenario.
 * Log-linear between waypoints so it reads cleanly on the log chart. Not a forecast —
 * same fixed prices the calculator uses.
 */
export function buildIllustrativeProjection(history: BtcHistoryPoint[]): BtcHistoryPoint[] {
  if (history.length === 0) return [];
  const start = history[history.length - 1];
  if (start.c <= 0) return [start];

  const weekSec = 7 * 86_400;
  const out: BtcHistoryPoint[] = [{ t: start.t, c: start.c }];
  let prev = out[0];

  for (const wp of BTC_PROJECTION_WAYPOINTS) {
    if (wp.time <= prev.t) continue;
    const next = { t: wp.time, c: wp.priceUsd };
    appendLogLinearSegment(out, prev, next, weekSec);
    prev = next;
  }
  return out;
}

