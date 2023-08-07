import GameGrid from "@/components/GameGrid";
import GamePlayerVictoryCount from "@/components/GamePlayerVictoryCount";
import MatchHistoryCard from "@/components/MatchHistoryCard";
import MatchVictoriesCard from "@/components/MatchHistoryCard";
import MatchTimeCard from "@/components/MatchTimeCard";
import { StrictMode } from "react";

export default function Page() {
  return (
    <StrictMode>
      <header className="p-12 flex flex-col space-y-2 text-center">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl lg:text-extrabold mx-auto">
          TIC TAC TOE GAME
        </h1>
      </header>
      <main>
        <section className="mx-auto flex w-full justify-center gap-x-12 bg-gray-200 py-14">
          <GamePlayerVictoryCount player={1} />
          <div className="p-16">
            <GameGrid />
          </div>
          <GamePlayerVictoryCount player={2} />
        </section>
        <section className="p-12 flex flex-col space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight mx-auto">STATS</h2>
          <div className="grid grid-flow-row auto-rows-auto grid-cols-2 gap-2">
            <MatchVictoriesCard className="col-span-1" />
            <MatchHistoryCard className="col-span-1" />
            <MatchTimeCard className="col-span-2" />
          </div>
        </section>
      </main>
    </StrictMode>
  );
}
