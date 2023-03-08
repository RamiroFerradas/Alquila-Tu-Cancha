import React from "react";
import useFetch from "../../../../Hooks/useFetch";
import { LEAGUES_URL } from "../../../../services";

export default function Leagues({ countryId, setLeagueId }) {
  const { data, loading } = useFetch(LEAGUES_URL(countryId));

  return loading && data?.[0]?.country_name ? (
    <p className="text-center text-lg items-center justify-center flex">
      Cargando...
    </p>
  ) : (
    <div className="p-5 flex flex-col md:h-screen h-auto">
      <div className="flex gap-2 items-center justify-center">
        <p className="text-lg">Liga</p>
      </div>
      <div className="flex-grow overflow-y-auto p-3 grid grid-cols-3 gap-4 ">
        {data?.map(({ league_name, league_logo, country_logo, league_id }) => (
          <div
            className="cursor-pointer"
            onClick={() => setLeagueId(league_id)}
          >
            <img
              className="max-w-full rounded-lg h-20 w-24 object-cover"
              src={league_logo ? league_logo : country_logo}
              alt={league_name}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = country_logo;
              }}
            />
            <span className="text-sm">{league_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
