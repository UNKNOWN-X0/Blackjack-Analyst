# Roadmap

Open directions for the blackjack starting-hand simulator. Each item leaves this file when it ships; git keeps finished plans. Every item has an issue with its plan.

## Direction

An honest, fast Monte Carlo explorer for every two-card start: say exactly which rules it plays, show how certain each number is, and export what it computed. Stay a static page with no dependencies.

## Now

**Labels that match the rules** (stated 2026-11-19, [#2](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/2)). The player threshold says "Hard" but covers soft hands too. *Done when* no control says "Hard" for a rule that covers soft hands, and a test pins the behaviour.

**Exact grouped rates in the CSV** (stated 2026-11-19, [#3](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/3)). Group rates average rounded values. *Done when* each grouped rate equals its summed count over its rounds, with a test.

## Next

**Simulations in a Web Worker** (stated 2026-11-19, [#4](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/4)). Keep the page responsive on large runs, and allow stopping one.

**Confidence intervals** (stated 2026-11-19, [#5](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/5)). Show how much each win rate could move between runs.

**Tests in CI** (stated 2026-11-19, [#6](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/6)). The workflow builds Jekyll and never runs `npm test`.

## Later

**Strategy scope** (stated 2026-11-19, [#7](https://github.com/UNKNOWN-X0/Blackjack-Analyst/issues/7)). Stay a threshold explorer or add a basic-strategy comparison; waits on a decision.

## Not planned

**Betting, bankroll, or payouts.** The tool compares outcomes, not money.
