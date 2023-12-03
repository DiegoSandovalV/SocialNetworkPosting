// Navbar.js

import React from "react"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-lg mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-xl font-semibold">
          Social Media App
        </a>
        <div className="space-x-4">
          <a
            href="/publish"
            className="text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Publish
          </a>
          <a
            href="/statistics"
            className="text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Statistics
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
