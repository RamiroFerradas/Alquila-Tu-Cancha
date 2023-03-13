import { useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import useFetch from "../../../../Hooks/useFetch";
import { TEAMS_URL } from "../../../../services";
import unknow_team from "../../Assets/Player/unknown_team.jpg";
import SearchBar from "../SearchBar/SearchBar";

export default function Teams({
  leagueId,
  setPlayers,
  setShowModal,
  setTeamName,
  setSearchGlobal,
}) {
  let { data, loading } = useFetch(TEAMS_URL(leagueId));
  if (!leagueId) data = [];
  const [teamFiltered, setTeamFiltered] = useState([]);

  return (
    <div
    // className="bg-gradient-to-br from-lime-400 via-violet-300 to-neutral-200"
    >
      {!leagueId ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-center text-xl text-white">
            Selecciona una liga para elegir un equipo...
          </p>
        </div>
      ) : loading ? (
        <Loader />
      ) : data ? (
        <div className="flex flex-col h-screen p-2">
          <div className="flex gap-2 items-center justify-center mt-16">
            <p className="text-md text-white ">Equipos</p>
          </div>
          <SearchBar setTeamFiltered={setTeamFiltered} data={data} />

          <div className="flex-grow overflow-y-auto px-3 grid grid-cols-3 md:grid-cols-3 gap-4 flex-col md:h-screen h-auto">
            {teamFiltered?.map(({ team_name, team_badge, players }, index) => (
              <div
                key={index}
                className="cursor-pointer mt-8 flex flex-col items-center"
                onClick={() => {
                  setPlayers(players);
                  setShowModal(true);
                  setTeamName(team_name);
                  setSearchGlobal(false);
                }}
              >
                <span className="text-sm md:text-md text-center text-white">
                  {team_name}
                </span>

                <img
                  className="max-w-full rounded-lg h-20 w-24 object-cover pt-2"
                  src={team_badge}
                  alt={team_name}
                  // data-src={team_badge}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = unknow_team;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
