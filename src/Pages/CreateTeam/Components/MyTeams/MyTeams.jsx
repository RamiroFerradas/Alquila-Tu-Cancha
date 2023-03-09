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
    <div className="h-full flex flex-col md:justify-center mt-10 md:mt-0 items-center xs:gap-10">
      <div className="md:grid md:grid-cols-2 md:gap-20 md:p-10 gap-5 md:h-3/4  grid h-96 ">
        <div
          className={`flex justify-center items-center  border-4 ${
            names.team1.error && viewError
              ? `border-red-500`
              : `border-indigo-300`
          } rounded-2xl p-8`}
        >
          <div className="md:w-3/4 overflow-hidde">
            <Input
              defaultValue={team1.name}
              onChange={handleChangueSetName}
              label="Nombre del equipo A"
              icon={<IoIosFootball />}
              name="team1"
              id="team1"
              className="text-center text-xl"
              error={names.team1.error && viewError}
            />
          </div>
        </div>
        <div
          className={`flex justify-center items-center  border-4 ${
            names.team2.error && viewError
              ? `border-red-500`
              : `border-indigo-300`
          } rounded-2xl p-8`}
        >
          <div className="md:w-3/4 overflow-hidde ">
            <Input
              id="team2"
              name="team2"
              defaultValue={team2.name}
              onChange={handleChangueSetName}
              size="md"
              label="Nombre del equipo B"
              className="text-center text-xl"
              icon={<IoIosFootball />}
              error={names.team2.error && viewError}
            />
          </div>
        </div>
      </div>
      <Button onClick={handleSendNames} className="w-44" color="green">
        Continuar
      </Button>
    </div>
  );
}
