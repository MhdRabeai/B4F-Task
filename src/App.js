import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

// import Home from "./Components/Home";
import Root from "./Components/Root";
// import Tracks from "./Components/Tracks";
// import Playlist from "./Components/Playlist";
// import Artists from "./Components/Artists";
import { lazy, Suspense } from "react";
import Loading from "./Components/Loading";
const Home = lazy(() => import("./Components/Home"));
const Tracks = lazy(() => import("./Components/Tracks"));
const Playlist = lazy(() => import("./Components/Playlist"));
const Artists = lazy(() => import("./Components/Artists"));

export default function App() {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route element={<SuspenseLayout />}>
          <Route path="/" element={<Tracks />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/boadcast" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}
const SuspenseLayout = () => (
  <Suspense fallback={<Loading />}>
    <Outlet />
  </Suspense>
);
