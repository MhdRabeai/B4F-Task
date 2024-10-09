import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

// import Home from "./Components/Home";
import Root from "./Components/Root";
// import Tracks from "./Components/Tracks";
// import Playlist from "./Components/Playlist";
// import Artists from "./Components/Artists";
import { lazy, Suspense } from "react";
import Loading from "./Components/Loading";
const Home = lazy(() => delayForDemo(import("./Components/Home")));
const Tracks = lazy(() => delayForDemo(import("./Components/Tracks")));
const Playlist = lazy(() => delayForDemo(import("./Components/Playlist")));
const Artists = lazy(() => delayForDemo(import("./Components/Artists")));

export default function App() {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route element={<SuspenseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/artists" element={<Artists />} />
        </Route>
      </Route>
    </Routes>
  );
}
function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
const SuspenseLayout = () => (
  <Suspense fallback={<Loading />}>
    <Outlet />
  </Suspense>
);
