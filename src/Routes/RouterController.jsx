import { Navbar } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import Landing from "../Components/Landing/Landing";
import Navmenu from "../Components/Navmenu/Navmenu";
import HomeCreateTeam from "../Pages/CreateTeam/Components/Home/HomeCreateTeam";
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
    </Routes>
  );
}

export { RouterController };
