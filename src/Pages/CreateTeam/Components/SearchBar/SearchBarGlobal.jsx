import { useCallback, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Loader from "../../../../Components/Loader/Loader";
import useFetch from "../../../../Hooks/useFetch";
import { PLAYER_URL } from "../../../../services";

export default function SearchBarGlobal({
  playerFilteredGlobal,
  setPlayerFilteredGlobal,
}) {
  const [input, setInput] = useState("");

  // const { data, loading } = useFetch(PLAYER_URL(input.length && input));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const handleSearchGlobal = (e) => {
    const name = e.target.value.toLowerCase();
    setInput(name);
  };

  useEffect(() => {
    setLoading(true);
    if (input.length) {
      fetch(PLAYER_URL(input))
        .then((response) => response.json())
        .then((data) => setData(data));
    } else {
      setData([]);
    }
    console.log(data);
    setLoading(false);
  }, [input]);

  const handleFilter = (input) => {
    setPlayerFilteredGlobal([]);

    // setTimeout(() => {
    //   if (input.length) {
    //     if (data) {
    //       const filter = data?.filter((info) =>
    //         info.player_name.toLowerCase().includes(input.toLowerCase())
    //       );

    //       const uniqueFilter = filter.reduce((acc, curr) => {
    //         const existing = acc.find(
    //           (item) => item.player_id === curr.player_id
    //         );
    //         if (!existing) {
    //           acc.push(curr);
    //         }
    //         return acc;
    //       }, []);

    //       setPlayerFilteredGlobal(uniqueFilter);
    //     }
    //   }
    // }, 600);
  };
  // console.log(data);
  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    setPlayerFilteredGlobal(data);
  };
  if (loading) {
    <Loader />;
  }

  return (
    <form
      onSubmit={handleSearchButtonClick}
      className="flex items-center justify-center p-2"
    >
      <div className="flex justify-center relative w-full">
        <div className="flex border border-purple-200 rounded-xl w-40">
          <input
            type="text"
            className="text-center block px-4 py-2 text-purple-700 bg-white border focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 w-full h-8 rounded-xl"
            placeholder={`Buscar`}
            onChange={handleSearchGlobal}
            style={{ boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center px-2 py-2 text-gray-800 bg-white rounded-md shadow-sm group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 absolute right-0"
        >
          <BsSearch className="w-5 h-5 mr-2" />
          <span className="hidden">Buscar</span>
        </button>
      </div>
    </form>
  );
}
