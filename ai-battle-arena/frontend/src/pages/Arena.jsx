import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Trophy, Loader2, Sparkles, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { createBattle } from "../utils/api";

export function Arena() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("empty"); // empty, loading, done
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleStartBattle = async () => {
    if (!prompt.trim()) return;
    
    setStatus("loading");
    setError(null);
    setData(null);
    
    try {
      const result = await createBattle(prompt);
      setData(result.data);
      setStatus("done");
    } catch (err) {
      setError(err.message || "An error occurred during the battle");
      setStatus("empty");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleStartBattle();
    }
  };

  const handleExample = () => {
    setPrompt("Explain Docker Compose vs Kubernetes in simple terms.");
  };

  const determineWinner = () => {
    if (!data) return null;
    const name = data.winner;
    const score = name === "Mistral AI" 
      ? data.judge.solution_1_score 
      : name === "Cohere AI" 
      ? data.judge.solution_2_score 
      : data.judge.solution_1_score;
    return { name, score };
  };

  const winner = determineWinner();

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* Hero / Prompt Input */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Agent Arena</h1>
        <p className="text-neutral-400 mb-6">Compare AI models side-by-side and discover which model performs best.</p>
        
        <div className="relative bg-neutral-900 border border-neutral-700 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
          <textarea
            className="w-full bg-transparent text-white p-4 pb-12 rounded-xl resize-none outline-none min-h-[120px]"
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={status === "loading"}
          />
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
            <button 
              onClick={handleExample}
              disabled={status === "loading"}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-300 transition-colors disabled:opacity-50"
            >
              Try Example Prompt
            </button>
            <Button 
              size="sm" 
              onClick={handleStartBattle}
              disabled={!prompt.trim() || status === "loading"}
              className="gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Battling...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Start Battle
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 max-w-3xl mx-auto">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
          <p className="text-sm font-medium text-red-400">{error}</p>
        </div>
      )}

      {/* Battle Flow Indicator (only show when loading or done) */}
      {status !== "empty" && (
        <div className="flex justify-center items-center gap-4 text-neutral-500 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-white">1</div>
            <span>Prompt</span>
          </div>
          <div className="w-8 h-px bg-neutral-800"></div>
          <div className="flex items-center gap-2">
            <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-white transition-colors", status === "done" ? "bg-indigo-600" : "bg-neutral-800 animate-pulse")}>2</div>
            <span className={status === "done" ? "text-indigo-400" : ""}>Generate</span>
          </div>
          <div className="w-8 h-px bg-neutral-800"></div>
          <div className="flex items-center gap-2">
            <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-white transition-colors", status === "done" ? "bg-indigo-600" : "bg-neutral-800")}>3</div>
            <span className={status === "done" ? "text-indigo-400" : ""}>Judge</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {status === "empty" && (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/20">
          <Sparkles className="h-10 w-10 text-neutral-600 mb-4" />
          <p className="text-neutral-400 text-lg">Enter a prompt to start your first AI battle.</p>
        </div>
      )}

      {/* Loading State */}
      {status === "loading" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          <Card className="h-96 bg-neutral-900/50">
            <div className="h-6 w-32 bg-neutral-800 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-neutral-800 rounded"></div>
              <div className="h-4 w-5/6 bg-neutral-800 rounded"></div>
              <div className="h-4 w-4/6 bg-neutral-800 rounded"></div>
            </div>
          </Card>
          <Card className="h-96 bg-neutral-900/50">
            <div className="h-6 w-32 bg-neutral-800 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-neutral-800 rounded"></div>
              <div className="h-4 w-5/6 bg-neutral-800 rounded"></div>
              <div className="h-4 w-4/6 bg-neutral-800 rounded"></div>
            </div>
          </Card>
        </div>
      )}

      {/* Done State */}
      {status === "done" && data && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* AI Comparison Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Mistral Card */}
            <Card className="flex flex-col h-full border-neutral-700 shadow-xl shadow-black/20">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center font-bold text-white shadow-inner">
                  M
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white leading-tight">Mistral AI</h2>
                  <span className="text-xs font-medium text-neutral-500">Mistral Large</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 prose prose-invert prose-neutral prose-sm max-w-none text-neutral-300 leading-relaxed custom-scrollbar max-h-[500px]">
                <ReactMarkdown>{data.solution_1}</ReactMarkdown>
              </div>
            </Card>

            {/* Cohere Card */}
            <Card className="flex flex-col h-full border-neutral-700 shadow-xl shadow-black/20">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white shadow-inner">
                  C
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white leading-tight">Cohere AI</h2>
                  <span className="text-xs font-medium text-neutral-500">Command R+</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 prose prose-invert prose-neutral prose-sm max-w-none text-neutral-300 leading-relaxed custom-scrollbar max-h-[500px]">
                <ReactMarkdown>{data.solution_2}</ReactMarkdown>
              </div>
            </Card>
            
          </section>

          {/* Judge Analysis Section */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-indigo-400" />
              Judge Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <Card className="bg-neutral-900/50">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-neutral-400">Mistral AI Score</span>
                  <span className="text-2xl font-bold text-white">{data.judge.solution_1_score.toFixed(1)} <span className="text-sm font-medium text-neutral-500">/ 10</span></span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2 mb-6 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(data.judge.solution_1_score / 10) * 100}%` }}></div>
                </div>
                <div className="text-sm text-neutral-300 leading-relaxed">
                  <span className="font-semibold text-white">Reasoning: </span>
                  {data.judge.solution_1_reasoning}
                </div>
              </Card>

              <Card className="bg-neutral-900/50">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-neutral-400">Cohere AI Score</span>
                  <span className="text-2xl font-bold text-white">{data.judge.solution_2_score.toFixed(1)} <span className="text-sm font-medium text-neutral-500">/ 10</span></span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2 mb-6 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(data.judge.solution_2_score / 10) * 100}%` }}></div>
                </div>
                <div className="text-sm text-neutral-300 leading-relaxed">
                  <span className="font-semibold text-white">Reasoning: </span>
                  {data.judge.solution_2_reasoning}
                </div>
              </Card>

            </div>
          </section>

          {/* Winner Section */}
          <section className="flex justify-center pb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Card className="relative flex items-center gap-6 px-10 py-8 border-indigo-500/30 bg-neutral-900 shadow-2xl min-w-[300px]">
                <div className="p-4 bg-indigo-500/10 rounded-full">
                  <Trophy className="h-10 w-10 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-indigo-400 mb-1 uppercase tracking-wider">Winner</div>
                  <div className="text-3xl font-bold text-white mb-1">{winner?.name}</div>
                  <div className="text-neutral-400 font-medium">Score: {winner?.score.toFixed(1)} / 10</div>
                </div>
              </Card>
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
