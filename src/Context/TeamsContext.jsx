import { createContext, useMemo, useState } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [team1, setteam1] = useLocalStorage("team1", { name: "", players: [] });
  const [team2, setteam2] = useLocalStorage("team2", { name: "", players: [] });

  const addPlayer = (player, team) => {
    if (team.players.length < 5) {
      // Verificar si el equipo tiene menos de 5 jugadores
      team.players.push(player);
      if (team === team1) {
        setteam1({ ...team });
      } else if (team === team2) {
        setteam2({ ...team });
      }
    }
  };

  const selectPlayer = (player, team) => {
    const teamPlayers = team.players;
    const playerReapeat = teamPlayers.some(
      (j) => j.player_key === player.player_key
    );

    if (team === team1 && !playerReapeat) {
      addPlayer(player, team);
    }
    if (team === team2 && !playerReapeat) {
      addPlayer(player, team);
    }
  };

  const removePlayer = (key) => {
    const existsInAnyTeam = [team1, team2].reduce((acc, team) => {
      const exists = team.players.some((p) => p.player_key === key);
      return acc || exists;
    }, false);

    if (existsInAnyTeam) {
      if (team1.players.some((p) => p.player_key === key)) {
        const filteredPlayers = team1.players.filter(
          (p) => p.player_key !== key
        );
        setteam1({
          ...team1,
          players: filteredPlayers,
        });
      }
      if (team2.players.some((p) => p.player_key === key)) {
        const filteredPlayers = team2.players.filter(
          (p) => p.player_key !== key
        );
        setteam2({
          ...team2,
          players: filteredPlayers,
        });
      }
    }
  };

  const data = useMemo(
    () => ({
      team1,
      team2,
      selectPlayer,
      setteam1,
      setteam2,
      removePlayer,
    }),
    [team1, team2]
  );

  return <TeamsContext.Provider value={data}>{children}</TeamsContext.Provider>;
};
