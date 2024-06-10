"use client";
import React from "react";
import Sidebar from "@/components/shared/sidebar";
import Link from "next/link";
import Header from "@/components/shared/header";
// import Footer from "@/components/shared/footer";
import SearchBar from "@/components/ui/searchbar";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div class="flex flex-1 overflow-hidden">
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
          <div className="w-full space-y-10 bg-base-300 px-12 py-10 max-w-2xl rounded-2xl">
            <div className="flex justify-between items-center">
              <h1 className="text-5xl font-bold">Contact Us</h1>
            </div>
            <form className="space-y-4">
              <div className="expand-field">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-info input-bordered w-full"
                  />
                </label>
              </div>
              <div className="expand-field">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Phone number</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Phone number"
                    className="input input-info input-bordered w-full"
                  />
                </label>
              </div>
              <div className="expand-field">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Address</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-info input-bordered w-full"
                  />
                </label>
              </div>
              <div className="expand-field">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Feedback/Issue</span>
                  </div>
                  <textarea
                    className="textarea textarea-info textarea-bordered h-24"
                    placeholder="Feedback/Issue"
                  ></textarea>
                </label>
              </div>
              <div className="py-4">
                <button
                  type="submit"
                  className="w-full py-2 btn btn-info expand-field"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Contact;
