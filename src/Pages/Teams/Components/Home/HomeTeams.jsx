import { useTeams } from "../../../../Hooks/useTeams";
import Players from "../Players/Players";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { textCapitalize } from "../../../../Utils/TextCapitalize";
import styles from "./HomeTeams.module.css";
import NoPlayers from "../Players/NoPlayers";

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
    <div
      className={`${styles.bgPelota} flex justify-center items-center h-screen `}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 grid-container mt-5 ">
        {teams.map((ele) => (
          <div
            key={ele.name}
            className={`border-4 rounded-2xl ${
              ele.name === team1.name ? `border-red-500` : `border-blue-700`
            } h-96 w-auto md:w-96 p-4 bg-gray-900 bg-opacity-80 backdrop-blur-xs`}
          >
            <div className="flex justify-between relative items-center pb-3 text-white">
              {ele.name === team1.name ? (
                <div className="absolut top-1 right-1 bg-red-500 rounded-full text-dark w-6 h-6  text-center">
                  <span>1</span>
                </div>
              ) : (
                <div className="absolut top-1 right-1 bg-blue-700 rounded-full text-dark w-6 h-6 flex items-center justify-center">
                  <span>2</span>
                </div>
              )}
              <p className="text-center text-xl capitalize">
                {textCapitalize(ele.name)}
              </p>
              <button className="" onClick={() => editTeamName(ele)}>
                <p className="text-xl">
                  <AiOutlineEdit />
                </p>
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Players players={ele.players} />
              <NoPlayers players={ele.players} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
