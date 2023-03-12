import { Button } from "@material-tailwind/react";
import { useDrag } from "react-dnd";
import { useLocation } from "react-router-dom";
import { useTeams } from "../../../../Hooks/useTeams";
// import { averageRating } from "../../../../Utils/AverageRating";
import player_unknown from "../../../CreateTeam/Assets/Player/profile_player.png";

export default function Players({ players }) {
  const { removePlayer } = useTeams();
  const { pathname } = useLocation();

  return (
    <div>
      {players.map(
        (
          {
            player_id,
            player_name,
            player_image,
            player_key,
            player_type,
            player_rating,
          },
          index
        ) => (
          <div className="flex" key={index}>
            <div
              key={player_id}
              className="flex gap-3 border-4 border-red-200 rounded-xl p-2 overflow-hidden h-12 w-96 items-center mb-2 relative justify-around text-white"
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
              <span className=" text-center text-blac text-lg font-bold flex-1 truncate">
                {player_name}
              </span>

              {pathname === "/teams" ? (
                <Button
                  className="inline-block rounded px-3 pt-1 pb-1 text-xs font-medium uppercase leading-normal "
                  onClick={() => {
                    removePlayer(player_key);
                  }}
                  color="red"
                >
                  <p className="">x</p>
                </Button>
              ) : (
                <p className="inline-block rounded px-3 pt-1 pb-1 text-xs font-medium uppercase leading-normal ">
                  {player_rating ? Math.floor(player_rating * 10) : "-"}
                </p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
