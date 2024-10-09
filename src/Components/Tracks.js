import React, { useEffect, useMemo, useState } from "react";
import jsonData from "../spotify_data.json";

const Tracks = () => {
  const hourArr = jsonData.map((e) => e["ts"].split("T")[1].split(":")[0]);

  const [whHour, setWhHour] = useState([]);
  const [tracksNum, setTracksNum] = useState(0);
  const [amount, setAmount] = useState("");
  const [dailyAverage, setDailyAverage] = useState("");
  // const [outSkipe, setOutSkipe] = useState("");
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
  // function withoutSkipe() {
  //   setOutSkipe(
  //     (
  //       allTracks()
  //         .filter((ele) => ele["skipped"])
  //         .map((e) => e["ms_played"])
  //         .reduce((a, b) => a + b) /
  //       1000 /
  //       60 /
  //       60
  //     ).toFixed(1)
  //   );
  // }
  function whichHour() {
    const ranges = [
      ...new Set(
        allTracks()
          .map((e) => e["ts"].split("T")[1].split(":")[0])
          .sort()
      ),
    ];
    const allHours = {};
    ranges.forEach((item) => {
      const num = hourArr.filter((element) => element === item).length;
      allHours[item] = num;
    });
    return setWhHour(
      Object.entries(allHours).filter(
        (ele) =>
          ele[1] === Object.values(allHours).reduce((a, b) => (a > b ? a : b))
      )[0][0]
    );
  }
  function dailyAv() {
    let amountMs = 0;
    const oddDays = new Set();
    let dd = data[0];
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
    tracks();
    amountTime();
    // withoutSkipe();
    whichHour();
    dailyAv();
    whatSession();
    return () => {};
  }, []);
  return (
    <div class="flex flex-col items-center gap-4 mb-6 mt-6">
      <div class="flex gap-4 p-4 flex-wrap w-full justify-center">
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 class="text-gray-500 font-medium text-sm">Total Plays</h2>
          <p class="text-2xl font-bold">{data.length}</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 class="text-gray-500 font-medium text-sm">
            Total Different Traks:
          </h2>
          <p class="text-2xl font-bold">{tracksNum}</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 class="text-gray-500 font-medium text-sm">
            Total Time spent listening:
          </h2>
          <p class="text-2xl font-bold">
            {(amount / 1000 / 60 / 60).toFixed(1)}
          </p>
          <span class="text-gray-400 text-sm ">Hours</span>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 class="text-gray-500 font-medium text-sm">Daily Average:</h2>
          <p class="text-2xl font-bold">{dailyAverage}</p>
          <span class="text-gray-400 text-sm ">Hours</span>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 class="text-gray-500 font-medium text-sm">Which Hour:</h2>
          {/* <p class="text-2xl font-bold">{data.length}</p> */}
          {whHour > 12 ? (
            <>
              <p class="text-2xl font-bold">{whHour - 12}</p>
              <span class="text-gray-400 text-sm ">PM </span>
            </>
          ) : (
            <>
              <p class="text-2xl font-bold">{whHour}</p>
              <span class="text-gray-400 text-sm ">AM </span>
            </>
          )}
          {/* <span class="text-gray-400 text-sm ">Hours</span> */}
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 md:w-1/4 justify-center gap-2">
          <h2 class="text-gray-500 font-medium text-sm">What session</h2>
          <p class="text-2xl font-bold">{session}</p>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
