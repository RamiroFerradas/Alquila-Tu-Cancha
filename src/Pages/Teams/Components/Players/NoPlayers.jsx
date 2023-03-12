import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoPlayers({ players }) {
  const navigate = useNavigate();
  return Array.from({ length: 5 - players.length }).map((_, index) => (
    <div
      key={`placeholder-${index}`}
      className="flex gap-3 border-4 border-gray-500 rounded-xl p-2 overflow-hidden h-12 w-96  items-center mb-2 relative justify-between"
    >
      <div className="flex items-center">
        <span className="inline-block rounded px-1 pt-1 pb-1 text-xs font-medium uppercase leading-normal opacity-0 mr-3">
          asd
        </span>
        <div
          className={`w-9 h-9 rounded-full bg-gray-200 opacity-90 left-3 absolut`}
        ></div>
      </div>
      <span className="text-gray-400 text-xl font-bold text-center">Vacio</span>
      <Button
        className="inline-block rounded px-3 pt-1 pb-1 text-xs font-medium uppercase leading-normal "
        onClick={() => {
          navigate("/create");
        }}
        color="green"
      >
        <p className="">+</p>
      </Button>
    </div>
  ));
}
