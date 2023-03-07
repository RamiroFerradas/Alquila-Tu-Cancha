import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import Landing from "../Components/Landing/Landing";

function RouterController() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export { RouterController };
