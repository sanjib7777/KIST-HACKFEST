"use client";
import React from "react";
import Sidebar from "@/components/shared/sidebar";
import Link from "next/link";
import Header from "@/components/shared/header";
// import Footer from "@/components/shared/footer";
import SearchBar from "@/components/ui/searchbar";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const report = () => {
  const userId = localStorage.getItem("phishdeflect@userId");

  const [urldetails, setUrlDetails] = useState({
    url: "",
    user: userId,
    type: "report",
    result: "",
  });

  const [reportUrls, SetReportUrls] = useState([]);

  const notify = () => toast.warning("Report Sent!");

  const buttonClick = (e) => {
    console.log("🚀 ~ buttonClick ~ buttonClick");
    notify();
    handleSubmit();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUrlDetails({
      ...urldetails,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    const res = await axios.post(
      "http://localhost:3001/urls/predict-url/",
      urldetails
    );
    if (res.data.success) {
      // console.log(res);
      console.log("🚀 ~ handleSubmit ~ res.data.result", res.data.result);
      changeResult(res.data.result);
    } else {
      console.log("🚀 ~ handleSubmit ~ res:", res);
      // console.log("s");
    }
  }
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/getuser/" + userId
        );
        response.data.urls.filter((url) => {
          if (url.type === "report") {
            SetReportUrls((prev) => [...prev, url]);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
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
          className="flex-1 p-6"
        >
          <h1 className="text-2xl font-bold pb-4">Report</h1>
          <div className="flex items-center shadow-md rounded-lg p-2">
            <input
              type="text"
              name="url"
              onChange={handleInput}
              placeholder="Report URL"
              className="input input-bordered w-full"
            />
            <button className="btn btn-error ml-2" onClick={buttonClick}>
              Report
            </button>
            <ToastContainer position="top-right" />
          </div>
          <div className="">
            <h1 className="text-xl">Reported URL</h1>
            <div className="overflow-x-auto mt-6 py-5 rounded-2xl bg-base-200">
              <table className="table">
                <thead>
                  <tr>
                    <th className="font-black text-lg">SN</th>
                    <th className="font-black text-lg">URL</th>
                    <th className="font-black text-lg">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {reportUrls.map((url, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{url.url}</td>
                      <td>{url.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default report;
