import React, { useEffect, useState, useMemo } from "react";
import jsonData from "../spotify_data.json";
import Loading from "./Loading";
import Table from "./Table";

export default function Home() {
  const [isLoading, setIsLoadind] = useState(true);
  const [count0, setCount0] = useState([]);
  const [tracksNum, setTracksNum] = useState(0);
  const [amount, setAmount] = useState("");

  const data = useMemo(() => {
    return jsonData.filter((e) => e["episode_name"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonData]);
  function allTracks() {
    return data;
  }
  function tracks() {
    setTracksNum(
      [...new Set(allTracks().map((e) => e["episode_name"]))].length
    );
  }
  function amountTime() {
    setAmount(
      allTracks()
        .map((ele) => ele["ms_played"])
        .reduce((a, b) => a + b)
    );
  }
  function editData() {
    const episode = {};
    data.forEach((item) => {
      const episodeName = item["episode_show_name"];
      episode[episodeName] = (episode[episodeName] || 0) + 1;
    });
    const sortedEpisode = Object.entries(episode)
      .map(([name, times]) => ({ name, times }))
      .sort((a, b) => b.times - a.times)
      .slice(0, 10);
    setCount0({ Episode: sortedEpisode });
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoadind(false);
    }, 1000);
    tracks();
    amountTime();
    editData();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return isLoading ? (
    <Loading />
  ) : (
    <div className=" container mt-6 mx-auto px-4 md:px-12">
      <h2 className="text-xl font-bold mb-5 dark:text-[#fff]">Episodes</h2>
      <div className="flex flex-col items-center gap-4 mb-6 mt-6">
        <div className="flex gap-4 p-4 px-0 flex-wrap w-full justify-center">
          <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
            <h2 className="text-gray-500 font-medium text-sm dark:text-[#ddd]">
              Total Plays
            </h2>
            <p className="text-2xl font-bold text-green-600">{data.length}</p>
          </div>
          <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
            <h2 className="text-gray-500 font-medium text-sm dark:text-[#ddd]">
              Total Different Episodes:
            </h2>
            <p className="text-2xl font-bold text-green-600">{tracksNum}</p>
          </div>
          <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
            <h2 className="text-gray-500 font-medium text-sm dark:text-[#ddd]">
              Total Time spent Watching:
            </h2>
            <p className="text-2xl font-bold text-green-600">
              {(amount / 1000 / 60 / 60).toFixed(1)}
            </p>
            <span className="text-gray-400 text-sm dark:text-[#fff]">
              Hours
            </span>
          </div>
        </div>
        {count0
          ? Object.entries(count0)
              .slice(0, 1)
              .map(([key, arr], i) => (
                <div className="pb-8 w-full" key={i}>
                  <div className="  overflow-x-auto ">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <h2 className="text-xl font-semibold leading-tight dark:text-[#fff]">
                        Top 10 {key}s
                      </h2>
                      <Table i={i} key={key} arr={arr} hours={""} />
                    </div>
                  </div>
                </div>
              ))
          : ""}
      </div>
    </div>
  );
}
