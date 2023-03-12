import { useEffect, useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import useFetch from "../../../../Hooks/useFetch";
import { COUNTRIES_URL } from "../../../../services";
import { scrollToSeccion } from "../../../../Utils/ScrollToSeccion";
import SearchBar from "./SearchBar";

export default function Countries({ setCountryId, setLeagueId, leaguesRef }) {
  const { data, loading } = useFetch(COUNTRIES_URL);
  const [image, setImage] = useState("");

  const [countreiesFiltered, setCountreiesFiltered] = useState([]);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex gap-2 items-center justify-center mt-16">
        <p className="text-md">Paises</p>
      </div>

      <SearchBar setCountreiesFiltered={setCountreiesFiltered} data={data} />

      <div className="flex-grow overflow-y-auto px-3 grid grid-cols-3 gap-4 flex-col md:h-screen h-auto">
        {countreiesFiltered?.map(
          ({ country_name, country_logo, country_id }) => (
            <div
              key={country_id}
              onClick={() => {
                setCountryId(country_id);
                setLeagueId("");
                setTimeout(() => {
                  scrollToSeccion(leaguesRef);
                }, 200);
                setImage(country_logo);
              }}
              className="cursor-pointer mt-8 flex flex-col items-center"
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
                loading="lazy"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
