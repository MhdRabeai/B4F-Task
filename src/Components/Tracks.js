/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import jsonData from "../spotify_data.json";
import Loading from "./Loading";

const Tracks = () => {
  // const hourArr = jsonData.map((e) => e["ts"].split("T")[1].split(":")[0]);
  const [isLoading, setIsLoadind] = useState(true);
  const [whHour, setWhHour] = useState([]);
  const [tracksNum, setTracksNum] = useState(0);
  const [amount, setAmount] = useState("");
  const [dailyAverage, setDailyAverage] = useState("");
  const [session, setSession] = useState("");
  const data = useMemo(() => {
    return jsonData.filter((e) => e["ms_played"]);
  }, [jsonData]);
  function allTracks() {
    return data;
  }
  function tracks() {
    setTracksNum(
      [...new Set(allTracks().map((e) => e.master_metadata_track_name))].length
    );
  }
  function amountTime() {
    setAmount(
      allTracks()
        .map((ele) => ele["ms_played"])
        .reduce((a, b) => a + b)
    );
  }

  function whichHour() {
    // const ranges = [
    //   ...new Set(
    //     allTracks()
    //       .map((e) => e["ts"].split("T")[1].split(":")[0])
    //       .sort()
    //   ),
    // ];
    const ranges = [
      ...new Set(
        allTracks()
          .map((e) => new Date(e["ts"]).getHours())
          .sort((a, b) => a - b)
      ),
    ];

    const allHours = {};

    const hourArr = allTracks()
      .map((e) => new Date(e["ts"]).getHours())
      .sort((a, b) => a - b);

    ranges.forEach((item) => {
      // console.log(item);
      const num = hourArr.filter((element) => element === item);
      allHours[item] = num;
    });

    return setWhHour(
      +Object.entries(allHours).filter(
        (ele) =>
          ele[1] === Object.values(allHours).reduce((a, b) => (a > b ? a : b))
      )[0][0] + 1
    );
  }
  function dailyAv() {
    let amountMs = 0;
    const oddDays = new Set();
    data.forEach((item) => {
      if (item["skipped"] === null) {
        amountMs += item["ms_played"];
        const day = new Date(item.ts).toDateString();
        oddDays.add(day);
      }
    });
    const daysCount = oddDays.size;
    const avePerDay = amountMs / daysCount;
    const averageHours = (avePerDay / (1000 * 60 * 60)).toFixed(2);
    setDailyAverage(averageHours);
  }
  function whatSession() {
    const ranges = [
      ...new Set(
        allTracks()
          .map((ele) => ele["ts"].split("T")[0].split("-")[1])
          .sort()
      ),
    ];

    const allMonth = {};
    ranges.forEach((item) => {
      const num = allTracks()
        .map((ele) => ele["ts"].split("T")[0].split("-")[1])
        .sort()
        .filter((element) => element === item).length;
      allMonth[item] = num;
    });
    let month = Object.entries(allMonth)
      .filter(
        (ele) =>
          ele[1] === Object.values(allMonth).reduce((a, b) => (a > b ? a : b))
      )
      .flat()[0];
    if (month === "04" || month === "05" || month === "06") {
      setSession("Spring");
    } else if (month === "07" || month === "08" || month === "07") {
      setSession("Summer");
    } else if (month === "10" || month === "11" || month === "12") {
      setSession("Autumn");
    } else {
      setSession("winter");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoadind(false);
    }, 1000);
    tracks();
    amountTime();
    // withoutSkipe();
    whichHour();
    dailyAv();
    whatSession();
    return () => {};
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col items-center gap-4 pb-6 pt-6  ">
      <h2 className="text-xl font-bold mb-5 dark:text-white">Tracks</h2>
      <div className="flex gap-4 p-4 flex-wrap w-full justify-center">
        <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 className="text-gray-500 font-medium text-sm dark:text-[#fff]">
            Total Plays
          </h2>
          <p className="text-2xl font-bold text-green-600">{data.length}</p>
        </div>
        <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 className="text-gray-500 font-medium text-sm  dark:text-[#fff]">
            Total Different Traks:
          </h2>
          <p className="text-2xl font-bold text-green-600">{tracksNum}</p>
        </div>
        <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 className="text-gray-500 font-medium text-sm  dark:text-[#fff]">
            Total listening Time:
          </h2>
          <p className="text-2xl font-bold text-green-600">
            {(amount / 1000 / 60 / 60).toFixed(1)}
          </p>
          <span className="text-gray-400 text-sm dark:text-[#ddd]">Hours</span>
        </div>
        <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 className="text-gray-500 font-medium text-sm dark:text-[#fff]">
            Daily Average:
          </h2>
          <p className="text-2xl font-bold text-green-600">{dailyAverage}</p>
          <span className="text-gray-400 text-sm dark:text-[#ddd]">Hours</span>
        </div>
        <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 className="text-gray-500 font-medium text-sm dark:text-[#fff]">
            Which Hour:
          </h2>

          {whHour > 12 ? (
            <>
              <p className="text-2xl font-bold text-green-600">{whHour - 12}</p>
              <span className="text-gray-400 text-sm dark:text-[#ddd]">
                PM{" "}
              </span>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-green-600">{whHour}</p>
              <span className="text-gray-400 text-sm dark:text-[#ddd]">
                AM{" "}
              </span>
            </>
          )}
        </div>
        <div className="dark:bg-[#333] transition hover:scale-105 text-center bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 className="text-gray-500 font-medium text-sm dark:text-[#fff]">
            What session
          </h2>
          <p className="text-2xl font-bold text-green-600">{session}</p>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
