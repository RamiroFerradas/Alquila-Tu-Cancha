import { Navbar } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import Navmenu from "../Components/Navmenu/Navmenu";
import HomeCreateTeam from "../Pages/CreateTeam/Components/Home/HomeCreateTeam";
import Landing from "../Pages/Landing/Landing";
import HomeMatch from "../Pages/Match/Components/Home/HomeMatch";
import HomeTeams from "../Pages/Teams/Components/Home/HomeTeams";

function RouterController() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/create"
        element={
          <>
            <Navmenu />
            <HomeCreateTeam />
          </>
        }
      />
      <Route
        path="/teams"
        element={
          <>
            <Navmenu />
            <HomeTeams />
          </>
        }
      />
      <Route
        path="/match"
        element={
          <>
            <Navmenu />
            <HomeMatch />
          </>
        }
      />
    </Routes>
  );
}

export { RouterController };
