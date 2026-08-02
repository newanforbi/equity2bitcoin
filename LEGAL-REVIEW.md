# Legal review checklist — pre-launch

**Status: NOT REVIEWED. Do not point a live domain at this site until counsel has signed
off on the items below.**

This site makes public, consumer-facing claims about a fee arrangement tied to home equity
borrowing and digital asset acquisition. That combination touches several regulatory
regimes at once. Every substantive claim is inventoried here with its source in
`Equity2Bitcoin_Business_Plan.pdf` so counsel can review the site against the plan it
implements.

Reviewer: ______________________  Date: __________  Sign-off: __________

---

## 1. The highest-priority items

### 1.1 The publisher's / Advisers Act exemption

**Where:** site-wide positioning; `/disclosures`; FAQ "Are you a registered investment adviser?"
**Plan basis:** §IV.C, "Investment Advisers Act of 1940 — SEC Publisher's Exemption."

**The question for counsel:** the publisher's exemption as construed in *Lowe v. SEC*
turns on publications being impersonal and of general and regular circulation. This
business delivers a **personalized** "Equity Profile Review," a customized written
"Readiness Report" built on an individual client's property and loan data, and one-on-one
consulting directed at a **specific asset**. Confirm whether the exemption reaches that
conduct, and if not, what registration or restructuring is required.

### 1.2 Fee contingent on loan closing

**Where:** homepage fee band; `/calculator`; FAQ "When do I pay"
**Plan basis:** §III.C — 30% of extracted equity, triggered at verified loan funding.

**The question for counsel:** a fee payable only upon a consumer's mortgage loan closing
raises questions under RESPA §8, TILA/Reg Z loan originator compensation, California
Financing Law, and state mortgage broker licensing. Confirm the fee is permissible as
structured in each state served.

### 1.3 UDAAP exposure on the fee itself

**Where:** entire site.
**Plan basis:** §III.C; §VII.F.

**The question for counsel:** a 30% fee on borrowed principal, secured by the consumer's
home, where the consumer is left immediately 30% underwater, is the kind of arrangement
examined under unfair/deceptive/abusive standards. **The site discloses this prominently**
(calculator subtracts the fee, homepage states it, FAQ states it). Confirm whether
disclosure is sufficient or the fee structure itself needs revisiting.

---

## 2. Claim inventory

| # | Claim | Where | Plan cite | Review |
|---|---|---|---|---|
| 2.1 | Not RIA / broker-dealer / mortgage broker / MLO / bank / lender / MTL | Footer, `/disclosures`, `/book` | §IV.C | Confirm per state |
| 2.2 | Never take custody of funds, loan proceeds, or digital assets | Footer, FAQ | §III.A, §IV.C | Confirm operational reality |
| 2.3 | Clients apply to licensed third-party lenders independently | How it works, FAQ | §III.B Phase 3 | Confirm not brokering in substance |
| 2.4 | 30% fee, charged once, at Phase 3 | Fees, `/calculator` | §III.C | See §1.2 |
| 2.5 | Fee not contingent on Bitcoin performance | Fees, FAQ | §III.C | Confirm distinction holds |
| 2.6 | "Bitcoin has declined more than 80% in every completed cycle" | Multiple | §I | Verify accuracy |
| 2.7 | Calculator outputs (borrowable, fee, net, monthly cost) | `/calculator` | §II.C, §III.F | Confirm not pre-qualification under ECOA/Reg B |
| 2.8 | Worked pricing example | Homepage | Appendix B math | Confirm illustrative framing |
| 2.9 | Foreclosure risk | FAQ, `/disclosures`, `/fit` | §VII.E | Confirm disclosure standards |
| 2.10 | Tax comment re: interest deductibility | `/fit`, FAQ | Plan tax discussion | Confirm / hedge / remove |
| 2.11 | Terms of service | `/terms` | — | **Drafted by non-counsel** |
| 2.12 | Privacy policy | `/privacy` | — | **Drafted by non-counsel**; CCPA/CPRA |

---

## 3. Deliberately excluded from the public site

| Excluded | Source | Why |
|---|---|---|
| Plan BTC price projections ($500K by 2029 / $1M by 2033) as plan marketing copy | Plan p.2 | Highest-risk retail claims — site instead uses a labeled calculator scenario only |
| Unlabeled / promised future BTC returns | — | Calculator may show an illustrative later-date USD value; must remain framed as scenario math, not a forecast |
| Treasury compounding projections | Plan p.2 | Investor-facing |
| Revenue/client projections | §VI | Investor-facing |
| "Best-performing asset class" / extreme return figures | §I | Promotional / cherry-picked |
| ARK Invest price targets | §I | Republishing adopts third-party forecast |
| §III.F worked example as written | §III.F | Contains a math error — see §4 |

---

## 4. Two errors in the source document, corrected on the site

**4.1 — Raw equity vs. tappable equity.** §III.F describes a $700,000 home with a
$400,000 mortgage as having "≈$300,000 in extractable equity." That is *raw* equity. At
80% LTV the borrowable figure is **$160,000**. The site uses LTV-based tappable equity
and labels paper equity separately. The homepage worked example uses Appendix B-style
inputs ($700K / $300K → $260K at 80% LTV).

**4.2 — BTC quantity ignores the fee.** §III.F concludes the client "owns 3–5 BTC" from a
$300,000 draw. After the fee only the net reaches Bitcoin. The site subtracts the fee
before any illustrative BTC quantity.

---

## 5. Before launch

- [ ] Counsel sign-off on §1 (all three items)
- [ ] Counsel review and rewrite of `/terms` and `/privacy`
- [ ] Verify or soften §2.6 cycle claims
- [ ] E&O insurance bound
- [ ] Milestone agreement finalized and consistent with site fee copy
- [ ] Confirm state-by-state where services may be offered
- [ ] Set `VITE_CALENDLY_URL` (and optional webhook)
- [ ] Update `BTC_REFERENCE` / `BTC_FUTURE_SCENARIO` prices and dates together, or remove those lines
- [ ] Counsel review of any forward BTC price scenario shown in `/calculator`
- [ ] Confirm `hello@equity2bitcoin.com` is monitored
- [ ] Re-review if analytics, ad pixel, CRM, or email capture is added
