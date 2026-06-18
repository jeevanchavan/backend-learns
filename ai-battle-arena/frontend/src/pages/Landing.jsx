import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Swords } from "lucide-react";

export function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full mb-8">
        <Swords className="h-12 w-12 text-indigo-400" />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
        Compare AI Models <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
          Side-by-Side
        </span>
      </h1>
      
      <p className="text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl">
        Agent Arena is the premium platform for evaluating large language models. 
        Submit a prompt, see how the top AIs respond, and let the judge decide the winner.
      </p>

      <div className="flex items-center gap-4">
        <Link to="/arena">
          <Button variant="primary" size="lg" className="h-12 px-8 text-lg">
            Start a Battle
          </Button>
        </Link>
        <Link to="/leaderboard">
          <Button variant="secondary" size="lg" className="h-12 px-8 text-lg">
            View Leaderboard
          </Button>
        </Link>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
          <h3 className="text-lg font-semibold text-white mb-2">Unbiased Judging</h3>
          <p className="text-neutral-400">Our judge AI evaluates responses purely on merit, reasoning, and adherence to the prompt.</p>
        </div>
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
          <h3 className="text-lg font-semibold text-white mb-2">Top Models</h3>
          <p className="text-neutral-400">We feature the latest models from Mistral, Cohere, OpenAI, and Anthropic in our arena.</p>
        </div>
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
          <h3 className="text-lg font-semibold text-white mb-2">Detailed Analysis</h3>
          <p className="text-neutral-400">Get granular scores and detailed reasoning for why one model outperformed the other.</p>
        </div>
      </div>
    </div>
  );
}
