# Graph Report - Blackjack-Analyst  (2026-11-27)

## Corpus Check
- 15 files · ~5,206 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 74 nodes · 130 edges · 9 communities (7 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8da37332`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- rules.js
- Application Interface and Guide
- steps
- Simulation and Results
- Project Configuration
- simulation.js
- Project instructions
- core.test.js
- Roadmap

## God Nodes (most connected - your core abstractions)
1. `getHandValue()` - 9 edges
2. `simulateRound()` - 8 edges
3. `simulateHand()` - 6 edges
4. `dealerStrategy()` - 6 edges
5. `runSimulation()` - 6 edges
6. `Roadmap` - 6 edges
7. `Monte Carlo simulation of starting hands` - 6 edges
8. `buildCSV()` - 5 edges
9. `generateAllHands()` - 5 edges
10. `winInterval()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `buildCSV()` --calls--> `getHandValue()`  [EXTRACTED]
  js/csv.js → js/rules.js
- `simulateRound()` --calls--> `createDeck()`  [EXTRACTED]
  js/simulation.js → js/rules.js
- `runSimulation()` --calls--> `generateAllHands()`  [EXTRACTED]
  js/app.js → js/simulation.js
- `runSimulation()` --calls--> `simulateHand()`  [EXTRACTED]
  js/app.js → js/simulation.js
- `buildCSV()` --calls--> `winInterval()`  [EXTRACTED]
  js/csv.js → js/simulation.js

## Import Cycles
- None detected.

## Communities (9 total, 2 thin omitted)

### Community 0 - "rules.js"
Cohesion: 0.54
Nodes (7): dealerStrategy(), getHandValue(), isFiveCardCharlie(), isSoftHand(), playerStrategy(), shuffleDeck(), simulateRound()

### Community 1 - "Application Interface and Guide"
Cohesion: 0.17
Nodes (11): Blackjack Analyst application page, Results table and CSV export controls, Simulation mode and sample-size controls, Player and dealer rule controls, Blackjack Analyst README, Grouped and per-hand CSV export, Five-Card Charlie game mode, Fixed-threshold player and dealer strategy (+3 more)

### Community 2 - "steps"
Cohesion: 0.15
Nodes (12): jobs, test, name, on, pull_request, push, run, uses (+4 more)

### Community 3 - "Simulation and Results"
Cohesion: 0.53
Nodes (6): runSimulation(), sortResults(), state, displayResults(), updateProgress(), updateUI()

### Community 4 - "Project Configuration"
Cohesion: 0.33
Nodes (5): name, private, scripts, test, type

### Community 7 - "core.test.js"
Cohesion: 0.36
Nodes (4): buildCSV(), exportCSV(), simulateHand(), winInterval()

### Community 8 - "Roadmap"
Cohesion: 0.29
Nodes (6): Direction, Later, Next, Not planned, Now, Roadmap

## Knowledge Gaps
- **1 isolated node(s):** `Freshly shuffled single deck per round`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 26 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Freshly shuffled single deck per round` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._