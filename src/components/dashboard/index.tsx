import React from 'react'
import { FaRegNewspaper } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import { TfiComments } from "react-icons/tfi";


export default function Dashboard() {
  return (
    <>
    <div className="grid md:grid-cols-4 md:gap-4 md:mb-4">
    <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-md">
      <div className="flex items-center">
        <div className="ml-2 mr-4 text-primary">
          <FaRegNewspaper className='text-primary' size={25}/>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Articles</h3>
          <p className="mt-1 text-sm text-gray-500">All Articles</p>
        </div>
      </div>
      <div className="ml-6 text-3xl mr-2 font-medium text-gray-900">20</div>
    </div>
    <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-md">
      <div className="flex items-center">
        <div className="ml-2 mr-4 text-primary">
          <BiCategoryAlt size={25}/>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
          <p className="mt-1 text-sm text-gray-500">Count All Categories</p>
        </div>
      </div>
      <div className="ml-6 text-3xl mr-2 font-medium text-gray-900">20</div>
    </div>
    <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-md">
      <div className="flex items-center">
        <div className="ml-2 mr-4 ">
          <TfiComments className='text-primary' size={25}/>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Comments</h3>
          <p className="mt-1 text-sm text-gray-500">All Comments on Post</p>
        </div>
      </div>
      <div className="ml-6 text-3xl mr-2 font-medium text-gray-900">20</div>
    </div>
    <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-md">
      <div className="flex items-center">
        <div className="ml-2 mr-4 text-primary">
          <TbUsers size={25}/>
        </div>
        <div>
        <h3 className="text-lg font-medium text-gray-900">Users</h3>
          <p className="mt-1 text-sm text-gray-500">Count All Users</p>
        </div>
      </div>
      <div className="ml-6 text-3xl mr-2 font-medium text-gray-900">20</div>
    </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
      </div>
    </>
  )
}
