import { StrictMode } from "react";
import GameBoard from "@/components/static/GameBoard";
import GameHeader from "@/components/static/GameHeader";
import MatchStats from "@/components/static/MatchStats";

import GameGrid from "@/components/interactive/GameGrid";


export default function Page() {
  return (
    <StrictMode>
      <GameHeader />
      <main>
        <GameBoard>
          <GameGrid />
        </GameBoard>
        <MatchStats />
      </main>
    </StrictMode>
  );
};
