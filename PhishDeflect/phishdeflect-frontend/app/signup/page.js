"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import BackgroundImg from "/public/images/1.jpg";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Validation from "./signupValidation";


const Signup = () => {
  const router = useRouter();
  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [serverError, setServerError] = useState();

  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  };

  const { login , auth } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const error = Validation(formData);
    setError(error);
    console.log("formdata", formData);
    console.log("error", error);  

    if (Object.keys(error).length > 0) {
      console.log("error length", Object.keys(error).length);
      return;
    }
    const res = await axios.post("http://localhost:3001/users/create", formData);
    if (res.data.success) {
      console.log(res);
      login(res.data.user, true);
      router.push("/dashboard");
    } else {
      console.log("🚀 ~ handleSubmit ~ res:", res);
      setError(res.data)
      // console.log("s");
      setServerError(res.data.Error);
      console.log(res.data.Error);
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
            <h1 className="text-5xl font-black">Sign Up</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3" >
            <div className="expand-field flex space-between">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Username</span>
                  <span className="label-text-alt font-bold text-red-600 italic">
                  {error.username ? error.username : ''}
                     </span>
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleInput}
                  className="w-full px-4 py-2 border rounded-lg input-primary"
                  required
                />
              </label>
              <span className="text-xs text-red-500 italic mr-2 z-2">
                   
                  </span>
            </div>

            <div className="expand-field">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Email</span>
                  <span className="label-text-alt font-bold text-red-600 italic">
                  {error.email ? error.email : ''}
                  </span>

                </div>
                <input
                  type="email"
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
                  {error.password ? error.password : ''}
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

            <div className="expand-field">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">
                    Confirm password
                  </span>
                  <span className="label-text-alt font-bold text-red-600 italic">
                  {error.confirmPassword ? error.confirmPassword : ''}
                     </span>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
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
                Signup
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already a Member?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
