import React from "react";

export default function NoPlayers({ players }) {
  return Array.from({ length: 5 - players.length }).map((_, index) => (
    <div
      key={`placeholder-${index}`}
      className="flex gap-3 border-4 border-gray-500 rounded-xl p-2 overflow-hidden h-12 w-56 items-center mb-2 relative justify-center"
    >
      <div
        className={`w-9 h-9 rounded-full bg-gray-200 opacity-90 left-3 absolute`}
      ></div>
      <span className="text-gray-400 text-xl font-bold text-center">Vacio</span>
    </div>
  ));
}
