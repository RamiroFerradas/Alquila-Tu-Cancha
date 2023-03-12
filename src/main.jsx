import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Navmenu from "./Components/Navmenu/Navmenu";
import { TeamsProvider } from "./Context/TeamsContext";

import "./index.css";
import HomeCreateTeam from "./Pages/CreateTeam/Components/Home/HomeCreateTeam";
import HomeMatch from "./Pages/Match/Components/Home/HomeMatch";
import HomeTeams from "./Pages/Teams/Components/Home/HomeTeams";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TeamsProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </TeamsProvider>
  </React.StrictMode>
);
