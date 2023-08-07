import GamePlayerVictoryCount from "@/components/interactive/GamePlayerVictoryCount";

export default function GameBoard({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex w-full justify-center gap-x-12 bg-gray-200 py-14">
      <GamePlayerVictoryCount player={1} />
      <div className="p-16">
        {children}
      </div>
      <GamePlayerVictoryCount player={2} />
    </section>
  );
}
