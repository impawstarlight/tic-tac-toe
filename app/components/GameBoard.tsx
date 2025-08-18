import { useState } from "react";
import SVGIcon from "./SVGIcon";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // horizontal
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // vertical
  [0, 4, 8],
  [2, 4, 6], // diagonal
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
  const [cells, setCells] = useState(Array(9).fill(null));
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

    if (turn >= 8) {
      setWinner("Draw");
    }
  }

  return (
    <div className="fill-foreground bg-foreground/10 grid w-full max-w-100 grid-cols-3 gap-2">
      {cells.map((cell, index) => (
        <div
          className="bg-background relative flex aspect-square items-center justify-center"
          key={index}
        >
          <button
            key={index}
            onClick={() => {
              if (cell || turn >= 9 || winnerCells[1]) return; // ignore if cell is already filled or game is over
              const newCells = [...cells];
              newCells[index] = turn % 2 === 0 ? "X" : "O";
              checkWinner(newCells);
              setCells(newCells);
              setTurn(turn + 1);
              setCurrentPlayer(turn % 2 === 0 ? "O" : "X");
            }}
            className={`active:bg-primary/15 flex size-[80%] items-center justify-center rounded-full transition-colors focus:outline-none ${winnerCells.includes(index) && "bg-primary fill-background"}`}
          >
            <div className="absolute size-[125%]" />
            {cell == "X" ? (
              <SVGIcon name="cross" className="size-[50%]" />
            ) : cell == "O" ? (
              <SVGIcon name="circle" className="size-[50%]" />
            ) : null}
          </button>
        </div>
      ))}
    </div>
  );
}
