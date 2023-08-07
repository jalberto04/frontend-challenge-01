import GameGrid from "@/components/GameGrid";
import GamePlayerVictoryCount from "@/components/GamePlayerVictoryCount";
import MatchHistoryCard from "@/components/MatchHistoryCard";
import MatchVictoriesCard from "@/components/MatchVictoriesCard";
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
        <section className="mx-auto flex w-full justify-center gap-x-12 bg-gray-200 py-20">
          <div className="grid grid-flow-row auto-rows-auto grid-cols-2 gap-2 lg:grid-cols-3">
            <GamePlayerVictoryCount
              className="col-span-1 col-start-1"
              player={1}
            />
            <GameGrid className="p-16 row-start-1 row-span-1 col-span-2 lg:col-start-2 lg:col-span-1" />
            <GamePlayerVictoryCount
              className="col-span-1 col-start-2 lg:col-start-3"
              player={2}
            />
          </div>
        </section>
        <section className="p-12 flex flex-col space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight mx-auto">STATS</h2>
          <div className="grid grid-flow-row auto-rows-auto grid-cols-1 gap-2 lg:grid-cols-2">
            <MatchVictoriesCard className="col-span-1" />
            <MatchHistoryCard className="col-span-1" />
            <MatchTimeCard className="col-span-1 lg:col-span-2" />
          </div>
        </section>
      </main>
    </StrictMode>
  );
}
