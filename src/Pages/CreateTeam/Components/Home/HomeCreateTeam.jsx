import { useRef, useState } from "react";
import Countries from "../Countries/Countries";
import Leagues from "../Leagues/Leagues";
import Teams from "../Teams/Teams";
import MyTeams from "../MyTeams/MyTeams";
import { useTeams } from "../../../../Hooks/useTeams";
import pelota from "../../../../assets/background/pelota.jpg";
import styles from "./HomeCreateTeam.module.css";

export default function HomeCreateTeam() {
  const [countryId, setCountryId] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [players, setPlayers] = useState([]);
  const [continueButton, setContinueButton] = useState(false);
  const { team1, team2 } = useTeams();
  const countriesRef = useRef();
  const leaguesRef = useRef();
  const teamsRef = useRef();

  const [isBgLoaded, setIsBgLoaded] = useState(false);

  const handleBgLoad = () => {
    setIsBgLoaded(true);
  };

  return (
    <div className={` md:p-0 ${isBgLoaded ? styles.bg : ""}`}>
      {(!continueButton && !team1.name) || (!continueButton && !team2.name) ? (
        <div className="h-4/5  overflow-hidden">
          <MyTeams setContinueButton={setContinueButton} />
        </div>
      ) : (
        <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <section
            ref={countriesRef}
            className={`bg-gray-900 bg-opacity-70 backdrop-blur-xs`}
          >
            <Countries
              setCountryId={setCountryId}
              setLeagueId={setLeagueId}
              leaguesRef={leaguesRef}
            />
          </section>

          <section
            ref={leaguesRef}
            className={`${
              !countryId && `hidden`
            } md:block bg-gray-900 bg-opacity-70 backdrop-blur-xs`}
          >
            <Leagues
              leaguesRef={leaguesRef}
              setCountryId={setCountryId}
              setLeagueId={setLeagueId}
              countryId={countryId}
              teamsRef={teamsRef}
            />
          </section>

          <section
            ref={teamsRef}
            className={`${
              !leagueId && `hidden`
            } md:block bg-gray-900 bg-opacity-70 backdrop-blur-xs`}
          >
            <Teams
              teamsRef={teamsRef}
              setLeagueId={setLeagueId}
              leagueId={leagueId}
              setPlayers={setPlayers}
              players={players}
            />
          </section>
        </div>
      )}
      <img src={pelota} onLoad={handleBgLoad} className="hidden" alt="" />
    </div>
  );
}
