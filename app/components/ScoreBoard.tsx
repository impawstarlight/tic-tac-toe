import SVGIcon from "./SVGIcon";

export default function ScoreBoard({ X, O }: { X: number; O: number }) {
  return (
    // <div className="bg-foreground/10 text-foreground fill-foreground mx-4 flex w-full max-w-100 items-center justify-around text-2xl font-bold min-[25rem]:mt-2 min-[25rem]:max-w-96 min-[25rem]:rounded-full">
    <div className="bg-primary text-background fill-background mx-4 flex w-full max-w-100 items-center justify-around text-2xl font-bold min-[25rem]:mt-2 min-[25rem]:max-w-96 min-[25rem]:rounded-full">
      <h2 className="">Score:</h2>
      <div className="flex items-center gap-2 rounded-lg px-4 py-2">
        <SVGIcon name="cross" />
        <span>{X}</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg px-4 py-2">
        <SVGIcon name="circle" />
        <span>{O}</span>
      </div>
    </div>
  );
}
