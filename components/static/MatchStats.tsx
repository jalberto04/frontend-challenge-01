import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import MatchVictoriesCard from "@/components/interactive/MatchVictoriesCard";
import MatchHistoryCard from "@/components/interactive/MatchHistoryCard";

export default function MatchStats() {
  return (
    <section className="p-12 flex flex-col space-y-2 text-center">
      <h2 className="text-3xl font-bold tracking-tight mx-auto">STATS</h2>
      <div className="grid grid-flow-row auto-rows-auto grid-cols-2 gap-2">
        <MatchVictoriesCard />
        <MatchHistoryCard />
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Total play time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl">00:21:14</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
