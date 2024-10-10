import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
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
    // props.handleUpdate();
    setState(true);
    if (state) {
      setArr(
        arr.sort(function (a, b) {
          if (a[by] < b[by]) return -1;
          if (a[by] > b[by]) return 1;
          return 0;
        })
      );
      setState(false);
    } else {
      // props.handleUpdate();
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
    console.log("table");
    setArr(props.arr.flat().map((ele, i) => ({ id: i, ...ele })));
    isData();
  }, [filter, state, props.arr]);
  return (
    <>
      <div className="p-2">
        <input
          type="text"
          className="relative outline-none rounded py-1 px-2 w-full shadow text-sm text-gray-700 placeholder-gray-400 bg-gray-100 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-green-600"
          name="search"
          placeholder="Search by Name.."
          onChange={handleInput}
        />
      </div>
      <table
        key={props.i}
        className="min-w-full leading-normal rounded-lg overflow-hidden"
      >
        <thead>
          <tr className="bg-green-600 ">
            <th className="text-left" onClick={() => handleClick("id")}>
              <button className="flex items-center gap-2 px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
                Number
                <FaAngleDown />
              </button>
            </th>
            <th className="text-left" onClick={() => handleClick("name")}>
              <button className="flex items-center gap-2 px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
                {`${props.name} Name`}
                <FaAngleDown />
              </button>
            </th>
            <th className="text-left" onClick={() => handleClick("times")}>
              <button className="flex items-center gap-2 px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
                Count Palys
                <FaAngleDown />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0
            ? arr.map((ele, i) => (
                <tr key={i}>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#333] dark:text-[#fff]">
                    {ele.id + 1}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#333] dark:text-[#fff]">
                    {ele.name}
                  </td>
                  {!props.hours ? (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#333] dark:text-[#fff]">
                      {ele.times} Times
                    </td>
                  ) : (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#333] dark:text-[#fff]">
                      {(ele.times / 1000 / 60 / 60).toFixed(1)} Hours
                    </td>
                  )}
                </tr>
              ))
            : data.map((ele, i) => (
                <tr key={i}>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#333] dark:text-[#fff]">
                    {ele.id + 1}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#333] dark:text-[#fff]">
                    {ele.name}
                  </td>
                  {!props.hours ? (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#333] dark:text-[#fff]">
                      {ele.times} Times
                    </td>
                  ) : (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#333] dark:text-[#fff]">
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
