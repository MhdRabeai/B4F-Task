import React, { useEffect, useState } from "react";

const Table = (props) => {
  let [state, setState] = useState(true);
  let [arr, setArr] = useState([]);
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  function handleInput(e) {
    let text = e.target.value.toLowerCase();
    setFilter(
      arr.filter((e) =>
        e["name"]
          .split("")
          .map((ele) => ele.toLowerCase())
          .join("")
          .includes(text)
      )
    );
  }
  function isData() {
    filter.length > 0
      ? setData(filter) && setFilter("")
      : setData(arr) && setFilter("");
  }
  function handleClick(by) {
    setState(true);
    if (state) {
      setArr(
        arr.sort(function (a, b) {
          if (a[by] < b[by]) return -1;
          if (a[by] > b[by]) return 1;
          return 0;
        })
      );
      console.log(arr);
      setState(false);
    } else {
      setArr(
        arr.sort(function (a, b) {
          if (a[by] > b[by]) return -1;
          if (a[by] < b[by]) return 1;
          return 0;
        })
      );
      setState(true);
    }
  }
  useEffect(() => {
    setArr(props.arr.flat().map((ele, i) => ({ id: i, ...ele })));
    isData();
  }, [filter, state]);
  return (
    <>
      <div className="inpt flex gap-2 items-center ">
        <input
          type="text"
          name="search"
          placeholder="Search .."
          onChange={handleInput}
          className=" mb-4 h-10 w-50 rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <table
        key={props.i}
        className="min-w-full leading-normal rounded-lg overflow-hidden"
      >
        <thead>
          <tr className="bg-green-600 ">
            <th className="text-left" onClick={() => handleClick("id")}>
              <button className="px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
                Number
              </button>
            </th>
            <th className="text-left" onClick={() => handleClick("name")}>
              <button className="px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
                {props.key} Name
              </button>
            </th>
            <th className="text-left" onClick={() => handleClick("times")}>
              <button className="px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
                Count Palys:
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0
            ? arr.map((ele, i) => (
                <tr key={i}>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    {ele.id + 1}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    {ele.name}
                  </td>
                  {!props.hours ? (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      {ele.times} Times
                    </td>
                  ) : (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      {(ele.times / 1000 / 60 / 60).toFixed(1)} Hours
                    </td>
                  )}
                </tr>
              ))
            : data.map((ele, i) => (
                <tr key={i}>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    {ele.id + 1}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    {ele.name}
                  </td>
                  {!props.hours ? (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      {ele.times} Times
                    </td>
                  ) : (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      {(ele.times / 1000 / 60 / 60).toFixed(1)} Hours
                    </td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
{
}
