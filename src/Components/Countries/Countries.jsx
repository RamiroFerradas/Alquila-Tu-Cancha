import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { COUNTRIES_URL } from "../../services";
import SearchBar from "./SearchBar";

export default function Countries({ setCountryId }) {
  const { data, loading } = useFetch(COUNTRIES_URL);

  const [countreiesFiltered, setCountreiesFiltered] = useState();

  return (
    <div className="p-5 flex flex-col h-screen">
      <p className="text-center">Selecciona un pais</p>

      <SearchBar setCountreiesFiltered={setCountreiesFiltered} data={data} />
      <div className="flex-grow overflow-y-auto p-3 grid grid-cols-3 gap-4">
        {/* <ul className="grid grid-cols-3 gap-4"> */}
        {loading && <li>Cargando...</li>}
        {countreiesFiltered?.map(
          ({ country_name, country_logo, country_id }) => (
            <div
              key={country_id}
              onClick={() => setCountryId(country_id)}
              className="cursor-pointer"
            >
              <p className="text-center">{country_name}</p>
              <img
                className="max-w-full rounded-lg h-16 w-20 object-cover"
                src={
                  country_logo
                    ? country_logo
                    : data?.[data.length - 3].country_logo
                }
                alt={country_name}
              />
            </div>
          )
        )}
        {/* </ul> */}
      </div>
    </div>
  );
}
