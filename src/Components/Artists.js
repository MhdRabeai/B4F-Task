import React, { useEffect, useState } from "react";
import Loading from "./Loading";
// const [isLoading, setIsLoadind] = useState(true);
// setTimeout(() => {
//     setIsLoadind(false);
//   }, 2000);
const Artists = () => {
  const [isLoading, setIsLoadind] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadind(false);
    }, 2000);
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="container mt-6 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap sm:pb-28 md:pb-20 mx-1 lg:-mx-4">
        Artists
      </div>
    </div>
  );
};

export default Artists;
