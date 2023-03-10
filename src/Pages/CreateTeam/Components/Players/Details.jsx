import React, { Fragment, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import useFetch from "../../../../Hooks/useFetch";
import { PLAYER_URL } from "../../../../services";
import player_unknown from "../../Assets/Player/profile_player.png";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function Details({
  playerName,
  setOpenDetail,
  openDetail,
  playerImage,
  handleOpen,
}) {
  let { data, loading } = useFetch(PLAYER_URL(playerName));
  console.log(data);
  const totalGoals = data?.reduce((acumulador, jugador) => {
    return acumulador + parseInt(jugador.player_goals);
  }, 0);

  const teamNamesSet = new Set(data?.map((ele) => ele.team_name));

  return (
    <Fragment>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog
        open={openDetail}
        handler={(e) => handleOpen(e)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-gradient-to-bl from-lime-200 via-white to-orange-200  overflow-auto rounded-3xl "
      >
        {/* <DialogHeader>{data?.[0].player_name}</DialogHeader> */}
        <DialogBody>
          <div
            key={data?.[0].player_name}
            className="flex flex-col items-center justify-center  border-warning-300 border-4 rounded-3xl"
          >
            <button
              className="absolute top-0 right-0 p-2"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDetail(false);
              }}
            >
              <p className="text-xl">
                <FaWindowClose />
              </p>
            </button>
            {loading ? (
              <div className="items-center flex h-96">
                <p>Cargando...</p>
              </div>
            ) : (
              <>
                <img
                  className=" rounded-3xl object-cover mb-4 h-48 pt-1"
                  src={playerImage}
                  alt={data?.[0].player_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = player_unknown;
                  }}
                />
                <p className="text-2xl font-bold mb-2">
                  {data?.[0].player_name}
                </p>
                <div className="grid grid-cols-2 gap-12">
                  <div className="">
                    <div className="flex flex-col items-center  p-4">
                      <p className="text-md">
                        <span className="font-semibold mr-2">Edad:</span>
                        {data?.[0].player_age}
                      </p>
                      <p className="text-md"></p>
                      <span className="font-semibold mr-2">Nacimiento:</span>
                      {data?.[0].player_birthdate}
                      <p className="text-md">
                        <span className="font-semibold mr-2">
                          Goles totales:
                        </span>
                        {totalGoals}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-auto h-40">
                    <p className="text-md font-semibold">Equipos:</p>
                    <ul>
                      {[...teamNamesSet].map((teamName) => (
                        <li>{`- ${teamName}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="justify-center flex-row">
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpen}
            className={!data && `hidden`}
          >
            <span>Agregar a equipo</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
