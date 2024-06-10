"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import logo from "/public/images/logo.png";
import Image from "next/image";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

function Footer() {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <aside>
        <div className="flex items-center justify-center">
          <Image src={logo} width={100} height={100} />
        </div>
        <p>
          <span className="font-extrabold text-2xl">PhishDeflect.</span>
          <br />
          Deflecting Phish-es.
        </p>
      </aside>
      <nav>
        <h1 className="footer-title">Social</h1>
        <div className="grid grid-flow-col gap-4">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            legacyBehavior
          >
            <a>
              <FaTwitter className="h-6 w-6 hover:text-blue-500" />
            </a>
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            legacyBehavior
          >
            <a>
              <FaYoutube className="h-6 w-6 hover:text-red-500" />
            </a>
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            legacyBehavior
          >
            <a>
              <FaFacebook className="h-6 w-6 hover:text-blue-700" />
            </a>
          </Link>
        </div>
        <h1 className="footer-title mt-5">Links</h1>
        <div className="grid grid-flow-col gap-4">
          <Link
            href="/"
            className="link link-hover hover:no-underline hover:text-accent"
          >
            Home
          </Link>
          <Link
            href={currentPath === "/" ? "#features" : "/#features"}
            className="link link-hover hover:no-underline hover:text-accent"
          >
            Features
          </Link>
          <Link
            href={currentPath === "/" ? "#about" : "/#about"}
            className="link link-hover hover:no-underline hover:text-accent"
          >
            About
          </Link>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
