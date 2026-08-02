/** Educational cycle markers for the historical BTC chart — not forecasts. */

export type BtcHistoryPoint = {
  /** Unix seconds (UTC) */
  t: number;
  /** Close / market price USD */
  c: number;
};

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

export function toChartTime(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
