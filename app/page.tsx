"use client";

import { Client } from "boardgame.io/react";
import { MCTSBot } from "boardgame.io/ai";
import { Local } from "boardgame.io/multiplayer";
import { TicTacGame } from "./lib/game";
import TicTacBoard from "./ui/TicTacBoard";

class Bot extends MCTSBot {
  constructor() {
    super({
      game: TicTacGame,
      enumerate: TicTacGame.ai?.enumerate,
      iterations: 100,
      playoutDepth: 9,
    });
  }
}

const TicTacClient = Client({
  game: TicTacGame,
  board: TicTacBoard,
  numPlayers: 2,
  multiplayer: Local({ bots: { 1: Bot } }),
  debug: true,
});

export default function Page() {
  return <TicTacClient playerID="0" />;
}

console.log("client");
