import Link from "next/link";
import { useState } from "react";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="hidden md:block bg-primary shadow z-40 ml-20 fixed w-full dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
            <a className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700">
              Admin Dashboard
            </a>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline-gray"
            onClick={toggleNavbar}
          >
            <MdMenu size={24} />
          </button>
        </div>
        <div
          className={`md:flex md:items-center md:ml-auto md:w-auto w-full ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li>
                <a className="block md:inline-block mt-4 md:mt-0 md:mx-4 hover:text-gray-900 dark:hover:text-white">
                  Home
                </a>
            </li>
            <li>
                <a className="block md:inline-block mt-4 md:mt-0 md:mx-4 hover:text-gray-900 dark:hover:text-white">
                  Dashboard
                </a>
            </li>
            <li>
                <a className="block md:inline-block mt-4 md:mt-0 md:mx-4 hover:text-gray-900 dark:hover:text-white">
                  Users
                </a>
            </li>
            <li>
                <a className="block md:inline-block mt-4 md:mt-0  hover:text-gray-900 dark:hover:text-white">
                  Settings
                </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
