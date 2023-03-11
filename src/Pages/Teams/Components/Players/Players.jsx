import { Button } from "@material-tailwind/react";
import { useDrag } from "react-dnd";
import { useTeams } from "../../../../Hooks/useTeams";
import player_unknown from "../../../CreateTeam/Assets/Player/profile_player.png";

export default function Players({ players }) {
  const { removePlayer } = useTeams();

  return (
    <>
      {players.map(
        (
          { player_id, player_name, player_image, player_key, player_type },
          index
        ) => (
          <div className="flex">
            <div
              key={player_id}
              className="flex gap-3 border-4 border-red-200 rounded-xl p-2 overflow-hidden h-12 w-80 items-center mb-2 relative justify-around"
            >
              <span className="inline-block rounded px-1 pt-1 pb-1 text-xs font-medium uppercase leading-normal">
                {player_type.slice(0, 3)}
              </span>
              <img
                className="h-10 rounded-full"
                src={player_image}
                alt={player_name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = player_unknown;
                }}
              />
              <span className=" text-center text-black text-lg font-bold flex-1 truncate">
                {player_name}
              </span>

              <Button
                className="inline-block rounded px-3 pt-1 pb-1 text-xs font-medium uppercase leading-normal "
                onClick={() => {
                  removePlayer(player_key);
                }}
                color="red"
              >
                <p className="">x</p>
              </Button>
            </div>
          </div>
        )
      )}
      {Array.from({ length: 5 - players.length }).map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="flex gap-3 border-4 border-gray-300 rounded-xl p-2 overflow-hidden h-12 w-56 items-center mb-2 relative ju"
        >
          <div className={`w-10 h-10 rounded-full bg-gray-300`}></div>
          <span className="text-gray-400 text-xl font-bold">Vacio</span>
        </div>
      ))}
    </>
  );
}
