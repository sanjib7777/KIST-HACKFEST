"use client";
import React from "react";
import Sidebar from "@/components/shared/sidebar";
import Link from "next/link";
import Header from "@/components/shared/header";
// import Footer from "@/components/shared/footer";
import SearchBar from "@/components/ui/searchbar";
import { motion } from "framer-motion";

const account = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.25,
            type: "spring",
            stiffness: 260,
            damping: 12,
          }}
          className="flex justify-center flex-1 p-6 w-[70vw]"
        >
          <div className="w-full space-y-8 bg-base-300 px-12 py-10 max-w-2xl rounded-2xl">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-5xl font-bold">Account Settings</h1>
              <p className="font-extrabold">Hello John Doe.</p>
            </div>
            <form className="space-y-8">
              <div className="expand-field">
                <label className="input input-bordered input-info flex items-center font-black gap-2">
                  Current Password:
                  <input
                    type="password"
                    className="grow font-thin"
                    placeholder=""
                  />
                </label>
              </div>
              <div className="expand-field">
                <label className="input input-bordered input-info flex items-center font-black gap-2">
                  New Password:
                  <input
                    type="password"
                    className="grow font-thin"
                    placeholder=""
                  />
                </label>
              </div>
              <div className="expand-field">
                <label className="input input-bordered input-info flex items-center font-black gap-2">
                  Confirm Password:
                  <input
                    type="password"
                    className="grow font-thin"
                    placeholder=""
                  />
                </label>
              </div>
              <div className="expand-field">
                <label className="input input-bordered input-info flex items-center font-black gap-2">
                  Change Email:
                  <input
                    type="email"
                    className="grow font-thin"
                    placeholder=""
                  />
                </label>
              </div>
              <div className="py-4">
                <button
                  type="submit"
                  className="w-full py-2 btn btn-info expand-field"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default account;
