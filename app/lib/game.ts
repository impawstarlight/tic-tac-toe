import type { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

export type TicTacCell = "O" | "X" | null;

export type RoundState = {
  winner?: TicTacCell;
  winningLine?: number[];
  draw?: boolean;
} | null;

export type TicTacState = {
  cells: TicTacCell[];
  roundover: RoundState;
  score: { X: number; O: number };
  firstPlayer: string;
};

export function toPlayerSymbol(playerID: string): TicTacCell {
  return (playerID && (playerID === "0" ? "O" : "X")) || null;
}

export const TicTacGame: Game<TicTacState> = {
  setup: () => ({
    cells: Array(9).fill(null),
    roundover: null,
    score: { X: 0, O: 0 },
    firstPlayer: "1",
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    clickCell: ({ G, playerID }, index) => {
      if (G.roundover || G.cells[index] !== null) return INVALID_MOVE;
      G.cells[index] = toPlayerSymbol(playerID);

      console.log("clickCell");
      const winningLine = isVictory(G.cells);
      if (winningLine) {
        G.roundover = { winner: G.cells[index], winningLine };
        G.score[G.cells[index] as "X" | "O"]++;
      } else if (isDraw(G.cells)) G.roundover = { draw: true };
    },

    restartGame: ({ G }) => {
      G.cells.fill(null);
      G.roundover = null;
      // G.firstPlayer = { 0: "1", 1: "0" }[G.firstPlayer]!;
      // events.endTurn({ next: "0" });
    },

    resetGame: ({ G }) => {
      G.cells.fill(null);
      G.roundover = null;
      G.score = { X: 0, O: 0 };
      // G.firstPlayer = "1";
      // events.endTurn({ next: G.firstPlayer });
    },

    pass: () => {},
  },

  ai: {
    enumerate: (G) => {
      if (G.roundover) return [{ move: "pass", args: [] }];

      const moves = G.cells
        .map((cell, index) => ({
          move: "clickCell",
          args: [index],
        }))
        .filter((move, index) => !G.cells[index]);

      console.log(moves);
      if (moves.length === 9 && Math.random() <= 0.5)
        return [{ move: "pass", args: [] }];
      return moves;
    },
  },
};

function isVictory(cells: TicTacCell[]) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningLines.filter((line) =>
    line.every((i) => cells[i] !== null && cells[i] === cells[line[0]])
  )[0];
}

function isDraw(cells: TicTacCell[]) {
  return cells.every((cell) => cell !== null);
}
