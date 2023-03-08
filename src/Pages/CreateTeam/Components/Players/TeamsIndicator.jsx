import React from "react";

export default function TeamsIndicator(team) {
  console.log(team?.name);
  return (
    <>
      <div className="flex justify-center text-center">
        <span className="text-red-500 text-center">{team?.name}</span>
      </div>
      <div className="flex justify-center mb-4">
        <div
          className={`w-4 h-4 rounded-full border-2 border-gray-300 mr-1 ${
            team?.players.length >= 1 ? "bg-green-500" : ""
          }`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full border-2 border-gray-300 mr-1 ${
            team?.players.length >= 2 ? "bg-green-500" : ""
          }`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full border-2 border-gray-300 mr-1 ${
            team?.players.length >= 3 ? "bg-green-500" : ""
          }`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full border-2 border-gray-300 mr-1 ${
            team?.players.length >= 4 ? "bg-green-500" : ""
          }`}
        ></div>
        <div
          className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
            team?.players.length === 5 ? "bg-green-500" : ""
          }`}
        ></div>
      </div>
    </>
  );
}
