"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { Button } from "@/components/Ui/Button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import DashboardProfileHeader from "../Dashboard/DashboardProfileHeader";

function NavBar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const user = useSelector(selectCurrentUser);

  return (
    <header className="sticky z-10">
      <nav
        className="justify-center items-center p-4 lg:px-8 h-18
            border-t-0 border-l-0 border-r-0 border
            dark:bg-gray-800
            border-b-gray-600
            bg-white"
      >
        <div className="flex lg:flex-1 justify-between items-center">
          <a href="/" className="-m-1.5 p-1.5">
            <Image
              src="/assets/logo.svg"
              className="h-6 w-auto dark:hidden"
              width={120}
              height={20}
              alt="Logo"
            />
            <Image
              src="/assets/logo-white.svg"
              className="h-6 w-auto hidden dark:block"
              width={120}
              height={20}
              alt="Logo"
            />
          </a>

          <button
            onClick={() => {
              setNavbarOpen(!navbarOpen);
            }}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div className="items-center md:flex gap-x-6 md:w-auto hidden">
            <Link
              href="/search?domainSearch=Videographer"
              className="font-inter hover:text-gray-900 font-light	text-[15px] dark:text-white"
            >
              Videographer
            </Link>
            <Link
              href="/search?domainSearch=Producers"
              className="ml-2 font-inter hover:text-gray-900 font-light text-[15px] dark:text-white"
            >
              Producers
            </Link>
            <Link
              href="/search?domainSearch=Musician"
              className="ml-2 font-inter hover:text-gray-900 font-light text-[15px] dark:text-white"
            >
              Musician
            </Link>
          </div>
          <div className="gap-x-4 items-center hidden md:w-auto md:flex">
            {!user ? (
              <>
                <Link
                  href="/register"
                  className="ml-2 font-inter hover:text-gray-900 font-light text-[15px] underline dark:text-white"
                >
                  Create an account
                </Link>
                <Link
                  href="/login"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Login
                </Link>
              </>
            ) : (
              <DashboardProfileHeader {...user} />
            )}
          </div>
        </div>
      </nav>

      {navbarOpen && (
        <div
          className="w-11/12 self-center absolute right-0 left-0 ml-auto mr-auto md:hidden block z-20"
          id="navbar-default"
        >
          <ul className="font-medium flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
            <li>
              <Link
                href="/search?domainSearch=Videographer"
                className="block py-2 px-3 text-black hover:bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500"
              >
                Videographer
              </Link>
            </li>
            <li>
              <Link
                href="/search?domainSearch=Producers"
                className="block py-2 px-3 hover:bg-blue-700 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500"
              >
                Producers
              </Link>
            </li>
            <li>
              <Link
                href="/search?domainSearch=Musician"
                className="block py-2 px-3 text-black hover:bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500"
              >
                Musician
              </Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link
                    href="/register"
                    className="ml-2 font-inter hover:text-gray-900 font-light text-[15px] underline dark:text-white"
                  >
                    Create an account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <DashboardProfileHeader {...user} />
            )}
            <li>
              <Link
                href="/login"
                className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block py-2 px-3 text-black hover:bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black md:dark:text-blue-500"
              >
                Create an account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default NavBar;
