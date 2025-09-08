import SVGIcon from "./SVGIcon";
import type { TicTacCell } from "../lib/game";

export default function GameBoard({
  cells,
  makeMove,
  winningLine,
}: {
  cells: TicTacCell[];
  makeMove: (i: number) => void;
  winningLine?: number[];
}) {
  return (
    <div className="fill-foreground bg-foreground/10 grid w-full max-w-100 grid-cols-3 gap-2">
      {cells.map((cell, index) => (
        <div
          className="bg-background relative flex aspect-square items-center justify-center"
          key={index}
        >
          <button
            className={`active:bg-primary/15 flex size-[80%] items-center justify-center rounded-full transition-colors focus:outline-none ${
              winningLine?.includes(index) && "bg-primary fill-background"
            }`}
            key={index}
            onClick={() => makeMove(index)}
          >
            {/* button click area fix */}
            <div className="absolute size-[100%]" />
            {cell && (
              <SVGIcon
                name={cell === "X" ? "cross" : "circle"}
                className="size-[50%]"
              />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
