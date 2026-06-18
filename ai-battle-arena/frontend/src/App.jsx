import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Landing } from "./pages/Landing";
import { Arena } from "./pages/Arena";
import { Leaderboard } from "./pages/Leaderboard";
import { Battles } from "./pages/Battles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/battles" element={<Battles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
