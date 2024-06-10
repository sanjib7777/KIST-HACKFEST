"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "/public/images/default_image.webp";
import logo from "/public/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const Header = ({ user }) => {
  console.log("user", user);
  const pathname = usePathname();

  const router = useRouter();
  const currentPath = router.pathname;

  const isDashboard = pathname === "/dashboard";
  const { auth } = useContext(AuthContext);
  console.log("auth", auth);

  return (
    <div className="navbar py-5 px-5 bg-transparent sticky top-0 w-full z-[10]">
      <div className="navbar-start">
        <Image src={logo} width={100} height={100} />
      </div>
      <div className="navbar-center hover:transition-all duration-300 ease-in-out hover:scale-110">
        <ul className="menu menu-horizontal bg-base-200 rounded-xl shadow-2xl gap-3 px-5">
          <li className="">
            <Link href="/">Home</Link>
          </li>
          <li className="">
          <Link href={currentPath === "/" ? "#features" : "/#features"}>
              Features
            </Link>
          </li>
          <li className="">
            <Link href={currentPath === "/" ? "#about" : "/#about"}>About</Link>
          </li>
          {auth ? (
            <li className="">
              <Link href="/dashboard">Dashboard</Link>
            </li>
          ) : (
            <></>
          )}
          {auth ? (
            <li className="">
              <Link href="/report">Report</Link>
            </li>
          ) : (
            <></>
          )}
          {auth ? (
            <li className="">
              <Link href="/contact">Contact Us</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="navbar-end flex gap-1">
        {auth ? (
          <>
            {/* Notifications Button */}
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>

            {/* Profile */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image src={defaultImage} alt="Profile picutre" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link className="py-5" href="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="py-5" href="/accountsettings">
                    Account Settings
                  </Link>
                </li>
                <li>
                  <Link className="py-5 text-error" href="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href="/signup">
              <button className="btn shadow-2xl">Sign up</button>
            </Link>
            <Link href="/login">
              <button className="btn btn-neutral shadow-2xl">Log in</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
