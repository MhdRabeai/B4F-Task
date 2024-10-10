import React, { useEffect, useState, useMemo } from "react";
import jsonData from "../spotify_data.json";
import Loading from "./Loading";
import AccordionItem from "./Accordion";

const Playlist = () => {
  const [count0, setCount0] = useState({});
  const [isAll, setIsAll] = useState(true);
  const [isLoading, setIsLoadind] = useState(true);
  const data = useMemo(() => {
    const lastYear = new Date().getFullYear() - 1;
    return jsonData.filter(
      (e) =>
        e["ms_played"] &&
        (isAll || e["ts"].split("-")[0] === lastYear.toString())
    );
  }, [isAll, jsonData]);

  function editData() {
    const artist = {};
    const track = {};
    const album = {};

    data.forEach((item) => {
      if (item["master_metadata_album_artist_name"]) {
        const artistName = item["master_metadata_album_artist_name"];
        artist[artistName] = (artist[artistName] || 0) + 1;
      }

      if (item["master_metadata_track_name"]) {
        const trackName = item["master_metadata_track_name"];
        track[trackName] = (track[trackName] || 0) + item["ms_played"];
      }

      if (item["master_metadata_album_album_name"]) {
        const albumName = item["master_metadata_album_album_name"];
        album[albumName] = (album[albumName] || 0) + item["ms_played"];
      }
    });

    const sortedArtists = Object.entries(artist)
      .map(([name, times]) => ({ name, times }))
      .sort((a, b) => b.times - a.times)
      .slice(0, 100);

    const sortedTracks = Object.entries(track)
      .map(([name, times]) => ({ name, times }))
      .sort((a, b) => b.times - a.times)
      .slice(0, 100);

    const sortedAlbums = Object.entries(album)
      .map(([name, times]) => ({ name, times }))
      .sort((a, b) => b.times - a.times)
      .slice(0, 100);
    setCount0({
      Artists: sortedArtists,
      Tracks: sortedTracks,
      Albums: sortedAlbums,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoadind(false);
    }, 1000);
    editData();
  }, [data]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container mt-6 mx-auto px-4 md:px-12">
      <h2 className="text-xl font-bold mb-5 dark:text-[#fff]">PlayList</h2>
      <div className="dropdown flex justify-end relative">
        <div className="bttn">
          <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center ">
            <span className="mr-1">Show By</span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
            </svg>
          </button>
          <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 top-9 z-10	right-0">
            <li className="w-full">
              <button
                className="w-full rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block "
                onClick={() => setIsAll(true)}
              >
                All Time
              </button>
            </li>
            <li className="w-full">
              <button
                className="w-full bg-gray-200 hover:bg-gray-400 py-2 px-4 block "
                onClick={() => setIsAll(false)}
              >
                Last year
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex py-6">
        <div className="container mx-auto ">
          {Object.entries(count0)
            .slice(0, 1)
            .map(([key, arr], id) => (
              <AccordionItem key={id} faq={arr} name={key} hours={false} />
            ))}
          {Object.entries(count0)
            .slice(-2)
            .map(([key, dataArray], id) => (
              <AccordionItem key={id} faq={dataArray} name={key} hours={true} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
