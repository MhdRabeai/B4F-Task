import React, { useEffect, useState } from "react";
import data from "../spotify_data.json";
import ReactPaginate from "react-paginate";
import Loading from "./Loading";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Art = ({ currentItems }) => {
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
    const hours = Math.floor(duration / (1000 * 60 * 60));

    return {
      hours: hours < 10 ? "" + hours : hours,
      minutes: minutes < 10 ? "0" + minutes : minutes,
      seconds: seconds < 10 ? "0" + seconds : seconds,
    };
  };

  return (
    <div className="container mt-6 mx-auto px-4 md:px-12 overflow-hidden		">
      <h2 className="text-xl font-bold mb-5 dark:text-[#fff]">Artists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {currentItems.map((artist) => {
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
              className="bg-[#fff] dark:bg-[#333]  rounded-lg p-5 text-center shadow-xl"
            >
              <h1 className="text-xl text-center font-bold text-green-500 mb-2">
                {artist.name}
              </h1>
              <div className="flex  border-b border-green-200 justify-center text-lg sm:text-xl mb-6">
                <div className="text-center w-1/2 sm:w-auto mb-2">
                  <p className="text-md text-gray-700 dark:text-[#fff]">
                    Total Plays
                    <br />
                    <span className="text-3xl font-semibold font-mono text-green-600">
                      {totalArtistPlays}
                    </span>
                  </p>
                </div>
                <div className="text-center w-1/2 sm:w-auto mb-4">
                  <p className="text-gray-700 dark:text-[#fff]">
                    Unique Tracks
                    <br />
                    <span className="text-3xl font-semibold font-mono text-green-600">
                      {uniqueTracksCount}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-between border-b border-green-200 text-lg sm:text-xl mb-6 pb-1">
                <div className="text-center w-1/2 sm:w-auto mb-4">
                  <p className="text-gray-700 dark:text-[#fff]">
                    Hours Listened
                    <br />
                    <span className="text-3xl font-semibold font-mono text-green-600">
                      {totalListeningTime}
                    </span>
                  </p>
                </div>
                <div className="text-center w-1/2 sm:w-auto mb-4">
                  <p className="text-gray-700 dark:text-[#fff]">
                    Top Season
                    <br />
                    <span className="text-2xl font-semibold font-mono text-green-600">
                      {mostListenedSeason}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center border-b border-green-200 justify-center mt-6 pb-4">
                <div className="w-24 h-24 mr-4">
                  <CircularProgressbar
                    value={artistPercentage}
                    text={`${artistPercentage}%`}
                    styles={buildStyles({
                      textColor: "#10B981",
                      pathColor: "#10B981",
                      trailColor: "#D1FAE5",
                    })}
                  />
                </div>
                <p className="text-3xl sm:text-xl font-bold text-green-600">
                  Listening Rate
                </p>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-green-400 mt-6">
                Top Songs
              </h2>
              <ol className="list-decimal list-inside text-left text-green-600">
                {topArtistTracks.map((track, index) => (
                  <li key={index} className="text-sm sm:text-base">
                    {track}
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Paginate = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [artists, setArtists] = useState([]);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = artists.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(artists.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % artists.length;
    setItemOffset(newOffset);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Art currentItems={currentItems} />
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={".."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center mb-4 space-x-2"}
        pageClassName={
          "px-3 py-2 border border-gray-300 rounded dark:text-[#fff]"
        }
        previousClassName={
          "px-1 py-2 border border-gray-300 rounded dark:text-[#fff]"
        }
        nextClassName={
          "px-1 py-2 border border-gray-300 rounded dark:text-[#fff]"
        }
        activeClassName={"bg-green-500 text-white"}
      />
    </>
  );
};

export default Paginate;
