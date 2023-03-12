import React, { useState } from "react";
import useMatch from "../../../../Hooks/useMatch";
import { useTeams } from "../../../../Hooks/useTeams";
import Players from "../../../Teams/Components/Players/Players";
import pelota from "../../Assets/Backgrounds/PngItem_158877.png";
import ConfettiComponent from "../Confetti/ConfettiComponent";

export default function HomeMatch() {
  const { team1, team2 } = useTeams();

  const { timeLeft, startMatch, result, isPlaying, resetMatch, viewConfetti } =
    useMatch();

  return (
    <div className=" bg-gray-200 overflow-hidden">
      {viewConfetti && <ConfettiComponent />}
      <div className={`flex flex-col items-center justify-center h-screen`}>
        <div className="z-10 rounded-full opacity-50 absolute overflow-hidden h:auto md:h-screen">
          <img
            src={pelota}
            alt="asd"
            className={`${isPlaying && `animate-spin`}`}
          />
        </div>
        <div className="flex flex-row justify-between w-full p-5">
          <div className="hidden  md:flex flex-col">
            <h2 className="text-4xl font-bold mb-4 text-center">
              {team1.name}
            </h2>
            <Players players={team1.players} />
          </div>
          <div className="z-20 flex flex-col items-center justify-center bg-gray-900 rounded-3xl p-20 bg-opacity-50 backdrop-blur-xs w-96">
            <h2 className="text-4xl font-bold mb-4 block md:hidden text-center">
              {team1.name} vs {team2.name}
            </h2>
            <h3 className="text-2xl mb-">Resultado</h3>
            <h3 className="text-2xl mb-8">
              {result.team1_score} - {result.team2_score}
            </h3>
            <div className="flex flex-col space-y-4">
              <button
                className={`py-4 px-8 bg-blue-500 ${
                  isPlaying
                    ? `hover:bg-gray-500 bg-gray-600`
                    : `hover:bg-blue-600`
                } text-white rounded-lg shadow-lg transition-colors duration-300`}
                onClick={startMatch}
                disabled={isPlaying}
              >
                Comenzar partido
              </button>
              <button
                className="py-4 px-8 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors duration-300"
                onClick={resetMatch}
              >
                Reiniciar partido
              </button>

              <span className={`text-xl font-bold text-center `}>
                {timeLeft}
              </span>
            </div>
          </div>
          <div className="hidden  md:flex flex-col">
            <h2 className="text-4xl font-bold mb-4 text-center">
              {team2.name}
            </h2>
            <Players players={team2.players} />
          </div>
        </div>
      </div>
    </div>
  );
}
