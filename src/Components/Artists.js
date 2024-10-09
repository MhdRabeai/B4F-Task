import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import data from "../spotify_data.json";

const Artists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);

      const uniqueArtists = Array.from(
        new Set(
          data
            .map((item) => item.master_metadata_album_artist_name)
            .filter((name) => name)
        )
      );

      const artistStats = uniqueArtists.map((artistName) => ({
        name: artistName,
        totalPlays: data.filter(
          (item) => item.master_metadata_album_artist_name === artistName
        ).length,
      }));

      artistStats.sort((a, b) => b.totalPlays - a.totalPlays);

      setArtists(artistStats);
    }, 0);
  }, []);

  const calculateArtistStats = (artistName) => {
    const artistTracks = data.filter(
      (item) => item.master_metadata_album_artist_name === artistName
    );

    const totalArtistPlays = artistTracks.length;
    const uniqueArtistTracks = new Set(
      artistTracks.map((item) => item.master_metadata_track_name)
    );

    const totalPlays = data.length;
    const artistPercentage = ((totalArtistPlays / totalPlays) * 100).toFixed(2);

    const uniqueTracks = Array.from(
      new Set(artistTracks.map((item) => item.master_metadata_track_name))
    );
    const topArtistTracks = uniqueTracks
      .sort((trackNameA, trackNameB) => {
        const playsA = artistTracks.filter(
          (item) => item.master_metadata_track_name === trackNameA
        ).length;
        const playsB = artistTracks.filter(
          (item) => item.master_metadata_track_name === trackNameB
        ).length;
        return playsB - playsA;
      })
      .slice(0, 20);

    const seasons = { Winter: 0, Spring: 0, Summer: 0, Autumn: 0 };

    artistTracks.forEach((item) => {
      const month = new Date(item.ts).getMonth() + 1;
      if (month === 12 || month <= 2) seasons.Winter++;
      else if (month >= 3 && month <= 5) seasons.Spring++;
      else if (month >= 6 && month <= 8) seasons.Summer++;
      else seasons.Autumn++;
    });

    const mostListenedSeason = Object.entries(seasons).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    const totalListeningTime = artistTracks.reduce(
      (acc, item) => acc + item.ms_played,
      0
    );
    const { hours, minutes, seconds } = msToTime(totalListeningTime);

    return {
      totalArtistPlays,
      uniqueTracksCount: uniqueArtistTracks.size,
      artistPercentage,
      topArtistTracks,
      mostListenedSeason,
      totalListeningTime: `${hours}`,
    };
  };

  const msToTime = (duration) => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return {
      hours: hours < 10 ? "" + hours : hours,
      minutes: minutes < 10 ? "0" + minutes : minutes,
      seconds: seconds < 10 ? "0" + seconds : seconds,
    };
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container mt-6 mx-auto px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {artists.slice(0, visibleCount).map((artist) => {
          const {
            totalArtistPlays,
            uniqueTracksCount,
            artistPercentage,
            topArtistTracks,
            mostListenedSeason,
            totalListeningTime,
          } = calculateArtistStats(artist.name);

          return (
            <div
              key={artist.name}
              className="bg-gray-100 rounded-lg p-5 text-center shadow-xl transform hover:scale-105 transition duration-300"
            >
              <h1 className="text-xl text-center font-bold text-green-800 mb-2">
                {artist.name}
              </h1>
              <p className="text-md">
                Total Streams<br></br>{" "}
                <span className="text-5xl font-semibold font-mono s text-green-500">
                  {totalArtistPlays}
                </span>
              </p>
              <p className="text-md">
                Tracks<br></br>{" "}
                <span className="font-semibold text-5xl text-green-500">
                  {uniqueTracksCount}
                </span>
              </p>
              <p className="text-md font-bold text-gray-400 ">
                Listening Time<br></br>{" "}
                <span className="font-medium  text-5xl text-green-500">
                  {totalListeningTime}
                </span>
                <p>Hours</p>
              </p>
              <p className="text-md">
                Percentage<br></br>{" "}
                <span className="font-semibold text-5xl text-green-500">
                  {artistPercentage}%
                </span>
              </p>
              <p className="text-md">
                Most Listened Season<br></br>{" "}
                <span className="font-semibold  text-5xl text-green-500">
                  {mostListenedSeason}
                </span>
              </p>
              <h2 className="text-md font-semibold text-green-800 mt-4">
                Top 20 Tracks
              </h2>
              <ul className="list-disc list-inside text-left text-green-600">
                {topArtistTracks.map((track, index) => (
                  <li key={index}>{track}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {visibleCount < artists.length && (
        <div className="relative bg-white py-2 mt-4">
          <div className="text-center">
            <button
              onClick={handleShowMore}
              className="bg-white font-black text-green-500 py-2 px-4 rounded w-3/4 mx-auto"
            >
              Show More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artists;
