/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import data from "../spotify_data.json";

export default function Home() {
  const [artistCount, setArtistCount] = useState([]);
  const [trackCount, setTrackCount] = useState([]);
  const [albumCount, setAlbumCount] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  function Search(...args) {
    let arr;
    if(isAll){
      
    }else{

    }
  }
  function first(p1, isAlll = false) {
    let arr1;
    if (isAlll) {
      arr1 = data.filter((e) => e[p1] && e["ms_played"]);
    } else {
      const lastYear = new Date().getFullYear() - 1;
      arr1 = data.filter(
        (e) =>
          e[p1] &&
          e["ms_played"] &&
          e["ts"].split("-")[0] === lastYear.toString()
      );
    }
    console.log(data.filter((e) => e[p1] && e["ms_played"]));
    const ranges = [...new Set(arr1.map((ele) => ele[p1]))];
    const countObj = [];
    ranges.map((item) => {
      const count = arr1.filter((ele) => ele[p1] === item).length;
      countObj.push({ name: item, times: count });
    });
    const final = countObj.sort((a, b) => b.times - a.times).slice(0, 100);
    artistCount.push(...final);
    setArtistCount([...final]);
  }
  function secondFn(p1, p2, p3, isAll = false) {
    let arr1;
    if (isAll) {
      arr1 = data.filter((e) => e[p1] && e["ms_played"]);
    } else {
      const lastYear = new Date().getFullYear() - 1;
      arr1 = data.filter(
        (e) =>
          e[p1] &&
          e["ms_played"] &&
          e["ts"].split("-")[0] === lastYear.toString()
      );
    }
    const ranges = [...new Set(arr1.map((ele) => ele[p1]))];

    const countObj = [];
    ranges.map((item) => {
      const count = arr1.filter((ele) => ele[p1] === item).length;
      const tatalMs = arr1
        .filter((ele) => ele[p1] === item)
        .map((e) => e["ms_played"])
        .reduce((a, b) => a + b, 0);
      return countObj.push({ name: item, times: tatalMs * count });
    });

    const final = countObj.sort((a, b) => b.times - a.times).slice(0, 100);
    p2.push(...final);
  }
  function allTime() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    first("master_metadata_album_album_name");
    secondFn("master_metadata_album_album_name", albumCount, setAlbumCount);
    secondFn("master_metadata_track_name", trackCount, setTrackCount);
    console.log("All");
  }
  function lastTime() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    first("master_metadata_album_album_name", true);
    secondFn(
      "master_metadata_album_album_name",
      albumCount,
      setAlbumCount,
      true
    );
    secondFn("master_metadata_track_name", trackCount, setTrackCount, true);
    console.log("lastTime");
  }
  useEffect(() => {
    // isAll ? allTime() : lastTime();
    console.log(
      Search(
        "master_metadata_album_artist_name",
        "master_metadata_track_name",
        "master_metadata_album_album_name"
      )
    );
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAll]);
  return (
    <div className="container mt-6 mx-auto px-4 md:px-12">
      {isAll ? "true" : "false"}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="pb-10 pt-2 flex justify-end">
            <div className="dropdown inline-block relative">
              <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                <span className="mr-1">Show By</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                <li className="w-full">
                  <button
                    className="w-full rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block "
                    onClick={() => setIsAll((prev) => (prev = true))}
                  >
                    All Time
                  </button>
                </li>
                <li className="w-full">
                  <button
                    className="w-full bg-gray-200 hover:bg-gray-400 py-2 px-4 block "
                    onClick={() => setIsAll((prev) => (prev = false))}
                  >
                    Last year
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap sm:pb-28 md:pb-20 mx-1 lg:-mx-4">
            {artistCount.map((ele, i) => (
              <p key={i}>{i}</p>
            ))}
            ********************
            {trackCount.map((ele, i) => (
              <p key={i}>{i}</p>
            ))}
            ********************
            {albumCount.map((ele, i) => (
              <p key={i}>{i}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
