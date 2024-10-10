import React, { useEffect, useState } from "react";
import data from "../spotify_data.json";
import Loading from "./Loading";

const getMostPlayedSongsInRange = (data, startDate, endDate) => {
  return data
    .filter((song) => {
      const songDate = new Date(song.ts);
      return songDate >= startDate && songDate <= endDate;
    })
    .sort((a, b) => b.ms_played - a.ms_played)
    .slice(0, 6);
};

const Trindy = () => {
  const [mostPlayedSongs, setMostPlayedSongs] = useState([]);
  const [isLoading, setIsLoadind] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadind(false);
    }, 1000);
    const startDate = new Date("2022-12-22T00:00:00Z");
    const endDate = new Date("2023-01-03T23:59:59Z");

    const songs = getMostPlayedSongsInRange(data, startDate, endDate);
    setMostPlayedSongs(songs);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col items-center gap-4 mb-6 mt-6  ">
      <h2 className="text-xl font-bold mb-5 dark:text-white">
        The Most Trendy Songs
      </h2>
      {mostPlayedSongs.length === 0 ? (
        <p className="dark:text-[#fff]">
          No songs available in this date range.
        </p>
      ) : (
        <div className="flex gap-4 p-4 flex-wrap w-full justify-center">
          {mostPlayedSongs.map((song, index) => (
            <div
              key={index}
              className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-1"
            >
              <h3 className="text-xl font-semibold  text-emerald-600">
                {song.master_metadata_track_name}
              </h3>
              {song.master_metadata_album_artist_name && (
                <p className="text-gray-700 dark:text-[#fff]">
                  by {song.master_metadata_album_artist_name}
                </p>
              )}
              <p className="text-gray-500 dark:text-[#ddd]">
                Plays: {song.ms_played}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trindy;
