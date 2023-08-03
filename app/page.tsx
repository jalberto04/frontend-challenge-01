import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import GameStats from "@/components/GameStats";

export default function Page() {
  return <>
    <GameHeader />
    <main>
        <GameBoard />
        <GameStats />
    </main>
  </>;
}
