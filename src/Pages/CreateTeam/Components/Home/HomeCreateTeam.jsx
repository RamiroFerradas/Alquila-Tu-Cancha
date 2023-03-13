import { useRef, useState } from "react";
import Countries from "../Countries/Countries";
import Leagues from "../Leagues/Leagues";
import Teams from "../Teams/Teams";
import MyTeams from "../MyTeams/MyTeams";
import { useTeams } from "../../../../Hooks/useTeams";
import pelota from "../../../../assets/background/pelota.jpg";
import styles from "./HomeCreateTeam.module.css";
import Players from "../Players/Players";
import { Button } from "@material-tailwind/react";
import { BsSearch } from "react-icons/bs";

export default function HomeCreateTeam() {
  const [countryId, setCountryId] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [players, setPlayers] = useState([]);
  const [continueButton, setContinueButton] = useState(false);
  const { team1, team2 } = useTeams();
  const countriesRef = useRef();
  const leaguesRef = useRef();
  const teamsRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState([]);
  const [searchGlobal, setSearchGlobal] = useState(false);

  return (
    <div className={` md:p-0 ${styles.bgPelota}`}>
      {(!continueButton && !team1.name) || (!continueButton && !team2.name) ? (
        <div className="h-4/5  overflow-hidden">
          <MyTeams setContinueButton={setContinueButton} />
        </div>
      ) : (
        <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* <div className="absolute z-30 md:right-5 right-24 top-4">
            <button
              onClick={() => {
                setShowModal(true);
                setSearchGlobal(true);
              }}
              className="flex items-center justify-center px-4 py-2 text-gray-800 bg-gray-300 rounded-md shadow-sm group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 h-10"
            >
              <BsSearch class="w-5 h-5 mr-2" />
            </button>
          </div> */}
          <Players
            searchGlobal={searchGlobal}
            setSearchGlobal={setSearchGlobal}
            showModal={showModal}
            setShowModal={setShowModal}
            players={players}
            teamName={teamName}
            setTeamName={setTeamName}
            setPlayers={setPlayers}
          />
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
              setTeamName={setTeamName}
              showModal={showModal}
              setShowModal={setShowModal}
              teamsRef={teamsRef}
              setLeagueId={setLeagueId}
              leagueId={leagueId}
              setPlayers={setPlayers}
              players={players}
              setSearchGlobal={setSearchGlobal}
            />
          </section>
        </div>
      )}
    </div>
  );
}
