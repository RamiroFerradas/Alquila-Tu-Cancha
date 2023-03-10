import { useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import useFetch from "../../../../Hooks/useFetch";
import { TEAMS_URL } from "../../../../services";
import unknow_team from "../../Assets/Player/unknown_team.jpg";
import SearchBar from "../Countries/SearchBar";

export default function Teams({
  leagueId,
  setShowModal,
  setPlayers,
  setTeamName,
}) {
  let { data, loading } = useFetch(TEAMS_URL(leagueId));
  if (!leagueId) data = [];
  const [teamFiltered, setTeamFiltered] = useState(data);

  return !leagueId ? (
    <div className="flex justify-center items-center h-screen">
      <p className="text-center">
        Primero selecciona una liga para elegir un equipo...
      </p>
    </div>
  ) : loading ? (
    <Loader />
  ) : data ? (
    <div className="p-5 flex flex-col h-screen">
      <div className="flex gap-2 items-center justify-center mt-14">
        <p className="text-md ">Equipos</p>
      </div>
      <SearchBar setTeamFiltered={setTeamFiltered} data={data} />

      <div className="flex-grow overflow-y-auto p-3 grid grid-cols-2 md:grid-cols-3 gap-4 flex-col md:h-screen h-auto">
        {teamFiltered?.map(({ team_name, team_badge, players }, index) => (
          <div
            key={index}
            className="cursor-pointer mt-8 flex flex-col items-center"
            onClick={() => {
              setPlayers(players);
              setShowModal(true);
              setTeamName(team_name);
            }}
          >
            <img
              className="max-w-full rounded-lg h-20 w-24 object-cover"
              src={team_badge}
              alt={team_name}
              // data-src={team_badge}
              onError={(e) => {
                e.target.onerror = null; // evitar un bucle infinito de errores
                e.target.src = unknow_team; // imagen de respaldo
              }}
            />
            <span className="text-sm text-center">{team_name}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
