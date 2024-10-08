import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home";
import Root from "./Components/Root";
import Tracks from "./Components/Tracks";
import Playlist from "./Components/Playlist";
import Artists from "./Components/Artists";

export default function App() {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/artists" element={<Artists />} />
      </Route>
    </Routes>
  );
}
