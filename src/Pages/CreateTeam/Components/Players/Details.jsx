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
import Loader from "../../../../Components/Loader/Loader";

export default function Details({
  playerName,
  setOpenDetail,
  openDetail,
  playerImage,
  selectTeam,
}) {
  let { data, loading } = useFetch(PLAYER_URL(playerName));

  console.log(data);
  const ratings = data?.map((player) => {
    const rating = parseInt(player.player_rating);
    return isNaN(rating) ? 0 : rating;
  });
  console.log(ratings);
  const averageRating =
    ratings !== undefined
      ? ratings?.reduce((total, rating) => total + rating, 0) / ratings?.length
      : 0;

  console.log(averageRating);

  const teamNamesSet = new Set(data?.map((ele) => ele.team_name));

  return (
    <Fragment>
      <Dialog
        open={openDetail}
        handler={(e) => {
          e.stopPropagation();
          setOpenDetail(!openDetail);
        }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-gradient-to-bl from-lime-200 via-white to-orange-200  overflow-auto rounded-3xl"
      >
        <DialogBody>
          <div
            key={data?.[0].player_name}
            style={{ height: "25rem" }}
            className="flex flex-col items-center justify-center  border-warning-300 border-4 rounded-3xl overflow-hidden"
          >
            <button
              className="absolute top-0 right-0 p-2"
              onClick={(e) => {
                e.stopPropagation(e);
                setOpenDetail(false);
              }}
            >
              <p className="text-xl">
                <FaWindowClose />
              </p>
            </button>
            {loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col items-center relative">
                <div className="absolute left-5 top-4 text-lg flex">
                  <p>⭐</p>
                  <p className="text-2xl font-bold ">
                    {Math.ceil(averageRating * 10)}
                  </p>
                </div>
                <div>
                  <img
                    className=" rounded-3xl object-cover mb-4 h-48 pt-1"
                    src={playerImage}
                    alt={data?.[0].player_name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = player_unknown;
                    }}
                  />
                </div>
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
                        <span className="font-semibold mr-2">Posicion</span>
                        {data?.[0].player_type.slice()}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-auto h-40">
                    <p className="text-md font-semibold">Participaciones:</p>
                    <ul>
                      {[...teamNamesSet].map((teamName, index) => (
                        <li key={index}>{`- ${teamName}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="justify-center flex-row">
          <Button
            variant="gradient"
            color="green"
            onClick={(e) => {
              e.stopPropagation();
              selectTeam(e, data?.[0]);
            }}
            className={!data && `hidden`}
          >
            <span>Agregar a equipo</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
