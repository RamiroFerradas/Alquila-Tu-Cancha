import { Route, Routes } from "react-router-dom";
import Landing from "../Components/Landing/Landing";
import HomeCreateTeam from "../Pages/CreateTeam/Components/Home/HomeCreateTeam";
import HomeTeams from "../Pages/Teams/Components/Home/HomeTeams";

function RouterController() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/create" element={<HomeCreateTeam />} />
      <Route path="/teams" element={<HomeTeams />} />
    </Routes>
  );
}

export { RouterController };
