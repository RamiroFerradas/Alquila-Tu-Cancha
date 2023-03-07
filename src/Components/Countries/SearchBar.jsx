import { useEffect, useState } from "react";

export default function SearchBar({ setCountreiesFiltered, data }) {
  const [input, setInput] = useState("");
  useEffect(() => {
    const filter = data?.filter((country) =>
      country.country_name.toLowerCase().includes(input)
    );
    setCountreiesFiltered(!input.length ? data : filter);
  }, [data, input]);

  const handleSearchCountrie = (e) => {
    const name = e.target.value.toLowerCase();
    setInput(name);
  };
  return (
    <div className="flex items-center justify-center p-3">
      <div className="flex border border-purple-200 rounded w-8/12">
        <input
          type="text"
          className="text-center block px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 flex-grow"
          placeholder="Buscar un pais"
          onChange={handleSearchCountrie}
        />
      </div>
    </div>
  );
}
