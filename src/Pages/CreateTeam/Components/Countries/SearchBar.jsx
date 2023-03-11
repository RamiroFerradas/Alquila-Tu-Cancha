import { useCallback, useEffect, useState } from "react";

export default function SearchBar({
  setCountreiesFiltered,
  data,
  setLeagueFiltered,
  setTeamFiltered,
  setPlayerFiltered,
}) {
  const [input, setInput] = useState("");
  const setFilter = setCountreiesFiltered
    ? setCountreiesFiltered
    : setLeagueFiltered
    ? setLeagueFiltered
    : setTeamFiltered
    ? setTeamFiltered
    : setPlayerFiltered;

  const handleFilter = useCallback(
    (input) => {
      const nameFilter = setCountreiesFiltered
        ? "country_name"
        : setLeagueFiltered
        ? "league_name"
        : setTeamFiltered
        ? "team_name"
        : "player_name";

      const filter = data?.filter((info) =>
        info[nameFilter].toLowerCase().includes(input.toLowerCase())
      );
      setFilter(!input.length ? data : filter);
    },
    [data]
  );

  useEffect(() => {
    handleFilter(input);
  }, [input, handleFilter]);

  const handleSearchCountrie = (e) => {
    const name = e.target.value.toLowerCase();
    setInput(name);
  };
  return (
    <div className="flex items-center justify-center p-2">
      <div className="flex border border-purple-200 rounded-xl w-8/12">
        <input
          type="text"
          className="text-center block px-4 py-2 text-purple-700 bg-white border focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 w-full h-8 rounded-xl"
          placeholder={`Buscar`}
          onChange={handleSearchCountrie}
          style={{ boxSizing: "border-box" }}
        />
      </div>
    </div>
  );
}
