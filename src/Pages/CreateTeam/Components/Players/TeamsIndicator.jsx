import React from "react";
import { useTeams } from "../../../../Hooks/useTeams";
import { textCapitalize } from "../../../../Utils/TextCapitalize";

export default function TeamsIndicator() {
  const { team1, team2 } = useTeams();
  const teams = [team1, team2];
  return (
    <div className="flex md:justify-between justify-around items-center lg:px-10 ">
      {teams.map((team) => (
        <div>
          <div className="flex justify-center text-center">
            <span
              className={`${
                team.name === team1.name ? `text-red-400` : `text-blue-700`
              } text-center text-xs md:text-lg`}
            >
              {textCapitalize(team?.name)}
            </span>
          </div>
          <div className="flex justify-center mb-4">
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-gray-500 mr-1 ${
                team?.players.length >= 1 ? "bg-green-500" : ""
              }`}
            ></div>
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-gray-500 mr-1 ${
                team?.players.length >= 2 ? "bg-green-500" : ""
              }`}
            ></div>
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-gray-500 mr-1 ${
                team?.players.length >= 3 ? "bg-green-500" : ""
              }`}
            ></div>
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-gray-500 mr-1 ${
                team?.players.length >= 4 ? "bg-green-500" : ""
              }`}
            ></div>
            <div
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-gray-500 ${
                team?.players.length === 5 ? "bg-green-500" : ""
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
