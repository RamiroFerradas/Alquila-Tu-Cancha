import { useContext } from "react";
import { TeamsContext } from "../Context/TeamsContext";

export const useTeams = () => {
  const context = useContext(TeamsContext);

  if (!context) {
    throw new Error("useTeams debe ser usado dentro de un EquiposProvider");
  }

  return context;
};
