import Head from "next/head";
import Image from "next/image";
import React, { ReactNode } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { SiGravatar } from "react-icons/si";

type Props = {
  children: ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <>
      <Head>
        <title>Kedai Edukasi - Portal Edukasi Seputar Dunia Pemrograman</title>
      </Head>
      <div className="pt-20 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
        <div className="p-2 sm:ml-64 pt-10 md:pt-6 bg-gray-100 min-h-screen md:mt-10 border rounded-3xl md:mr-4 md:pb-4">
          <div className="">
            <div className="md:flex hidden">
              <div className="mb-4 ml-4">
                Application - <span className="text-primary">Dashboard</span>
              </div>
              <div className="ml-auto mr-4 flex -mt-1">
                <MdOutlineNotificationsActive size={25} />
                <div className="-mt-1 ml-1">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary p-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                  >
                    Account
                  </button>
                </div>
                <SiGravatar className="text-gray-700 ml-4 " size={25} />
              </div>
            </div>
            <div className="md:hidden flex">
              <div className="mb-4 ml-4">
                <MdOutlineNotificationsActive size={25} />
              </div>
              <div className="ml-auto mr-4 flex -mt-1">
                <div className="-mt-1 ml-1">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary p-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                  >
                    Account
                  </button>
                </div>
                <SiGravatar className="text-gray-700 ml-4 " size={25} />
              </div>
            </div>
            <div className="p-4 border-2 border-gray-300 border-dashed ml-2 mr-2 rounded-lg dark:border-gray-700">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
