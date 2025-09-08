export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-foreground/10 focus:bg-foreground/20 hover:bg-foreground/15 active:bg-foreground/25 rounded-full px-4 py-2 text-lg font-bold transition-colors focus:outline-none"
    >
      {text}
    </button>
  );
}
