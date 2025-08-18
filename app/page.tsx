"use client";
import { useState } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

export default function Page() {
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [gameBoardKey, setGameBoardKey] = useState(0);

  function restartGame() {
    setCurrentPlayer("X");
    setWinner("");
    setGameBoardKey(gameBoardKey + 1);
  }

  return (
    <div className="flex min-h-screen min-w-0 flex-col items-center gap-4">
      <ScoreBoard {...score} />

      <div
        className={`w-full text-center text-2xl font-bold ${winner && "text-primary"}`}
      >
        {winner == ""
          ? `Player ${currentPlayer} to move`
          : winner == "Draw"
            ? `It's a draw!`
            : `Player ${winner} wins!`}
      </div>

      <GameBoard
        key={gameBoardKey}
        setCurrentPlayer={setCurrentPlayer}
        setWinner={setWinner}
        updateScore={(winner: "X" | "O") => {
          setScore({ ...score, [winner]: score[winner] + 1 });
        }}
      />

      <div className="flex w-full max-w-100 justify-around gap-4 max-[360px]:flex-col max-[360px]:items-center">
        <button
          onClick={restartGame}
          className="bg-foreground/10 focus:bg-foreground/20 hover:bg-foreground/15 active:bg-foreground/25 rounded-full px-4 py-2 text-lg font-bold transition-colors focus:outline-none"
        >
          Restart Game
        </button>
        <button
          onClick={() => {
            setScore({ X: 0, O: 0 });
            restartGame();
          }}
          className="bg-foreground/10 focus:bg-foreground/20 hover:bg-foreground/15 active:bg-foreground/25 rounded-full px-4 py-2 text-lg font-bold transition-colors focus:outline-none"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
}
