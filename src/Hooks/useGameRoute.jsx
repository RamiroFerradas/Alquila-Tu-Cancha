import React, { useEffect, useState } from "react";
import { useTeams } from "./useTeams";

export default function useGameRoute() {
  const { team1, team2 } = useTeams();

  const [gameRoute, setGameRoute] = useState("");
  useEffect(() => {
    if (team1.players.length === 5 && team2.players.length === 5) {
      setGameRoute("/match");
    } else {
      setGameRoute("");
    }
  }, [team1.players.length, team2.players.length]);
  return { gameRoute };
}
