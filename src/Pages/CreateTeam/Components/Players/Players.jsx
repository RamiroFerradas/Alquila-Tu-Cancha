import { useCallback, useState, Fragment, useEffect, useMemo } from "react";
import player_unknown from "../../Assets/Player/profile_player.png";
import { FaWindowClose } from "react-icons/fa";
import Details from "./Details";
import Swal from "sweetalert2";

import { useTeams } from "../../../../Hooks/useTeams";
import TeamsIndicator from "./TeamsIndicator";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useFetch from "../../../../Hooks/useFetch";
import Loader from "../../../../Components/Loader/Loader";
import SearchBar from "../Countries/SearchBar";

export default function Players({
  showModal,
  setShowModal,
  players,
  teamName,
  setPlayers,
}) {
  const [playerName, setPlayerName] = useState();
  const [playerImage, setPlayerImage] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const { team1, team2, setteam1, setteam2, selectPlayer, removePlayer } =
    useTeams();
  const { loading } = useFetch();

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };

  const team1Complete = team1.players.length === 5;
  const team2Complete = team2.players.length === 5;

  const selectTeam = async (e, player) => {
    if (!team1Complete || !team2Complete) {
      Swal.fire({
        title: "Agregar jugador a:",
        icon: "question",
        text: `${
          team1Complete ? team1.name : team2Complete ? team2.name : ""
        } ${team1Complete || team2Complete ? `está completo!` : ""}`,
        showConfirmButton: !team1Complete,
        confirmButtonColor:
          "bg-green-500 hover:bg-green-600 focus:ring-green-500",
        denyButtonColor: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
        confirmButtonText: `${team1?.name}`,
        denyButtonText: `${team2?.name}`,
        showDenyButton: !team2Complete,
        reverseButtons: true,
        customClass: {
          title: "text-lg font-medium text-gray-800", // Estilos para el título
          content: "text-sm text-gray-600", // Estilos para el contenido
          actions: "flex items-center justify-center flex-row-reverse",
          confirmButton: "ml-2",
          popup: "z-20",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          selectPlayer(player, team1);
        } else if (result.isDenied) {
          selectPlayer(player, team2);
        }
      });
    } else {
      Swal.fire({
        title: "Ambos equipos estan llenos",
        icon: "error",
        text: `No puede agregar mas de 5 jugadores por equipo`,
      }).then((result) => {
        result.isConfirmed && e.stopPropagation();
      });
    }
  };

  const existPlayer = useCallback(
    (player) => {
      const t1 = team1.players.some((p) => p.player_key === player.player_key);
      const t2 = team2.players.some((p) => p.player_key === player.player_key);

      if (t1 || t2) {
        return true;
      } else {
        return false;
      }
    },
    [team1.players, team2.players]
  );

  const [playerFiltered, setPlayerFiltered] = useState([]);

  useEffect(() => {
    !playerFiltered.length && setPlayerFiltered(players);
  }, [players, playerFiltered]);

  return (
    <Fragment>
      <div className="">
        <Dialog
          open={showModal}
          outsidePointerDown
          ancestorScroll
          handler={(e) => handleOpenModal(e)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          size="xl"
          className="bg-gradient-to-bl from-lime-200 via-white to-orange-200 rounded-3xl"
        >
          <Details
            playerName={playerName}
            playerImage={playerImage}
            setOpenDetail={setOpenDetail}
            openDetail={openDetail}
            setShowModal={setShowModal}
            selectTeam={selectTeam}
          />
          <DialogBody>
            <p className="text-center p-0 m-0 right-0 absolute left-0 top-1 text-xl font-bold ">
              {teamName}
            </p>

            {!players && loading ? (
              <Loader />
            ) : (
              <div
                onClick={(event) => event.stopPropagation()}
                className="bg-lime-500 p-1 mt-5 rounded-2xl overflow-auto"
                style={{ height: "80vh" }}
              >
                <TeamsIndicator />
                <div className="flex flex-col justify-center items-center relative">
                  <div className="md:w-1/2 w-full block md:absolute bottom-2">
                    <SearchBar
                      setPlayerFiltered={setPlayerFiltered}
                      data={players}
                    />
                  </div>
                </div>

                <div className="p-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 rounded-xl overflow-auto">
                  {!openDetail && (
                    <button
                      className="absolute top-0 right-0"
                      onClick={() => {
                        setShowModal(false);
                        setPlayers([]);
                      }}
                    >
                      <p className="text-2xl absolute top-0 right-0 p-2">
                        <FaWindowClose />
                      </p>
                    </button>
                  )}

                  {playerFiltered?.map((ele) => {
                    const showButtonCancel = existPlayer(ele);
                    const findTeam1 = team1.players.find(
                      (p) => p.player_key === ele.player_key
                    );
                    const findTeam2 = team2.players.find(
                      (p) => p.player_key === ele.player_key
                    );

                    return (
                      <div
                        key={ele.player_key}
                        className="flex flex-col items-center justify-center border-warning-300 border-2 rounded-3xl p-1 bg-lime-200 h-48 relative"
                      >
                        {findTeam1 || findTeam2 ? (
                          findTeam1 ? (
                            <div className="absolute top-1 right-1 bg-red-500 rounded-full text-white w-4 h-4  flex items-center justify-center text-center">
                              <span>1</span>
                            </div>
                          ) : (
                            <div className="absolute top-1 right-1 bg-blue-700 rounded-full text-white w-4 h-4 flex items-center justify-center">
                              <span>2</span>
                            </div>
                          )
                        ) : null}
                        <p className="text-center text-sm">{ele.player_name}</p>
                        <img
                          className="rounded-3xl object-cover h-28"
                          // loading="lazy"
                          src={
                            ele.player_image ? ele.player_image : player_unknown
                          }
                          alt={ele.player_name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = player_unknown;
                          }}
                        />
                        <div className="flex">
                          <Button
                            onClick={(e) => {
                              setOpenDetail(true);
                              setPlayerName(ele.player_name);
                              setPlayerImage(ele.player_image);
                            }}
                            className="inline-block rounded bg-warning px-3 pt-1 pb-1 mt-1 text-xs font-medium uppercase leading-normal"
                          >
                            Detalles
                          </Button>
                          {!showButtonCancel ? (
                            <Button
                              className="inline-block rounded ml-1 px-3 pt-1 pb-1 mt-1 text-xs font-medium uppercase leading-normal"
                              onClick={(e) => {
                                selectTeam(e, ele);
                              }}
                              color="green"
                            >
                              <p className="">+</p>
                            </Button>
                          ) : (
                            <Button
                              className="inline-block rounded ml-1 px-3 pt-1 pb-1 mt-1 text-xs font-medium uppercase leading-normal"
                              onClick={() => {
                                removePlayer(ele.player_key);
                              }}
                              color="red"
                            >
                              <p className="">x</p>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </DialogBody>
          <DialogFooter className="justify-center flex-row"></DialogFooter>
        </Dialog>
      </div>
    </Fragment>
  );
}
