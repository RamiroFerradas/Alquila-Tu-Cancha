import React, { useEffect, useState } from "react";
import { useTeams } from "./useTeams";

export default function useMatch() {
  const { team1, team2 } = useTeams();
  const [viewConfetti, setViewConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // useEffect(() => {
  //   if (timeLeft !== 0) {
  //     setViewConfetti(false);
  //   } else {
  //     setViewConfetti(true);
  //     setTimeout(() => {
  //       setViewConfetti(false);
  //     }, 6000);
  //   }
  // }, [isPlaying, timeLeft]);

  const [result, setResult] = useState({
    team1_score: 0,
    team2_score: 0,
  });

  const startMatch = () => {
    // resetMatch();
    const timeLimit = 60; // duración en segundos
    const team1ScoreProbability =
      team1.players.reduce((total, player) => {
        const rating = parseInt(player.player_rating, 10);
        const goals = parseInt(player.player_goals, 10);
        return isNaN(rating) || isNaN(goals) ? total : total + rating + goals;
      }, 0) / team1.players.length;

    const team2ScoreProbability =
      team2.players.reduce((total, player) => {
        const rating = parseInt(player.player_rating, 10);
        const goals = parseInt(player.player_goals, 10);
        return isNaN(rating) || isNaN(goals) ? total : total + rating + goals;
      }, 0) / team2.players.length;

    if (isPlaying) {
      return; // Salir si ya se está ejecutando un partido
    }

    setIsPlaying(true);

    const timer = setInterval(() => {
      const team1Scored =
        Math.random() < team1ScoreProbability / 100 ? true : false;
      const team2Scored =
        Math.random() < team2ScoreProbability / 100 ? true : false;
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

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    setTimeout(() => {
      clearInterval(timer);
      setIsPlaying(false);
      setTimeLeft(60);
      setViewConfetti(true);
      setTimeout(() => {
        setViewConfetti(false);
      }, 6000);
    }, timeLeft * 1000);
  };
  const resetMatch = () => {
    setResult({
      team1_score: 0,
      team2_score: 0,
    });
    setTimeLeft(60);
    setIsPlaying(true);
  };
  return { timeLeft, startMatch, result, resetMatch, isPlaying, viewConfetti };
}
