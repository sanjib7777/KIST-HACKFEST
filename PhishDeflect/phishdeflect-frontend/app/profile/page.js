"use client";
import React from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Image from "next/image";
import defaultImage from "/public/images/default_image.webp";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Profile = () => {
  const userId = localStorage.getItem("phishdeflect@userId");
  const [userdetails, setUserDetails] = useState({
    username: "",
    email: "",
    message: "",
    url: "",
    points: 0,
  });

  useEffect(() => {
    console.log(userId);
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/getuser/" + userId
        );
        console.log(response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Header />
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
        className="flex justify-center flex-1 p-6 w-[70vw] max-w-4xl"
      >
        <div className="w-full space-y-10 bg-base-300 px-12 py-10 rounded-2xl card-move-y hover:-translate-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-bold">Profile Page</h1>
            <div className="avatar">
              <div className="w-24 rounded-full">
                <Image src={defaultImage} />
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold">Name:</h2>
              <p>{userdetails.username}</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Email</h2>
              <p>{userdetails.email}</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Experience Points:</h2>
              <p>{userdetails.points}</p>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Profile;
