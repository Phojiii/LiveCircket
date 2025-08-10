import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [matchesOpen, setMatchesOpen] = useState(false);
  const [rankingOpen, setRankingOpen] = useState(false);
  const matchesRef = useRef(null);
  const rankingRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        matchesRef.current &&
        !matchesRef.current.contains(event.target)
      ) {
        setMatchesOpen(false);
      }
      if (
        rankingRef.current &&
        !rankingRef.current.contains(event.target)
      ) {
        setRankingOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Image src="/live-cricket-logo.webp" alt="Logo" width={80} height={32} />
        </div>
        <nav className="flex gap-6 relative">
          <Link href="/" className="text-gray-700 hover:text-blue-700 font-medium transition">Home</Link>
          {/* Matches Dropdown */}
          <div className="relative" ref={matchesRef}>
            <button
              className={`flex items-center gap-1 text-gray-700 hover:text-blue-700 font-medium transition focus:outline-none ${matchesOpen ? "text-blue-700" : ""}`}
              type="button"
              onClick={() => setMatchesOpen((open) => !open)}
            >
              Matches <FaChevronDown className="text-xs mt-0.5" />
            </button>
            {matchesOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-blue-100 rounded shadow-lg z-50">
                <Link
                  href="/live"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  onClick={() => setMatchesOpen(false)}
                >
                  Live
                </Link>
                <Link
                  href="/upcoming"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  onClick={() => setMatchesOpen(false)}
                >
                  Upcoming
                </Link>
                <Link
                  href="/recent"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  onClick={() => setMatchesOpen(false)}
                >
                  Recent
                </Link>
              </div>
            )}
          </div>
          {/* ICC Ranking Dropdown */}
          <div className="relative" ref={rankingRef}>
            <button
              className={`flex items-center gap-1 text-gray-700 hover:text-blue-700 font-medium transition focus:outline-none ${rankingOpen ? "text-blue-700" : ""}`}
              type="button"
              onClick={() => setRankingOpen((open) => !open)}
            >
              ICC Ranking <FaChevronDown className="text-xs mt-0.5" />
            </button>
            {rankingOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-blue-100 rounded shadow-lg z-50">
                <Link
                  href="/rankings"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  onClick={() => setRankingOpen(false)}
                >
                  Test Batsmen
                </Link>
                <Link
                  href="/rankings-t20-batsmen"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  onClick={() => setRankingOpen(false)}
                >
                  T20 Batsmen
                </Link>
              </div>
            )}
          </div>
          <Link href="/standing" className="text-gray-700 hover:text-blue-700 font-medium transition">Standings</Link>
        </nav>
      </div>
      <div className="bg-blue-900 h-1 w-full" />
    </header>
  );
}