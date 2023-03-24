const { VITE_APIKEY } = import.meta.env;
const BASE_URL = `https://apiv3.apifootball.com/`;

const getAPIURL = (action, params = {}, apikey = VITE_APIKEY) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `${BASE_URL}?action=${action}&${queryString}&APIkey=${apikey}`;
};

export const COUNTRIES_URL = getAPIURL("get_countries");
export const LEAGUES_URL = (country_id) =>
  country_id && getAPIURL("get_leagues", { country_id });
export const TEAMS_URL = (league_id) =>
  league_id && getAPIURL("get_teams", { league_id });
export const PLAYER_URL = (player_name) =>
  player_name && getAPIURL("get_players", { player_name });
