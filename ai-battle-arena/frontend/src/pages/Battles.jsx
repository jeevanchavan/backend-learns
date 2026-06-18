import { useState } from "react";
import { Card } from "../components/Card";
import { MOCK_BATTLES } from "../utils/mockData";
import { Search, ChevronRight } from "lucide-react";

export function Battles() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBattles = MOCK_BATTLES.filter(b => 
    b.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.winner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Previous Battles</h1>
          <p className="text-neutral-400">Explore past comparisons and see how models performed.</p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-md leading-5 bg-neutral-900 text-neutral-300 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            placeholder="Search battles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredBattles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">No battles found matching "{searchTerm}"</p>
          </div>
        ) : (
          filteredBattles.map(battle => (
            <Card key={battle.id} className="hover:border-neutral-700 transition-colors cursor-pointer group">
              <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                <div className="flex-1">
                  <div className="text-sm text-neutral-500 mb-2">{battle.date}</div>
                  <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">"{battle.prompt}"</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <span className="text-neutral-400">Winner: <span className="text-white font-medium">{battle.winner}</span></span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm text-neutral-500 mb-1">Scores</div>
                    <div className="flex gap-3 text-sm">
                      <span className="text-neutral-400">Mistral: <span className="text-white">{battle.scores.Mistral}</span></span>
                      <span className="text-neutral-400">Cohere: <span className="text-white">{battle.scores.Cohere}</span></span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
