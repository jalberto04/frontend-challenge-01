import GameBoard from "@/components/static/GameBoard";
import GameHeader from "@/components/static/GameHeader";
import MatchStats from "@/components/static/MatchStats";

import GameGrid from "@/components/interactive/GameGrid";

export default function Page() {
  return (
    <>
      <GameHeader />
      <main>
        <GameBoard>
          <GameGrid />
        </GameBoard>
        <MatchStats />
      </main>
    </>
  );
};
