"use client"; // This directive should be at the very top

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Fadetext = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      id="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{
        duration: 1,
        delay: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 15,
      }}
      className="mx-auto flex md:flex-row md:justify-between md:items-center flex-col items-center gap-8 bg-neutral text-neutral-content px-20 my-10 py-20"
    >
      <h1 className="font-black md:basis-8/12 tracking-tighter text-7xl md:text-6xl lg:text-7xl text-center">
        About <span class="text-accent">Us.</span>
      </h1>
      <p className="py-6 basis-4/12">
        Welcome to PhishDeflect! Our mission is to provide top-notch
        cybersecurity solutions that safeguard individuals and organizations
        from phishing attacks. Utilizing advanced detection techniques and
        real-time monitoring, PhishDeflect identifies and blocks malicious
        attempts to steal sensitive information. Our dedicated team of experts
        is committed to creating a safer digital environment, ensuring your
        online interactions remain secure and protected. Trust PhishDeflect to
        be your reliable partner in cybersecurity.
      </p>
    </motion.div>
  );
};

export default Fadetext;
