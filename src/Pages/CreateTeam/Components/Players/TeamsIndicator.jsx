import React from "react";
import { useTeams } from "../../../../Hooks/useTeams";
import { textCapitalize } from "../../../../Utils/TextCapitalize";

export default function TeamsIndicator() {
  const { team1, team2 } = useTeams();
  const teams = [team1, team2];
  return (
    <div className="flex md:justify-between justify-around items-center lg:px-10 ">
      {teams.map((team, index) => (
        <div key={index}>
          <div className="flex justify-center text-center items-center ">
            {team.name === team1.name && (
              <div className="mr-2 bg-red-500 rounded-full text-white w-4 h-4  flex items-center justify-center text-center">
                <span>1</span>
              </div>
            )}
            <span
              className={`${
                team.name === team1.name ? `text-red-900` : `text-blue-900`
              } text-center text-xs md:text-xl`}
            >
              {textCapitalize(team?.name)}
            </span>
            {team.name === team2.name && (
              <div className="ml-2 bg-blue-700 rounded-full text-white w-4 h-4  flex items-center justify-center text-center">
                <span>2</span>
              </div>
            )}
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
