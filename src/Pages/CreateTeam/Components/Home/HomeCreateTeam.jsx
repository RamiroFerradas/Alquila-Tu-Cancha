import { useState } from "react";
import Countries from "../Countries/Countries";
import Leagues from "../Leagues/Leagues";
import Navmenu from "../../../../Components/Navmenu/Navmenu";
import Teams from "../Teams/Teams";
import Players from "../Players/Players";
import Details from "../Players/Details";

export default function HomeCreateTeam() {
  const [countryId, setCountryId] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [players, setPlayers] = useState([]);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-r from-lime-50 to-lime-200">
      <Players
        showModal={showModal}
        setShowModal={setShowModal}
        players={players}
      />
      <Details />
      <Navmenu />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-4/5 overflow-y-auto">
        <Countries setCountryId={setCountryId} />
        <Leagues
          setCountryId={setCountryId}
          setLeagueId={setLeagueId}
          countryId={countryId}
        />
        <Teams
          setLeagueId={setLeagueId}
          leagueId={leagueId}
          setShowModal={setShowModal}
          setPlayers={setPlayers}
        />
      </div>
    </div>
  );
}
