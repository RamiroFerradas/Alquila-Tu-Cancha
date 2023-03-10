import React, { useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import useFetch from "../../../../Hooks/useFetch";
import { LEAGUES_URL } from "../../../../services";
import { scrollToSeccion } from "../../../../Utils/ScrollToSeccion";
import SearchBar from "../Countries/SearchBar";

export default function Leagues({
  countryId,
  setLeagueId,
  leaguesRef,
  teamsRef,
}) {
  const { data, loading } = useFetch(LEAGUES_URL(countryId));
  const [leagueFiltered, setLeagueFiltered] = useState([]);

  return !countryId ? (
    <div className="flex justify-center items-center h-screen">
      <p className="text-center">
        Primero selecciona un pais para elegir una liga...
      </p>
    </div>
  ) : data ? (
    <div className="p-5 flex flex-col h-screen">
      <div className="flex my-4 py-2 items-center justify-center">
        <p className="text-md ">Ligas</p>
      </div>
      <SearchBar setLeagueFiltered={setLeagueFiltered} data={data} />

      <div className="flex-grow overflow-y-auto p-3 grid grid-cols-2 md:grid-cols-3 gap-4 flex-col md:h-screen h-auto gap-6">
        {leagueFiltered?.map(
          ({ league_name, league_logo, country_logo, league_id }) => (
            <div
              className="cursor-pointer mt-8 flex flex-col items-center"
              onClick={() => {
                setLeagueId(league_id);

                scrollToSeccion(teamsRef);
              }}
            >
              <img
                className="max-w-full rounded-lg h-16 w-20 object-cover"
                src={league_logo ? league_logo : country_logo}
                alt={league_name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = country_logo;
                }}
              />
              <span className="text-sm text-center">{league_name}</span>
            </div>
          )
        )}
      </div>
    </div>
  ) : null;
}
