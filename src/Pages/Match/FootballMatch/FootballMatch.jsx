import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useTeams } from "../../../Hooks/useTeams";
import styles from "./FootballMatch.module.css";
import pelota from "../Assets/Backgrounds/PngItem_158877.png";
import Players from "../../Teams/Components/Players/Players";

function FootballMatch() {
  const { team1, team2 } = useTeams();
  const [timeLeft, setTimeLeft] = useState(60);

  const [result, setResult] = useState({
    team1_score: 0,
    team2_score: 0,
  });

  const startMatch = () => {
    resetMatch();
    const timeLimit = 60; // duración en segundos
    const team1ScoreProbability =
      team1.players.reduce(
        (total, player) =>
          total +
          parseInt(player.player_rating, 10) +
          parseInt(player.player_goals, 10),
        0
      ) / team1.players.length;
    const team2ScoreProbability =
      team2.players.reduce(
        (total, player) =>
          total +
          parseInt(player.player_rating, 10) +
          parseInt(player.player_goals, 10),
        0
      ) / team2.players.length;

    const timer = setInterval(() => {
      const team1Scored =
        Math.random() < team1ScoreProbability / 1000 ? true : false;
      const team2Scored =
        Math.random() < team2ScoreProbability / 1000 ? true : false;

      if (team1Scored) {
        setResult((prevState) => ({
          ...prevState,
          team1_score: prevState.team1_score + 1,
        }));
      }

      if (team2Scored) {
        setResult((prevState) => ({
          ...prevState,
          team2_score: prevState.team2_score + 1,
        }));
      }

      setTimeLeft((prevState) => prevState - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, timeLimit * 1000);
  };

  const resetMatch = () => {
    setResult({
      team1_score: 0,
      team2_score: 0,
    });
    setTimeLeft(60);
  };

  const renderTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${secondsDisplay}`;
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen`}>
      <div className="z-10 rounded-full opacity-50  absolute  overflow-hidden h-full">
        <img src={pelota} alt="asd" className="animate-spin" />
      </div>
      <div className="flex flex-row justify-around w-full">
        <div className="flex flex-col">
          <Players players={team1.players} />
        </div>
        <div className="z-20 flex flex-col items-center justify-center bg-gray-900 rounded-3xl p-5 bg-opacity-50 backdrop-blur-xs">
          <h2 className="text-4xl font-bold mb-4 ">
            {team1.name} vs {team2.name}
          </h2>
          <h3 className="text-2xl mb-8">
            Resultado: {result.team1_score} - {result.team2_score}
          </h3>
          <div className="flex flex-col space-y-4">
            <button
              className="py-4 px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors duration-300"
              onClick={startMatch}
            >
              Comenzar partido
            </button>
            <button
              className="py-4 px-8 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors duration-300"
              onClick={resetMatch}
            >
              Reiniciar partido
            </button>

            <span className={`text-xl font-bold text-center `}>{timeLeft}</span>
          </div>
        </div>
        <Players players={team2.players} />
      </div>
    </div>
  );
}

export default FootballMatch;
