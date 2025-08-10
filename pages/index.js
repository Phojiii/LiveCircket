import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchLiveMatches } from "../libs/cricketApi";
import { fetchUpcomingMatches } from "../libs/upcomingMatchesApi";
import { fetchT20BatsmenLeanback } from "../libs/iccT20BatsmenRankingApi";
import { fetchRecentMatches } from "../libs/recentMatchesApi";

export default function Home() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [t20Batsmen, setT20Batsmen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        // Live Matches
        const liveData = await fetchLiveMatches();
        const live = [];
        (liveData?.typeMatches || []).forEach((type) => {
          type.seriesMatches.forEach((series) => {
            if (series.seriesAdWrapper && series.seriesAdWrapper.matches) {
              series.seriesAdWrapper.matches.forEach((match) => {
                live.push({
                  teams: `${match.matchInfo.team1.teamSName} vs ${match.matchInfo.team2.teamSName}`,
                  status: match.matchInfo.status,
                  venue: match.matchInfo.venueInfo?.ground,
                  date: match.matchInfo.startDate,
                  desc: match.matchInfo.matchDesc,
                  series: match.matchInfo.seriesName,
                });
              });
            }
          });
        });
        setLiveMatches(live.slice(0, 2));

        // Upcoming Matches
        const upcomingData = await fetchUpcomingMatches();
        const upcoming = [];
        (upcomingData?.typeMatches || []).forEach((type) => {
          type.seriesMatches.forEach((series) => {
            if (series.seriesAdWrapper && series.seriesAdWrapper.matches) {
              series.seriesAdWrapper.matches.forEach((match) => {
                upcoming.push({
                  teams: `${match.matchInfo.team1.teamSName} vs ${match.matchInfo.team2.teamSName}`,
                  date: match.matchInfo.startDate,
                  venue: match.matchInfo.venueInfo?.ground,
                  desc: match.matchInfo.matchDesc,
                  series: match.matchInfo.seriesName,
                  status: match.matchInfo.status,
                });
              });
            }
          });
        });
        setUpcomingMatches(upcoming.slice(0, 2));

        // Recent Matches
        const recentData = await fetchRecentMatches();
        const recent = [];
        (recentData?.typeMatches || []).forEach((type) => {
          type.seriesMatches.forEach((series) => {
            if (series.seriesAdWrapper && series.seriesAdWrapper.matches) {
              series.seriesAdWrapper.matches.forEach((match) => {
                recent.push({
                  teams: `${match.matchInfo.team1.teamSName} vs ${match.matchInfo.team2.teamSName}`,
                  status: match.matchInfo.status,
                  venue: match.matchInfo.venueInfo?.ground,
                  date: match.matchInfo.startDate,
                  desc: match.matchInfo.matchDesc,
                  series: match.matchInfo.seriesName,
                });
              });
            }
          });
        });
        setRecentMatches(recent.slice(0, 2));

        // T20 Batsmen Rankings
        const t20Data = await fetchT20BatsmenLeanback();
        setT20Batsmen(
          (t20Data?.rank || []).slice(0, 3).map((r) => ({
            name: r.player,
            country: r.country,
            rating: r.rating,
            pos: r.pos,
          }))
        );
      } catch (err) {
        setLiveMatches([]);
        setUpcomingMatches([]);
        setRecentMatches([]);
        setT20Batsmen([]);
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-2">🏏 Cricket Portal</h1>
          <p className="text-lg text-gray-600">
            Live scores, rankings, upcoming matches, and more — all in one place!
          </p>
        </header>

        <nav className="flex justify-center gap-6 mb-8">
          <Link href="/live" className="text-blue-700 hover:underline font-medium">Live</Link>
          <Link href="/upcoming" className="text-blue-700 hover:underline font-medium">Upcoming</Link>
          <Link href="/recent" className="text-blue-700 hover:underline font-medium">Recent</Link>
          <Link href="/rankings-t20-batsmen" className="text-blue-700 hover:underline font-medium">T20 Batsmen</Link>
          <Link href="/rankings" className="text-blue-700 hover:underline font-medium">Rankings</Link>
        </nav>

        {loading ? (
          <div className="text-center text-blue-600 text-xl py-20">Loading cricket data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Live Matches */}
            <section className="bg-white rounded-lg shadow p-5 border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-blue-700">Live Matches</h2>
                <Link href="/live" className="text-xs text-blue-500 hover:underline">See all</Link>
              </div>
              {liveMatches.length === 0 ? (
                <div className="text-gray-500 text-sm">No live matches right now.</div>
              ) : (
                liveMatches.map((match, idx) => (
                  <div key={idx} className="mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <div className="font-semibold text-blue-800">{match.teams}</div>
                    <div className="text-xs text-gray-500">{match.series}</div>
                    <div className="text-xs text-blue-600">{match.status}</div>
                    <div className="text-xs text-gray-600">{match.venue}</div>
                  </div>
                ))
              )}
            </section>

            {/* Upcoming Matches */}
            <section className="bg-white rounded-lg shadow p-5 border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-blue-700">Upcoming Matches</h2>
                <Link href="/upcoming" className="text-xs text-blue-500 hover:underline">See all</Link>
              </div>
              {upcomingMatches.length === 0 ? (
                <div className="text-gray-500 text-sm">No upcoming matches.</div>
              ) : (
                upcomingMatches.map((match, idx) => (
                  <div key={idx} className="mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <div className="font-semibold text-blue-800">{match.teams}</div>
                    <div className="text-xs text-gray-500">{match.series}</div>
                    <div className="text-xs text-blue-600">{match.status}</div>
                    <div className="text-xs text-gray-600">{match.venue}</div>
                  </div>
                ))
              )}
            </section>

            {/* Recent Matches */}
            <section className="bg-white rounded-lg shadow p-5 border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-blue-700">Recent Matches</h2>
                <Link href="/recent" className="text-xs text-blue-500 hover:underline">See all</Link>
              </div>
              {recentMatches.length === 0 ? (
                <div className="text-gray-500 text-sm">No recent matches.</div>
              ) : (
                recentMatches.map((match, idx) => (
                  <div key={idx} className="mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <div className="font-semibold text-blue-800">{match.teams}</div>
                    <div className="text-xs text-gray-500">{match.series}</div>
                    <div className="text-xs text-blue-600">{match.status}</div>
                    <div className="text-xs text-gray-600">{match.venue}</div>
                  </div>
                ))
              )}
            </section>

            {/* T20 Batsmen Rankings */}
            <section className="bg-white rounded-lg shadow p-5 border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-blue-700">Top T20 Batsmen</h2>
                <Link href="/rankings-t20-batsmen" className="text-xs text-blue-500 hover:underline">Full list</Link>
              </div>
              {t20Batsmen.length === 0 ? (
                <div className="text-gray-500 text-sm">No ranking data.</div>
              ) : (
                <ol className="list-decimal ml-5">
                  {t20Batsmen.map((batsman) => (
                    <li key={batsman.pos} className="mb-1">
                      <span className="font-semibold text-blue-800">{batsman.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{batsman.country}</span>
                      <span className="text-xs text-blue-600 ml-2">({batsman.rating})</span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
