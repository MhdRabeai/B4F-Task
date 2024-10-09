import React from "react";

const Table = (props) => {
  return (
    <table
      key={props.i}
      className="min-w-full leading-normal rounded-lg overflow-hidden"
    >
      <thead>
        <tr className="bg-green-600 ">
          <th className="px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
            Number
          </th>
          <th className="px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
            {props.key} Name
          </th>
          <th className="px-5 py-3  text-left text-xs font-semibold text-white uppercase tracking-wider">
            Count Palys:
          </th>
        </tr>
      </thead>
      <tbody>
        {props.arr.flat().map((ele, i) => (
          <tr key={i}>
            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
              {i + 1}
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
  );
};

export default Table;
