import { useRef, useState } from "react";
import Countries from "../Countries/Countries";
import Leagues from "../Leagues/Leagues";
import Teams from "../Teams/Teams";
import MyTeams from "../MyTeams/MyTeams";
import { useTeams } from "../../../../Hooks/useTeams";
import pasto from "../../Assets/Backgrounds/pasto.jpeg";

export default function HomeCreateTeam() {
  const [countryId, setCountryId] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [players, setPlayers] = useState([]);
  const [continueButton, setContinueButton] = useState(false);
  const { team1, team2 } = useTeams();
  const countriesRef = useRef();
  const leaguesRef = useRef();
  const teamsRef = useRef();

  return (
    <div className={`px-6 md:p-0`}>
      {(!continueButton && !team1.name) || (!continueButton && !team2.name) ? (
        <div className="h-4/5  overflow-hidden">
          <MyTeams setContinueButton={setContinueButton} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <section
            ref={countriesRef}
            className={` bg-gradient-to-b from-green-50 to-green-100`}
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
            } md:block bg-gradient-to-b from-yellow-50 via-orange-100 to-yellow-200`}
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
            } md:block bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200`}
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
    </div>
  );
}
