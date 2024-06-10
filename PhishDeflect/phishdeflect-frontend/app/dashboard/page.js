"use client";
import React from "react";
import Sidebar from "@/components/shared/sidebar";
import Link from "next/link";
import Header from "@/components/shared/header";
import SearchBar from "@/components/ui/searchbar";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const userId = localStorage.getItem("phishdeflect@userId");
  const [userdetails, setUserDetails] = useState({
    username: "",
    email: "",
    message: "",
    urls: "",
    points: 0,
  });

  const [predictUrls, setPredictUrls] = useState([]);
  const [reportUrls, setReportUrls] = useState([]);
  const [urlresult, setUrlResult] = useState("");

  const changeResult = (result, url) => {
    setUrlResult(result);
    setPredictUrls(prev => [{ url, result, type: 'predict' }, ...prev]);
    console.log("result", result);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/getuser/" + userId
        );
        console.log(response.data);
        setUserDetails(response.data);
        const predictURLs = response.data.urls.filter(url => url.type === "predict");
        setPredictUrls(predictURLs);
        const reportURLs = response.data.urls.filter(url => url.type === "report");
        setReportUrls(reportURLs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  console.log("here are predict URLs", predictUrls);
  console.log("here are report URLs", reportUrls);

  const renderUrlResult = () => {
    switch (urlresult) {
      case "phishing":
        return (
          <div className="card dashboard-card-scale shadow-md rounded-lg p-4 min-h-32 bg-error col-span-1 md:col-span-2">
            <div className="text-error-content">
              <h2 className="text-2xl font-bold">{urlresult} </h2>
              <p className="font-thin">
                This site is not secure.
              </p>
            </div>
          </div>
        );
      case "not-phishing":
        return (
          <div className="card dashboard-card-scale shadow-md rounded-lg p-4 min-h-32 bg-success col-span-1 md:col-span-2">
            <div className="text-success-content">
              <h2 className="text-2xl font-bold">{urlresult} </h2>
              <p className="font-thin">This site is secure.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="card dashboard-card-scale shadow-md rounded-lg p-4 min-h-32 bg-base-200 col-span-1 md:col-span-2">
            <div className="">
              <h2 className="text-2xl font-bold">Check for Phishing</h2>
              <p className="font-thin">Enter an URL in the search field above.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header user={userdetails} />
      <div className="flex flex-1">
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
          <h1 className="text-4xl font-bold pb-4">Dashboard</h1>
          <SearchBar changeResult={changeResult} />
          <div className="flex flex-col gap-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {renderUrlResult()}
              <div className="flex justify-center items-center flex-row card dashboard-card-scale shadow-md rounded-lg p-4 bg-base-200">
                <div className="basis-3/4">
                  <h2 className="text-md font-semibold ">Welcome</h2>
                  <h1 className="text-3xl">{userdetails.username}</h1>
                </div>
                <div className="basis-1/4">
                  <h2 className="text-md font-semibold">Exp Points:</h2>
                  <p>{userdetails.points}</p>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-xl">History</h1>
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
                    {predictUrls.map((url, index) => (
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
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;
