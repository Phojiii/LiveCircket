import { fetchT20BatsmenLeanback } from "../libs/iccT20BatsmenRankingApi";

export async function getServerSideProps() {
  const data = await fetchT20BatsmenLeanback();
  return { props: { data } };
}

export default function T20MatchLeanback({ data }) {
  const miniscore = data?.miniscore;
  const header = data?.matchHeader;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            {header?.seriesName || "T20I Match"}
          </h1>
          <div className="text-lg text-gray-700 font-semibold mb-1">
            {header?.matchDescription}
          </div>
          <div className="text-base text-gray-500 mb-2">
            {header?.team1?.shortName} vs {header?.team2?.shortName}
          </div>
          <div className="text-blue-700 font-medium">{header?.status}</div>
          <div className="text-green-700 font-semibold mt-1">
            {header?.result?.resultType === "win" && header?.result?.winningTeam
              ? `${header.result.winningTeam} won by ${header.result.winningMargin} wickets`
              : header?.customStatus}
          </div>
        </header>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <div className="text-blue-900 font-bold text-lg mb-1">
                Batting:{" "}
                {miniscore?.batTeam?.teamScore}/
                {miniscore?.batTeam?.teamWkts} ({miniscore?.overs} ov)
              </div>
              <div className="text-gray-700 text-sm mb-2">
                Target:{" "}
                <span className="font-semibold">{miniscore?.target}</span>
              </div>
              <div className="text-gray-600 text-xs">
                Partnership: {miniscore?.partnerShip?.runs} runs,{" "}
                {miniscore?.partnerShip?.balls} balls
              </div>
              <div className="text-gray-600 text-xs">
                Current RR: {miniscore?.currentRunRate} | Required RR:{" "}
                {miniscore?.requiredRunRate}
              </div>
            </div>
            <div>
              <div className="font-semibold text-blue-700 mb-1">Striker</div>
              <div className="text-gray-800">
                {miniscore?.batsmanStriker?.batName} -{" "}
                {miniscore?.batsmanStriker?.batRuns} (
                {miniscore?.batsmanStriker?.batBalls}b,{" "}
                {miniscore?.batsmanStriker?.batFours}x4,{" "}
                {miniscore?.batsmanStriker?.batSixes}x6, SR:{" "}
                {miniscore?.batsmanStriker?.batStrikeRate})
              </div>
              <div className="font-semibold text-blue-700 mt-2 mb-1">
                Non-Striker
              </div>
              <div className="text-gray-800">
                {miniscore?.batsmanNonStriker?.batName} -{" "}
                {miniscore?.batsmanNonStriker?.batRuns} (
                {miniscore?.batsmanNonStriker?.batBalls}b,{" "}
                {miniscore?.batsmanNonStriker?.batFours}x4,{" "}
                {miniscore?.batsmanNonStriker?.batSixes}x6, SR:{" "}
                {miniscore?.batsmanNonStriker?.batStrikeRate})
              </div>
            </div>
            <div>
              <div className="font-semibold text-blue-700 mb-1">Bowler</div>
              <div className="text-gray-800">
                {miniscore?.bowlerStriker?.bowlName} - {miniscore?.bowlerStriker?.bowlOvs} ov, {miniscore?.bowlerStriker?.bowlRuns} runs, {miniscore?.bowlerStriker?.bowlWkts} wkts, Econ: {miniscore?.bowlerStriker?.bowlEcon}
              </div>
              <div className="font-semibold text-blue-700 mt-2 mb-1">
                Non-Striker Bowler
              </div>
              <div className="text-gray-800">
                {miniscore?.bowlerNonStriker?.bowlName} - {miniscore?.bowlerNonStriker?.bowlOvs} ov, {miniscore?.bowlerNonStriker?.bowlRuns} runs, {miniscore?.bowlerNonStriker?.bowlWkts} wkts, Econ: {miniscore?.bowlerNonStriker?.bowlEcon}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Score Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {miniscore?.matchScoreDetails?.inningsScoreList?.map((inning, idx) => (
              <div key={idx} className="bg-blue-50 rounded p-4">
                <div className="font-semibold text-blue-700 mb-1">
                  {inning.batTeamName}
                </div>
                <div className="text-gray-800 text-lg font-bold">
                  {inning.score}/{inning.wickets} ({inning.overs} ov)
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-green-700 font-semibold">
            {miniscore?.matchScoreDetails?.customStatus}
          </div>
        </section>
      </div>
    </div>
  );
}