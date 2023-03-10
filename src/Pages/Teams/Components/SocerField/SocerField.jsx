import { useDrop } from "react-dnd";
import { useTeams } from "../../../../Hooks/useTeams";
import cancha from "../../Assets/soccer field background 1003.jpg";

export default function SocerField() {
  return (
    <>
      <img src={cancha} alt="Cancha de fútbol" className="h-60 rotate-90"></img>
    </>
  );
}
