import GameBoard from "@/components/static/GameBoard";
import GameHeader from "@/components/static/GameHeader";
import GameStats from "@/components/static/GameStats";
import GameGrid from "@/components/interactive/GameGrid";

export default function Page() {
  return (
    <>
      <GameHeader />
      <main>
        <GameBoard>
          <GameGrid />
        </GameBoard>
        <GameStats />
      </main>
    </>
  );
};
