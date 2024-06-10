// components/shared/Sidebar.js
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <aside className="sm:w-30 md:w-48 lg:w-64 bg-neutral text-neutral-content p-4">
        <nav>
          <ul className="menu">
            <li className="mb-2 expand-field">
              <Link href="/dashboard" className="py-5">
                Dashboard
              </Link>
            </li>
            <li className="mb-2 expand-field">
              <Link href="/accountsettings" className="py-5">
                Account Setting
              </Link>
            </li>
            <li className="mb-2 expand-field">
              <Link href="/contact" className="py-5">
                Contact Us
              </Link>
            </li>
            <li className="mb-2 expand-field">
              <Link href="/report" className="py-5">
                Report
              </Link>
            </li>
            <li className="mb-2 expand-field">
              <Link
                href="/logout"
                className="hover:bg-error hover:text-neutral text-error py-5"
              >
                Log Out
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
