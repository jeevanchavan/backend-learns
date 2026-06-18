import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { getLeaderboard } from "../utils/api";
import { Trophy, Loader2, AlertCircle } from "lucide-react";
import clsx from "clsx";

export function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getLeaderboard();
      setData(result.data);
    } catch (err) {
      setError(err.message || "Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-neutral-400">Rankings based on overall win rate and judge scores.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-6">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
          <Loader2 className="h-8 w-8 animate-spin mb-3 text-indigo-500" />
          <p className="text-sm font-medium">Calculating rankings...</p>
        </div>
      ) : (
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
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-neutral-500">
                      No battles fought yet.
                    </td>
                  </tr>
                ) : (
                  data.map((row) => (
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
