"use client";
import { useState } from "react";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";
import type { BoardProps } from "boardgame.io/react";
import type { TicTacState, TicTacCell, RoundState } from "../lib/game";
import { toPlayerSymbol } from "../lib/game";
import Button from "./Button";

export default function TicTacBoard({
  G,
  ctx,
  moves,
}: BoardProps<TicTacState>) {
  const currentPlayer = toPlayerSymbol(ctx.currentPlayer);
  const score = G.score;
  const roundover = G.roundover as RoundState;
  const winner = roundover?.winner;
  const winningLine = roundover?.winningLine;

  console.log("board");

  return (
    <div className="flex min-h-screen min-w-0 flex-col items-center gap-4">
      <ScoreBoard {...score} />

      <div
        className={`w-full text-center text-2xl font-bold ${
          winner && "text-primary"
        }`}
      >
        {!roundover
          ? `Player ${currentPlayer} to move`
          : winner
          ? `Player ${winner} wins!`
          : `It's a draw!`}
      </div>

      <GameBoard
        cells={G.cells}
        makeMove={(index) => moves.clickCell(index)}
        winningLine={winningLine}
      />

      <div className="flex w-full max-w-100 justify-around gap-4 max-[360px]:flex-col max-[360px]:items-center">
        <Button text="Restart Game" onClick={moves.restartGame} />
        <Button text="Reset Score" onClick={moves.resetGame} />
      </div>
    </div>
  );
}
