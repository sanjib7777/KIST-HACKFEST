"use client";
import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Link from "next/link";
// import { useState } from "react";

const Hero = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{
        duration: 1,
        delay: 0.25,
        type: "spring",
        stiffness: 260,
        damping: 15,
      }}
    >
      {/* Hero Component */}
      <div className="relative flex justify-center items-center isolate px-6 h-[95vh] min-h-96 lg:px-8">
        <div className="mx-auto max-w-sm md:max-w-3xl py-20">
          <div className="text-center">
            <h1 className="font-black text-7xl tracking-tighter">
              The Ultimate Protection against{" "}
              <span className="text-accent">Phishing.</span>
            </h1>
            <p className="text-md py-5 leading-8 text-neutral-400">
              " Feel Safe With Our Top Notch PhishDelfect Extension "
            </p>
            <a
              href="/download/PhishDeflect-ChromeExtension.zip"
              download
              className="btn btn-lg font-black hover:card-move-y hover:-translate-y-2 btn-accent text-accent-content"
            >
              Download the Extension
            </a>
          </div>
        </div>
      </div>

      {/* Image Component */}
      {/* <div className="px-20  py-12">
        <div className="relative min-w-10 overflow-hidden w-full min-h-screen">
          <Image
            className="rounded-3xl overflow-hidden"
            src="https://img.freepik.com/free-vector/beige-leafy-watercolor-background-vector_53876-136491.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717632000&semt=ais_user"
            alt="Description of the image"
            layout="fill"
            objectFit="cover" // Options: "contain", "cover", "fill", "none", "scale-down"
          />
        </div>
      </div> */}
    </motion.div>
  );
};

export default Hero;
