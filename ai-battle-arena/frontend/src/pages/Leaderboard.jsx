import { useState } from "react";
import { Card } from "../components/Card";
import { MOCK_LEADERBOARD } from "../utils/mockData";
import { Trophy } from "lucide-react";
import clsx from "clsx";

export function Leaderboard() {
  const [data] = useState(MOCK_LEADERBOARD);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-neutral-400">Rankings based on overall win rate and judge scores.</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
              <tr>
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Model</th>
                <th className="px-6 py-4 font-medium text-right">Wins</th>
                <th className="px-6 py-4 font-medium text-right">Losses</th>
                <th className="px-6 py-4 font-medium text-right">Avg Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 bg-neutral-900/30">
              {data.map((row) => (
                <tr key={row.rank} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {row.rank === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                      <span className={clsx("font-medium", row.rank === 1 ? "text-yellow-500" : "text-neutral-300")}>
                        #{row.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                    {row.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-green-400">
                    {row.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-red-400">
                    {row.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-indigo-400 font-medium">
                    {row.avgScore.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
