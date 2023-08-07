import MatchVictoriesCard from "@/components/interactive/MatchVictoriesCard";
import MatchHistoryCard from "@/components/interactive/MatchHistoryCard";
import MatchTimeCard from "@/components/interactive/MatchTimeCard";

export default function MatchStats() {
  return (
    <section className="p-12 flex flex-col space-y-2 text-center">
      <h2 className="text-3xl font-bold tracking-tight mx-auto">STATS</h2>
      <div className="grid grid-flow-row auto-rows-auto grid-cols-2 gap-2">
        <MatchVictoriesCard />
        <MatchHistoryCard />
        <MatchTimeCard />
      </div>
    </section>
  );
}
