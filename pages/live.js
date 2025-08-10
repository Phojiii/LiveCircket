import { fetchLiveMatches } from "../libs/cricketApi";
import Image from "next/image";

export async function getServerSideProps() {
  const data = await fetchLiveMatches();
  return { props: { data } };
}

// Helper to flatten matches from API structure
function flattenLiveMatches(typeMatches = []) {
  const matches = [];
  typeMatches.forEach((type) => {
    type.seriesMatches.forEach((series) => {
      if (series.seriesAdWrapper && series.seriesAdWrapper.matches) {
        series.seriesAdWrapper.matches.forEach((match) => {
          matches.push({
            ...match.matchInfo,
            seriesName: series.seriesAdWrapper.seriesName,
            matchType: type.matchType,
          });
        });
      }
    });
  });
  return matches;
}

export default function Live({ data }) {
  const matches = flattenLiveMatches(data?.typeMatches);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            🟢 Live Cricket Matches
          </h1>
          <p className="text-lg text-gray-600">
            All currently live international, league, domestic, and women's matches.
          </p>
        </header>
        {matches.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-20">
            No live matches at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match, idx) => (
              <div
                key={match.matchId || idx}
                className="bg-white rounded-lg shadow-md p-6 border border-green-100 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* Team 1 */}
                  <div className="flex items-center gap-1">
                    {match.team1?.imageId ? (
                      <Image
                        src={`/api/proxy-image?url=https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${match.team1.imageId}/i.jpg`}
                        alt={match.team1.teamSName}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                        {match.team1?.teamSName?.slice(0, 2) || "T1"}
                      </span>
                    )}
                    <span className="font-semibold text-green-700">{match.team1?.teamSName}</span>
                  </div>
                  <span className="mx-1 text-gray-400 font-bold">vs</span>
                  {/* Team 2 */}
                  <div className="flex items-center gap-1">
                    {match.team2?.imageId ? (
                      <Image
                        src={`/api/proxy-image?url=https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${match.team2.imageId}/i.jpg`}
                        alt={match.team2.teamSName}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                        {match.team2?.teamSName?.slice(0, 2) || "T2"}
                      </span>
                    )}
                    <span className="font-semibold text-green-700">{match.team2?.teamSName}</span>
                  </div>
                </div>
                <div className="text-gray-700 text-sm mb-1">
                  <span className="font-medium">Series:</span> {match.seriesName || "N/A"}
                </div>
                <div className="text-gray-600 text-xs mb-2">
                  {match.startDate
                    ? new Date(Number(match.startDate)).toLocaleString()
                    : ""}
                </div>
                <div className="text-green-900 font-bold text-base">
                  {match.venueInfo?.ground || "Venue TBD"}
                  {match.venueInfo?.city ? `, ${match.venueInfo.city}` : ""}
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  {match.status || ""}
                </div>
                <div className="text-xs text-green-500 mt-1">
                  {match.matchDesc} &middot; {match.matchFormat} &middot; {match.matchType}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
