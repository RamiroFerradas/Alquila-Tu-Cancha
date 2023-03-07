import React, { useEffect, lazy } from "react";
import useFetch from "../../../../Hooks/useFetch";
import { TEAMS_URL } from "../../../../services";

export default function Teams({
  setLeagueId,
  leagueId,
  setShowModal,
  setPlayers,
}) {
  const { data, loading } = useFetch(TEAMS_URL(leagueId));
  console.log(data);

  return loading ? (
    <p className="text-center text-lg items-center justify-center flex">
      Cargando...
    </p>
  ) : (
    <div className="p-5 flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto p-3 grid grid-cols-3 gap-4 ">
        {data?.map(({ team_name, team_badge, players }, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => {
              setPlayers(players);
              setShowModal(true);
            }}
          >
            <img
              className="max-w-full rounded-lg h-20 w-24 object-cover"
              src={team_badge}
              alt={team_name}
              data-src={team_badge}
            />
            <span className="text-sm">{team_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
