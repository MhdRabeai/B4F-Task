import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Card({name,link}) {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 hover:scale-105 transition-transform">
      <article className="overflow-hidden rounded-lg shadow-lg h-full flex flex-col justify-around dark:bg-blue-900">
        <header className="flex items-center justify-center leading-tight p-2 md:p-4">
          <h1 className="text-lg dark:text-white">{name}</h1>
        </header>
        <footer className="flex justify-center leading-none p-4">
          <Link to={link} className="no-underline text-blue-500">
            <FaEye aria-label="View Details" />
          </Link>
        </footer>
      </article>
    </div>
  );
}
