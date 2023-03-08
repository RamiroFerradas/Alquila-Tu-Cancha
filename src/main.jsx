import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TeamsProvider } from "./Context/TeamsContext";

import "./index.css";
import { RouterController } from "./Routes/RouterController";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TeamsProvider>
      <BrowserRouter>
        <RouterController />
      </BrowserRouter>
    </TeamsProvider>
  </React.StrictMode>
);
