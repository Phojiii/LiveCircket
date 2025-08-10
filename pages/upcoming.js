import { fetchUpcomingMatches } from "../libs/upcomingMatchesApi";
import Image from "next/image";

export async function getServerSideProps() {
  const data = await fetchUpcomingMatches();
  return { props: { data } };
}

function flattenMatches(typeMatches = []) {
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

// Helpers to build upstream URL and proxied URL
const cbImgUrl = (imageId) =>
  `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg`;

const viaProxy = (url) => `/api/proxy-image?url=${encodeURIComponent(url)}`;

export default function Upcoming({ data }) {
  const matches = flattenMatches(data?.typeMatches);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            🏏 Upcoming Cricket Matches
          </h1>
          <p className="text-lg text-gray-600">
            All upcoming international, league, domestic, and women's matches.
          </p>
        </header>

        {matches.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-20">
            No upcoming matches found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match, idx) => (
              <div
                key={match.matchId || idx}
                className="bg-white rounded-lg shadow-md p-6 border border-blue-100 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* Team 1 */}
                  <div className="flex items-center gap-1">
                    {match.team1?.imageId ? (
                      <Image
                        src={viaProxy(cbImgUrl(match.team1.imageId))}
                        alt={match.team1.teamSName || "Team 1"}
                        width={28}
                        height={28}
                        className="rounded-full"
                        loading="lazy"
                      />
                    ) : (
                      <span className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                        {match.team1?.teamSName?.slice(0, 2) || "T1"}
                      </span>
                    )}
                    <span className="font-semibold text-blue-700">
                      {match.team1?.teamSName}
                    </span>
                  </div>

                  <span className="mx-1 text-gray-400 font-bold">vs</span>

                  {/* Team 2 */}
                  <div className="flex items-center gap-1">
                    {match.team2?.imageId ? (
                      <Image
                        src={viaProxy(cbImgUrl(match.team2.imageId))}
                        alt={match.team2.teamSName || "Team 2"}
                        width={28}
                        height={28}
                        className="rounded-full"
                        loading="lazy"
                      />
                    ) : (
                      <span className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                        {match.team2?.teamSName?.slice(0, 2) || "T2"}
                      </span>
                    )}
                    <span className="font-semibold text-blue-700">
                      {match.team2?.teamSName}
                    </span>
                  </div>
                </div>

                <div className="text-gray-700 text-sm mb-1">
                  <span className="font-medium">Series:</span>{" "}
                  {match.seriesName || "N/A"}
                </div>

                <div className="text-gray-600 text-xs mb-2">
                  {match.startDate
                    ? new Date(Number(match.startDate)).toLocaleString()
                    : ""}
                </div>

                <div className="text-blue-900 font-bold text-base">
                  {match.venueInfo?.ground || "Venue TBD"}
                  {match.venueInfo?.city ? `, ${match.venueInfo.city}` : ""}
                </div>

                <div className="text-gray-500 text-xs mt-2">
                  {match.status || ""}
                </div>

                <div className="text-xs text-blue-500 mt-1">
                  {match.matchDesc} &middot; {match.matchFormat} &middot;{" "}
                  {match.matchType}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
