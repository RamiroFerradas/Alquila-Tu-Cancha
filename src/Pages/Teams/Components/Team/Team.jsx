import Player from "../Player/Players";

export default function Team({ team }) {
  return (
    <div>
      <h2>{team.name}</h2>
      <div>
        {team.players.map((player) => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
