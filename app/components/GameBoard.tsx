import { useState } from "react";
import SVGIcon from "./SVGIcon";

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

export default function GameBoard({
  setCurrentPlayer,
  setWinner,
  updateScore,
}: {
  setCurrentPlayer: (player: "X" | "O") => void;
  setWinner: (winner: string) => void;
  updateScore: (winner: "X" | "O") => void;
}) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(0);
  const [winnerCells, setWinnerCells] = useState(Array(3).fill(null));

  function checkWinner(cells: ("X" | "O")[]) {
    for (const line of winningLines) {
      const [a, b, c] = line.map((i: number) => cells[i]);
      if (a && a === b && a == c) {
        setWinner(a);
        updateScore(a);
        setWinnerCells(line);
        return;
      }
    }

    if (turn === 8) {
      setWinner("Draw");
    }
  }

  return (
    <div className="fill-foreground grid w-full max-w-100 grid-cols-3 gap-2 px-2">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => {
            if (cell || turn >= 9 || winnerCells[1]) return; // ignore if cell is already filled or game is over
            const newBoard = [...board];
            newBoard[index] = turn % 2 === 0 ? "X" : "O";
            checkWinner(newBoard);
            setBoard(newBoard);
            setTurn(turn + 1);
            setCurrentPlayer(turn % 2 === 0 ? "O" : "X");
          }}
          className={`bg-foreground/10 focus:bg-foreground/20 hover:bg-foreground/15 active:bg-foreground/25 flex aspect-square items-center justify-center rounded-lg transition-colors focus:outline-none ${winnerCells.includes(index) && "fill-primary"}`}
        >
          {cell == "X" ? (
            <SVGIcon name="cross" className="size-[50%]" />
          ) : cell == "O" ? (
            <SVGIcon name="circle" className="size-[50%]" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
