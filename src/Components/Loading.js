import React from "react";

const Loading = () => {
  return (
    <div
      className="flex absolute top-1/2 "
      style={{ left: "60%", transform: "translate(-50%,-50%)" }}
    >
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full absolute
                        border-4 border-dashed border-gray-200 dark:border-[#777]"
        ></div>

        <div
          className="w-12 h-12 rounded-full animate-spin absolute
                        border-4 border-dashed border-green-500 border-t-transparent dark:bg-[#777]"
        ></div>
      </div>
    </div>
  );
};

export default Loading;
