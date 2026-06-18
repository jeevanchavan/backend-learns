import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col font-sans">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
