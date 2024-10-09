import React, { useEffect, useState, useMemo } from "react";
import data from "../spotify_data.json";
import Loading from "./Loading";

export default function Home() {
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
      <div className="flex flex-wrap sm:pb-28 md:pb-20 mx-1 lg:-mx-4">Home</div>
    </div>
  );
}
