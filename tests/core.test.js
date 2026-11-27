import test from "node:test";
import assert from "node:assert/strict";
import {
  createDeck,
  getHandValue,
  isSoftHand,
  playerStrategy,
  dealerStrategy,
  isFiveCardCharlie,
} from "../js/rules.js";
import { generateAllHands, simulateHand, winInterval } from "../js/simulation.js";
import { buildCSV } from "../js/csv.js";
const cards = (...ranks) => ranks.map((rank) => ({ rank, suit: "♠" }));
test("deck and starting hands contain each unique combination once", () => {
  assert.equal(new Set(createDeck().map((c) => c.rank + c.suit)).size, 52);
  const hands = generateAllHands();
  assert.equal(hands.length, 1326);
  assert.equal(
    new Set(
      hands.map((h) =>
        h
          .map((c) => c.rank + c.suit)
          .sort()
          .join("|"),
      ),
    ).size,
    1326,
  );
});
test("aces adjust correctly and soft hands are recognized", () => {
  assert.equal(getHandValue(cards("A", "A", "9")), 21);
  assert.equal(getHandValue(cards("A", "K", "5")), 16);
  assert.equal(isSoftHand(cards("A", "6")), true);
  assert.equal(isSoftHand(cards("A", "6", "K")), false);
  assert.equal(isFiveCardCharlie(cards("2", "3", "4", "5", "6")), true);
  assert.equal(isFiveCardCharlie(cards("2", "3", "4", "5", "K")), false);
});
test("strategies respect thresholds and do not mutate inputs", () => {
  const hand = cards("A", "6");
  const deck = cards("2");
  assert.equal(dealerStrategy(hand, deck, 17, false).hand.length, 2);
  assert.equal(dealerStrategy(hand, deck, 17, true).hand.length, 3);
  assert.equal(playerStrategy(cards("5", "6"), cards("7"), 17).hand.length, 3);
  assert.equal(hand.length, 2);
  assert.equal(deck.length, 1);
});
test("simulation counts all rounds and produces bounded rates", () => {
  for (const mode of [false, true]) {
    const result = simulateHand(cards("A", "K"), 50, 17, 17, true, mode);
    assert.equal(result.wins + result.losses + result.ties, 50);
    assert.equal(result.total, 50);
    for (const key of ["winRate", "lossRate", "tieRate"])
      assert.ok(+result[key] >= 0 && +result[key] <= 100);
  }
});
test("CSV groups starting totals and includes detailed counts", () => {
  const hand = {
    hand: "A♠ K♠",
    cards: cards("A", "K"),
    winRate: "60.0",
    lossRate: "20.0",
    tieRate: "20.0",
    wins: 6,
    losses: 2,
    ties: 2,
    total: 10,
  };
  const csv = buildCSV({ hands: [hand] });
  assert.match(csv, /21,1,60\.00,\d+\.\d{2},\d+\.\d{2},20\.00,20\.00,6,2,2,10/);
  assert.match(csv, /"A♠ K♠",60\.0,\d+\.\d{2},\d+\.\d{2},20\.0,20\.0,6,2,2,10/);
});

test("the player threshold applies to soft hands: a soft 17 stands at 17", () => {
  const { hand } = playerStrategy(cards("A", "6"), cards("5", "5"), 17);
  assert.equal(hand.length, 2);
  assert.equal(isSoftHand(hand), true);
});

test("grouped CSV rates come from summed counts, not averaged rounded rates", () => {
  const h = (c, wins, total) => ({
    cards: c, wins, losses: total - wins, ties: 0, total,
    winRate: ((wins / total) * 100).toFixed(1),
    lossRate: (((total - wins) / total) * 100).toFixed(1),
    tieRate: "0.0",
  });
  const csv = buildCSV({ hands: [h(cards("10", "7"), 1, 3), h(cards("9", "8"), 1, 6)] });
  // 2 wins in 9 rounds is 22.22%; averaging 33.3 and 16.7 would give 25.00.
  assert.match(csv, /17,2,22\.22,\d+\.\d{2},\d+\.\d{2},77\.78,0\.00,2,7,0,9/);
});

test("Wilson interval handles boundaries and narrows with more rounds", () => {
  assert.deepEqual(winInterval(0, 0), { lower: 0, upper: 100 });
  assert.equal(winInterval(0, 100).lower, 0);
  assert.ok(Math.abs(winInterval(100, 100).upper - 100) < 1e-10);
  assert.ok(winInterval(45, 100).lower < 45);
  assert.ok(winInterval(45, 100).upper > 45);
  assert.ok(
    winInterval(450, 1000).upper - winInterval(450, 1000).lower <
      winInterval(45, 100).upper - winInterval(45, 100).lower,
  );
});
