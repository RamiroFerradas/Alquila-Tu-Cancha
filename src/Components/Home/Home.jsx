import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { COUNTRIES_URL } from "../../services";
import Countries from "../Countries/Countries";
import Leagues from "../Leagues/Leagues";
import Teams from "../Teams/Teams";

export default function Home() {
  const [countryId, setCountryId] = useState("");
  const [leagueId, setLeagueId] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Countries setCountryId={setCountryId} />

      <Leagues setCountryId={setCountryId} countryId={countryId} />
      <Teams setLeagueId={setLeagueId} leagueId={leagueId} />
    </div>
  );
}
