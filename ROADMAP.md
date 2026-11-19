# Roadmap

Open directions for the blackjack starting-hand simulator. Each item leaves this file when it ships; git keeps finished plans. Every item has an issue with its plan.

## Direction

An honest, fast Monte Carlo explorer for every two-card start: say exactly which rules it plays, show how certain each number is, and export what it computed. Stay a static page with no dependencies.

## Now

**Tests in CI** (stated 2026-11-19, [#6](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/6)). The workflow builds Jekyll and never runs `npm test`. *Done when* every push runs `npm test` and a failing test fails the run.

## Next

**Simulations in a Web Worker** (stated 2026-11-19, [#4](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/4)). Keep the page responsive on large runs, and allow stopping one.

**Confidence intervals** (stated 2026-11-19, [#5](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/5)). Show how much each win rate could move between runs.

## Later

**Strategy scope** (stated 2026-11-19, [#7](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/7)). Add a basic-strategy player (dealer-upcard aware, with doubling and splitting) to compare against the threshold player.

## Not planned

**Betting, bankroll, or payouts.** The tool compares outcomes, not money.
