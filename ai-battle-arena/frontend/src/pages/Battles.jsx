import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Card } from "../components/Card";
import { getBattles, getBattleById } from "../utils/api";
import { Search, ChevronRight, Loader2, X, Trophy, AlertCircle } from "lucide-react";
import { Button } from "../components/Button";

export function Battles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBattles, setTotalBattles] = useState(0);
  const limit = 6;

  // Selected battle modal states
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Fetch battles with debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBattlesData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, page]);

  const fetchBattlesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getBattles({ page, limit, search: searchTerm });
      setBattles(result.data);
      setTotalPages(result.pagination.pages);
      setTotalBattles(result.pagination.total);
    } catch (err) {
      setError(err.message || "Failed to load battles");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleOpenBattle = async (id) => {
    setModalLoading(true);
    setModalError(null);
    try {
      const result = await getBattleById(id);
      setSelectedBattle(result.data);
    } catch (err) {
      setModalError(err.message || "Failed to load battle details");
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedBattle(null);
    setModalError(null);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header and Search */}
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
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-6">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
          <Loader2 className="h-8 w-8 animate-spin mb-3 text-indigo-500" />
          <p className="text-sm font-medium">Loading history...</p>
        </div>
      ) : (
        <>
          {/* Battles List */}
          <div className="space-y-4">
            {battles.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/10">
                <p className="text-neutral-500 text-lg">
                  {searchTerm ? `No battles found matching "${searchTerm}"` : "No battles have been fought yet."}
                </p>
              </div>
            ) : (
              battles.map((battle) => (
                <Card
                  key={battle._id}
                  onClick={() => handleOpenBattle(battle._id)}
                  className="hover:border-neutral-700 transition-colors cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                    <div className="flex-1">
                      <div className="text-sm text-neutral-500 mb-2">
                        {new Date(battle.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">
                        "{battle.prompt}"
                      </h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          <span className="text-neutral-400">
                            Winner: <span className="text-white font-medium">{battle.winner}</span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm text-neutral-500 mb-1">Scores</div>
                        <div className="flex gap-3 text-sm">
                          <span className="text-neutral-400">
                            Mistral: <span className="text-white">{battle.judge.solution_1_score.toFixed(1)}</span>
                          </span>
                          <span className="text-neutral-400">
                            Cohere: <span className="text-white">{battle.judge.solution_2_score.toFixed(1)}</span>
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-neutral-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 border-t border-neutral-800 pt-6">
              <span className="text-xs text-neutral-400">
                Showing page {page} of {totalPages} ({totalBattles} total battles)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Loading Modal overlay */}
      {modalLoading && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <Card className="bg-neutral-900 border-neutral-800 text-center max-w-sm py-12 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-indigo-500" />
            <p className="text-white font-medium">Fetching details...</p>
          </Card>
        </div>
      )}

      {/* Details Modal */}
      {selectedBattle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-5xl rounded-2xl shadow-2xl p-6 md:p-8 my-8 relative flex flex-col max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto pr-2 custom-scrollbar space-y-6">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                  Battle Details
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-1 leading-snug">
                  "{selectedBattle.prompt}"
                </h2>
                <div className="text-neutral-500 text-xs mt-1">
                  Fought on {new Date(selectedBattle.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Side-by-Side Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mistral Solution */}
                <Card className="bg-neutral-900/40 border-neutral-800 flex flex-col">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-800">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-xs font-bold text-white">
                      M
                    </div>
                    <span className="font-semibold text-white text-sm">Mistral AI</span>
                  </div>
                  <div className="prose prose-invert prose-neutral prose-sm max-w-none text-neutral-300 max-h-[300px] overflow-y-auto pr-1">
                    <ReactMarkdown>{selectedBattle.solution_1}</ReactMarkdown>
                  </div>
                </Card>

                {/* Cohere Solution */}
                <Card className="bg-neutral-900/40 border-neutral-800 flex flex-col">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-800">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white">
                      C
                    </div>
                    <span className="font-semibold text-white text-sm">Cohere AI</span>
                  </div>
                  <div className="prose prose-invert prose-neutral prose-sm max-w-none text-neutral-300 max-h-[300px] overflow-y-auto pr-1">
                    <ReactMarkdown>{selectedBattle.solution_2}</ReactMarkdown>
                  </div>
                </Card>
              </div>

              {/* Judge Analysis */}
              <div className="border-t border-neutral-800 pt-6">
                <h3 className="text-lg font-bold text-white mb-4">Judge Evaluation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-neutral-900/60 border-neutral-800/80">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-medium text-neutral-400">Mistral AI Score</span>
                      <span className="text-lg font-bold text-white">
                        {selectedBattle.judge.solution_1_score.toFixed(1)}{" "}
                        <span className="text-xs font-normal text-neutral-500">/ 10</span>
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-1.5 mb-4 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full"
                        style={{ width: `${(selectedBattle.judge.solution_1_score / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <span className="font-semibold text-white">Reasoning: </span>
                      {selectedBattle.judge.solution_1_reasoning}
                    </p>
                  </Card>

                  <Card className="bg-neutral-900/60 border-neutral-800/80">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-medium text-neutral-400">Cohere AI Score</span>
                      <span className="text-lg font-bold text-white">
                        {selectedBattle.judge.solution_2_score.toFixed(1)}{" "}
                        <span className="text-xs font-normal text-neutral-500">/ 10</span>
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-1.5 mb-4 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full"
                        style={{ width: `${(selectedBattle.judge.solution_2_score / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <span className="font-semibold text-white">Reasoning: </span>
                      {selectedBattle.judge.solution_2_reasoning}
                    </p>
                  </Card>
                </div>
              </div>

              {/* Winner Announcement */}
              <div className="flex justify-center pt-2">
                <Card className="flex items-center gap-4 px-6 py-4 border-indigo-500/20 bg-neutral-900 shadow-md">
                  <div className="p-2 bg-indigo-500/10 rounded-full text-indigo-400">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                      Winner Decision
                    </div>
                    <div className="text-xl font-bold text-white">{selectedBattle.winner}</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Footer Close Action */}
            <div className="flex justify-end mt-6 pt-4 border-t border-neutral-900">
              <Button onClick={handleCloseModal} size="sm">
                Close View
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
