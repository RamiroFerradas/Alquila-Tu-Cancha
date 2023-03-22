import React, { useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import useFetch from "../../../../Hooks/useFetch";
import { LEAGUES_URL } from "../../../../Services/services";
import { scrollToSeccion } from "../../../../Utils/ScrollToSeccion";
import SearchBar from "../SearchBar/SearchBar";
import unknow_league from "../../Assets/Player/unknown_team.jpg";

export default function Leagues({
  countryId,
  setLeagueId,
  leaguesRef,
  teamsRef,
}) {
  const { data, loading } = useFetch(LEAGUES_URL(countryId));
  const [leagueFiltered, setLeagueFiltered] = useState([]);

  return (
    <div>
      {!countryId ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-center text-white text-xl">
            Selecciona un pais para elegir una liga...
          </p>
        </div>
      ) : loading ? (
        <Loader />
      ) : data ? (
        <div className=" p-2 flex flex-col h-screen">
          <div className="flex gap-2 items-center justify-center mt-16">
            <p className="text-xl text-white ">Ligas</p>
          </div>
          <SearchBar setLeagueFiltered={setLeagueFiltered} data={data} />

          <div className="overflow-y-auto px-3 grid grid-cols-3 gap-4 flex-col md:h-screen h-auto">
            {leagueFiltered
              ?.sort((a, b) => a.league_name.localeCompare(b.league_name))
              .map(({ league_name, league_logo, country_logo, league_id }) => (
                <div
                  key={league_id}
                  className="cursor-pointer mt-8 flex flex-col items-center"
                  onClick={() => {
                    setLeagueId(league_id);
                    setTimeout(() => {
                      scrollToSeccion(teamsRef);
                    }, 200);
                  }}
                >
                  <span className="text-sm md:text-md text-center text-white">
                    {league_name}
                  </span>

                  <img
                    className="max-w-full rounded-lg h-16 w-20 object-cover pt-2"
                    src={league_logo ? league_logo : country_logo}
                    alt={league_name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = unknow_league;
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
