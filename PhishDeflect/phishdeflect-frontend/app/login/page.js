"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import BackgroundImg from "/public/images/1.jpg";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState('');

  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const { login, auth } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await axios.post("http://localhost:3001/users/login", formData);
    if (res.data.success) {
      console.log(res);
      login(res.data.user, true);
      router.push("/dashboard");
    } else {
      console.log("🚀 ~ handleSubmit ~ res:", res);
      // console.log("s");
      setServerError(res.data.error);
      console.log(res.data.error);
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen h-[100vh] text-neutral-content">
        <Image
          alt="Background"
          src={BackgroundImg}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-100"
        />
        <div
          className="glass p-8 rounded-2xl shadow-lg max-w-sm w-full z-10
        card-move-y"
        >
          <div className="text-center mb-6">
            <h1 className="text-5xl font-black">Log In</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="expand-field">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Email</span>
                  <span className="label-text-alt font-bold text-red-600 italic">
                  { serverError}
                     </span>
                </div>
                <input
                  type="text"
                  name="email"
                  onChange={handleInput}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg input-primary"
                  required
                />
              </label>
            </div>

            <div className="expand-field">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Password</span>
                  <span className="label-text-alt font-bold text-red-600 italic">
                  { serverError}
                     </span>
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={handleInput}
                  placeholder="Password"
                  className="w-full px-4 py-2 border  rounded-lg input-primary"
                  required
                />
              </label>
            </div>

            <div className="py-2">
              <button
                type="submit"
                className="w-full py-2 btn btn-primary expand-field"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Not a Member?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
