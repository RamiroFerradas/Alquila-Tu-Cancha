import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useTeams } from "../../../Hooks/useTeams";

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
        Math.random() < team1ScoreProbability / 400 ? true : false;
      const team2Scored =
        Math.random() < team2ScoreProbability / 400 ? true : false;

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
    <div className="bg-lime-300 h-screen flex flex-col items-center justify-center">
      <h2>
        {team1.name} vs {team2.name}
      </h2>
      <h3>
        Resultado: {result.team1_score} - {result.team2_score}
      </h3>
      <Button onClick={startMatch}>Comenzar partido</Button>
      <Button onClick={resetMatch}>Reiniciar partido</Button>
      <span>{renderTimeLeft()}</span>
    </div>
  );
}

export default FootballMatch;
