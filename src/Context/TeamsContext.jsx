import { createContext, useMemo, useState } from "react";

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [team1, setteam1] = useState({ name: "Equipo 1", players: [] });
  const [team2, setteam2] = useState({ name: "Equipo 2", players: [] });

  const addPlayer = (player, equipo) => {
    if (equipo.players.length < 5) {
      // Verificar si el equipo tiene menos de 5 jugadores
      equipo.players.push(player);
      equipo.name === team1 ? setteam1({ ...team1 }) : setteam2({ ...team2 });
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

  const data = useMemo(
    () => ({
      team1,
      team2,
      selectPlayer,
      setteam1,
      setteam2,
    }),
    [team1, team2]
  );

  return <TeamsContext.Provider value={data}>{children}</TeamsContext.Provider>;
};
