const { VITE_APIKEY } = import.meta.env;

export const COUNTRIES_URL = `https://apiv3.apifootball.com/?action=get_countries&APIkey=${VITE_APIKEY}`;

export const LEAGUE_URL = (country_id) =>
  country_id &&
  `https://apiv3.apifootball.com/?action=get_leagues&country_id=${country_id}&APIkey=${VITE_APIKEY}`;
