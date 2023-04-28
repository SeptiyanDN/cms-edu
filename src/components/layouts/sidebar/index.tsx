import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { MdNewspaper, MdManageAccounts, MdMenuOpen } from "react-icons/md";
import { BiArrowFromTop } from "react-icons/bi";
import { useRouter } from "next/router";

const listMenu = [
  { icon: AiFillDashboard, title: "Dashboard", href: "/" },
  {
    icon: MdNewspaper,
    title: "Kedai Edukasi",
    submenu: [
      { icon: MdNewspaper,title: "Articles", href: "/articles" },
      { icon: MdNewspaper,title: "Categories", href: "/categories" },
    ],
  },
  { icon: MdManageAccounts, title: "Account", href: "/account" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<number | null>(
    null
  );
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubMenu = (index: number) =>
    setActiveSubMenuIndex(activeSubMenuIndex === index ? null : index);

  return (
    <>
      <div className="md:hidden bg-white shadow fixed w-full dark:bg-gray-800">
        <div className="flex mx-auto md:flex md:justify-between md:items-center mb-2">
          <a className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 mt-4 ml-4">
            Admin Dashboard
          </a>
          <button
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
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white dark:text-white">
                Kedai Programmer
              </span>
            </Link>
          </div>
          <div className="border y-4 mb-2" />
          <ul className="space-y-2 font-medium">
            {listMenu.map((menu, index) => (
              <li key={index}>
                {menu.submenu ? (
                  <div
                    className={`flex items-center p-2 rounded-lg text-white hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer`}
                    onClick={() => toggleSubMenu(index)} // <-- add this line
                  >
                    <menu.icon size={25} className="mr-4" />
                    <span>{menu.title}</span>
                    <BiArrowFromTop
                      size={20}
                      className={`ml-auto transition-transform ${
                        activeSubMenuIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                ) : (
                  <Link
                    href={menu.href}
                    className={`flex items-center p-2   hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                      router.pathname === menu.href
                        ? "bg-gray-100  dark:bg-gray-700 text-gray-900"
                        : "text-white"
                    }`}
                  >
                    <menu.icon size={25} className="mr-4" />
                    <span>{menu.title}</span>
                  </Link>
                )}
                {menu.submenu && activeSubMenuIndex === index && (
                  <ul className="pl-6 space-y-1">
                    {menu.submenu.map((subMenu, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subMenu.href}
                          className={`flex items-center p-2  hover:text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                            subIndex === menu.submenu.length - 1 ? "mb-3" : ""
                          } ${
                            router.pathname === subMenu.href
                              ? "bg-gray-100 dark:bg-gray-700  text-gray-900 hover:text-gray-900"
                              : "text-white"
                          }`}
                        >
                          <menu.icon size={20} className="mr-4" />
                          <span className="text-sm">{subMenu.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
