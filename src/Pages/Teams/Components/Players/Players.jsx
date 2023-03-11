import { Button } from "@material-tailwind/react";
import { useDrag } from "react-dnd";
import { useTeams } from "../../../../Hooks/useTeams";
import player_unknown from "../../../CreateTeam/Assets/Player/profile_player.png";

export default function Players({ players }) {
  const { removePlayer } = useTeams();

  return (
    <>
      {players.map(
        ({ player_id, player_name, player_image, player_key }, index) => (
          <div
            // style={{ opacity: isDragging ? 0.5 : 1 }}
            key={player_id}
            className="flex gap-3 border-4 border-red-200 rounded-xl p-2 overflow-hidden h-12 w-56 items-center mb-2 relative ju"
          >
            {/* <div className={`w-6 h-6 rounded-full bg-blue-500 `}></div> */}
            <img
              className="h-10 rounded-full"
              src={player_image}
              alt={player_name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = player_unknown;
              }}
            />
            <span className="text-black text-xl font-bold">{player_name}</span>
            <Button
              className="inline-block rounded  px-3 pt-1 pb-1 text-xs font-medium uppercase leading-normal absolute right-1"
              onClick={() => {
                removePlayer(player_key);
              }}
              color="red"
            >
              <p className="">x</p>
            </Button>
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
