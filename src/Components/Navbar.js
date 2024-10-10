import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

// import { IoSunny } from "react-icons/io5";
export default function Navbar() {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="flex justify-between py-2 px-6 bg-gray-50  dark:bg-[#333333]">
      <div className="   flex flex-col md:flex-row items-start md:items-center justify-between ">
        <div>
          <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
            User Profile
          </h4>
          <ul
            aria-label="current Status"
            className="flex flex-col md:flex-row items-start md:items-center text-gray-600 dark:text-gray-400 text-sm "
          >
            <li className="flex items-center mr-4">
              <div className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-paperclip"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9 l6.5 -6.5" />
                </svg>
              </div>
              <span>Active</span>
            </li>

            <li className="flex items-center ">
              <div className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-plane-departure"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path
                    d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z"
                    transform="rotate(-15 12 12) translate(0 -1)"
                  />
                  <line x1="3" y1="21" x2="21" y2="21" />
                </svg>
              </div>
              <span>Started on 29 Jan 2020</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative  flex-shrink-0 self-center flex items-center gap-3">
        <button
          onClick={() => darkModeHandler()}
          className="dark:text-white
          "
        >
          {dark && <IoSunny />}
          {!dark && <IoMoon />}
        </button>
        <div className="rounded-full ">
          <img
            className="inline w-8 h-8 rounded-full "
            src="https://picsum.photos/150"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}
