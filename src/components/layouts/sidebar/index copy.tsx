import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { MdNewspaper } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { MdMenuOpen } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };


  return (
    <>
      <div className=" md:hidden bg-white shadow fixed w-full dark:bg-gray-800 ">
        <div className="flex mx-auto md:flex md:justify-between md:items-center mb-2">
          <a className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 mt-4 ml-4">
            Admin Dashboard
          </a>
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex ml-auto mr-4 items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <MdMenuOpen size={25} />
          </button>
        </div>
      </div>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary dark:bg-gray-800">
          <div className="flex">
            <Link href="/" className="flex items-center pl-2.5 mb-5">
              <Image
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-6 mr-3 sm:h-7"
                alt="Flowbite Logo"
                width={28}
                height={28}
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Kedai Programmer
              </span>
            </Link>
          </div>
          <div className="border y-4"></div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <AiFillDashboard
                  size={25}
                  className="text-white"
                ></AiFillDashboard>
                <span className="ml-3 text-white">Dashboard</span>
              </Link>
            </li>
            <div className="border border-dashed y-4"></div>
            <li>
        <div
          onClick={toggleSubMenu}
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          <AiFillDatabase size={25} className="text-white"></AiFillDatabase>
          <span className="ml-3 text-white">Master Data</span>
          <button className="ml-auto focus:outline-none">
            <svg
              className={`${
                isSubMenuOpen ? 'rotate-90' : ''
              } w-6 h-6 transition-transform`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
        <ul
          className={`${
            isSubMenuOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <li>
            {/* <Link href="/" > */}
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                Menu 1
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/"> */}
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                Menu 2
              </a>
            {/* </Link> */}
          </li>
        </ul>
      </li>
      <li>
        <div
          onClick={toggleSubMenu}
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          <AiFillDatabase size={25} className="text-white"></AiFillDatabase>
          <span className="ml-3 text-white">Master Articles</span>
          <button className="ml-auto focus:outline-none">
            <svg
              className={`${
                isSubMenuOpen ? 'rotate-90' : ''
              } w-6 h-6 transition-transform`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
        <ul
          className={`${
            isSubMenuOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <li>
            {/* <Link href="/" > */}
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                Menu 1
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/"> */}
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                Menu 2
              </a>
            {/* </Link> */}
          </li>
        </ul>
      </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
