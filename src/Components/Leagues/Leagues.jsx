import React from "react";
import useFetch from "../../Hooks/useFetch";
import { LEAGUE_URL } from "../../services";

export default function Leagues({ setCountryId, countryId }) {
  const { data, loading } = useFetch(LEAGUE_URL(countryId));
  console.log(data);

  return loading && data?.[0]?.country_name ? (
    <p className="text-center text-lg items-center justify-center flex">
      Cargando...
    </p>
  ) : (
    <div className="p-5 flex flex-col h-screen">
      <div className="flex gap-2 items-center justify-center">
        <img
          className="max-w-full rounded-lg h-5 w-5 object-cover"
          src={data?.[0]?.country_logo}
          alt={data?.[0]?.country_name}
        />
        <p className="text-lg">{data?.[0]?.country_name}</p>
      </div>
      <div className="flex-grow overflow-y-auto p-3 grid grid-cols-3 gap-4 ">
        {data?.map(({ league_name, league_logo, country_logo }) => (
          <div>
            <img
              className="max-w-full rounded-lg h-20 w-24 object-cover"
              src={league_logo ? league_logo : country_logo}
              alt={league_name}
            />
            <span className="text-sm">{league_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
