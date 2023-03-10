import { useTeams } from "../../../../Hooks/useTeams";
import Players from "../Player/Players";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { textCapitalize } from "../../../../Utils/TextCapitalize";

export default function HomeTeams() {
  const { team1, setteam1, setteam2, team2 } = useTeams();
  const teams = [team1, team2];

  const editTeamName = (ele) => {
    let setStateFunc;
    if (ele === team1) {
      setStateFunc = setteam1;
    } else if (ele === team2) {
      setStateFunc = setteam2;
    } else {
      // En caso de que no se reciba un equipo válido
      console.error("Equipo inválido");
      return;
    }
    Swal.fire({
      title: "Editar nombre del equipo",
      input: "text",
      inputValue: ele.name,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "¡Debes escribir algo!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newTeamName = result.value;
        setStateFunc({ ...ele, name: newTeamName });
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-20 grid-container w-full">
        {teams.map((ele) => (
          <div
            key={ele.name}
            className="border-4 rounded-2xl border-red-500 h-96 w-full p-5"
          >
            <div className="flex justify-center relative items-center">
              <p className="text-center text-xl capitalize">
                {textCapitalize(ele.name)}
              </p>
              <button
                className="absolute right-5"
                onClick={() => editTeamName(ele)}
              >
                <p className="text-xl">
                  <AiOutlineEdit />
                </p>
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Players players={ele.players} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
