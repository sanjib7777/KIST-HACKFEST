import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const SearchBar = ({ changeResult }) => {
  const userId = localStorage.getItem("phishdeflect@userId");

  const [urldetails, setUrlDetails] = useState({
    url: "",
    user: userId,
    type: "predict",
    result: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUrlDetails({
      ...urldetails,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();  // Prevent default form submission behavior
    const res = await axios.post("http://localhost:3001/urls/predict-url/", urldetails);
    if (res.data.success) {
      console.log("🚀 ~ handleSubmit ~ res.data.result", res.data.result);
      changeResult(res.data.result, urldetails.url);  // Pass the URL to changeResult
    } else {
      console.log("🚀 ~ handleSubmit ~ res:", res);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center shadow-md rounded-lg p-2">
          <input
            type="text"
            name="url"
            onChange={handleInput}
            placeholder="Search..."
            className="input input-bordered w-full"
          />
          <button 
            type="submit"
            className="btn btn-primary ml-2"
          >
            Search
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;
