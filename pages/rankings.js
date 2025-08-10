// pages/rankings.js
import { fetchICCRankings } from "../libs/iccRanking";

export async function getServerSideProps() {
  const data = await fetchICCRankings();
  return {
    props: { data },
  };
}

export default function Rankings({ data }) {
  const players = data?.rank;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            🏏 ICC Test Batsmen Rankings
          </h1>
          <p className="text-lg text-gray-600">
            The latest ICC Test batsmen rankings, updated live!
          </p>
        </header>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {players && players.length > 0 ? (
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="p-3 font-semibold">Rank</th>
                  <th className="p-3 font-semibold">Player</th>
                  <th className="p-3 font-semibold">Country</th>
                  <th className="p-3 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={index}
                    className={`border-b last:border-b-0 ${
                      index % 2 === 0 ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3 text-center font-bold">{player.rank}</td>
                    <td className="p-3">{player.name}</td>
                    <td className="p-3">
                      <span className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {player.country}
                      </span>
                    </td>
                    <td className="p-3 text-center">{player.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600 py-10">
              No ranking data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
