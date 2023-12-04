// Navbar.js

import React from "react"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-lg mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-semibold">
          Social Media App
        </Link>
        <div className="space-x-4">
          <Link
            href="/publish"
            className="text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Publish
          </Link>
          <Link
            href="/statistics"
            className="text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Statistics
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
