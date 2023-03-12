import { Button, IconButton, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useTeams } from "../../../../Hooks/useTeams";
import { IoIosFootball } from "react-icons/io";
export default function MyTeams({ setContinueButton }) {
  const { team1, team2, setteam1, setteam2 } = useTeams();
  const [names, setNames] = useState({
    team1: { name: "", error: true },
    team2: { name: "", error: true },
  });

  const handleChangueSetName = (e) => {
    const { name, value } = e.target;

    value
      ? setNames({ ...names, [name]: { name: value, error: false } })
      : setNames({ ...names, [name]: { name: value, error: true } });
    console.log(names.team1);
  };

  const handleSendNames = () => {
    if (names.team1.error || names.team2.error) {
      setviewError(true);
    } else {
      setteam1({ ...team1, name: names.team1.name });
      setteam2({ ...team2, name: names.team2.name });
      setContinueButton(true);
    }
  };

  const [viewError, setviewError] = useState(false);
  return (
    <div className="h-screen flex flex-col justify-center md:mt-0 items-center  bg-gray-900 bg-opacity-90 backdrop-blur-xs">
      <div className="h-96 flex flex-col justify-evenly items-center">
        <div className="md:grid md:grid-cols-2 md:gap-20 md:p-10 gap-5 md:h-3/4 grid mb-0 mt-0 p-6">
          <div
            className={`flex justify-center items-center border-4 ${
              names.team1.error && viewError
                ? `border-red-500`
                : `border-green-400`
            } rounded-2xl p-8  md:mt-10`}
          >
            <div className="md:w-3/4">
              <Input
                defaultValue={team1.name}
                onChange={handleChangueSetName}
                label="Nombre del equipo A"
                icon={<IoIosFootball />}
                name="team1"
                id="team1"
                className="text-center text-xl border-red-600 border-xl"
                error={names.team1.error && viewError}
                color="yellow"
                size="xl"
              />
            </div>
          </div>
          <div
            className={`flex justify-center items-center  border-4 ${
              names.team1.error && viewError
                ? `border-red-500`
                : `border-green-400`
            } rounded-2xl p-8  md:mt-10`}
          >
            <div className="md:w-3/4 ">
              <Input
                id="team2"
                name="team2"
                defaultValue={team2.name}
                onChange={handleChangueSetName}
                size="md"
                label="Nombre del equipo B"
                className="text-center text-xl text-white"
                icon={<IoIosFootball />}
                error={names.team2.error && viewError}
                // color="light-green"
              />
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleSendNames}
            className="inline-bloc bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow self-center mt-6"
            color=""
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
