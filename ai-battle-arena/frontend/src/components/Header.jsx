import { Link, useLocation } from "react-router-dom";
import { Swords, User, Moon } from "lucide-react";
import clsx from "clsx";

export function Header() {
  const location = useLocation();

  const navLinks = [
    { name: "Arena", path: "/arena" },
    { name: "Battles", path: "/battles" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
              <Swords className="h-6 w-6" />
              <span className="text-xl font-semibold tracking-tight text-white">
                Agent Arena
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-neutral-400 hover:text-white p-2 rounded-md hover:bg-neutral-800 transition-colors">
              <Moon className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden">
              <User className="h-5 w-5 text-neutral-400" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
