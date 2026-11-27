import { getHandValue } from "./rules.js";
import { winInterval } from "./simulation.js";

export function buildCSV(results) {
  let csv = "";

  // Group hands by starting total value
  const groupedByTotal = {};

  results.hands.forEach((hand) => {
    const startingTotal = getHandValue(hand.cards);

    if (!groupedByTotal[startingTotal]) {
      groupedByTotal[startingTotal] = [];
    }
    groupedByTotal[startingTotal].push(hand);
  });

  // Group rates for each starting total
  csv += "GROUPED BY STARTING TOTAL\n";
  csv +=
    "Starting Total,Count,Win %,Win Lower 95 %,Win Upper 95 %,Loss %,Tie %,Total Wins,Total Losses,Total Ties,Total Simulations\n";

  // Sort by starting total (4 to 21)
  const sortedTotals = Object.keys(groupedByTotal)
    .map(Number)
    .sort((a, b) => a - b);

  sortedTotals.forEach((total) => {
    const hands = groupedByTotal[total];
    const count = hands.length;

    let totalWins = 0;
    let totalLosses = 0;
    let totalTies = 0;
    let totalSimulations = 0;

    hands.forEach((hand) => {
      totalWins += hand.wins;
      totalLosses += hand.losses;
      totalTies += hand.ties;
      totalSimulations += hand.total;
    });

    // Rates come from the summed counts, not from averaging rounded per-hand rates.
    const rate = (n) => (totalSimulations ? (n / totalSimulations) * 100 : 0).toFixed(2);
    const meanWinRate = rate(totalWins);
    const meanLossRate = rate(totalLosses);
    const meanTieRate = rate(totalTies);
    const interval = winInterval(totalWins, totalSimulations);

    csv += `${total},${count},${meanWinRate},${interval.lower.toFixed(2)},${interval.upper.toFixed(2)},${meanLossRate},${meanTieRate},${totalWins},${totalLosses},${totalTies},${totalSimulations}\n`;
  });

  // Add separator
  csv += "\n\nDETAILED HAND DATA\n";

  // Original detailed data
  csv += "Hand,Win %,Win Lower 95 %,Win Upper 95 %,Loss %,Tie %,Wins,Losses,Ties,Total\n";
  results.hands.forEach((hand) => {
    const interval = winInterval(hand.wins, hand.total);
    csv += `"${hand.hand}",${hand.winRate},${interval.lower.toFixed(2)},${interval.upper.toFixed(2)},${hand.lossRate},${hand.tieRate},${hand.wins},${hand.losses},${hand.ties},${hand.total}\n`;
  });

  return csv;
}

export function exportCSV(results) {
  if (!results) return;
  const csv = buildCSV(results);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "blackjack-simulation-complete.csv";
  a.click();
  window.URL.revokeObjectURL(url);
}
