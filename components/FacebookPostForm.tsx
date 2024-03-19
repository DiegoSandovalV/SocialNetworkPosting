import { get } from "http"
import React, { useState, useEffect } from "react"
import { SocialMediaService } from "../services/SocialMediaService"
require("dotenv").config()

const FacebookPostForm = () => {
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleFacebookSubmit = async (e: any) => {
    e.preventDefault()
    const accessToken = process.env.NEXT_PUBLIC_API_KEY || ""
    const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID || ""
    await SocialMediaService.handleFacebookSubmit(
      message,
      image,
      pageId,
      accessToken
    )
  }

  const handleInstagramPost = async () => {
    const instagramAccessToken = process.env.NEXT_PUBLIC_API_KEY || ""
    const instagramPageId = process.env.NEXT_PUBLIC_IG_PAGE_ID || ""
    await SocialMediaService.handleInstagramPost(
      message,
      image,
      instagramPageId,
      instagramAccessToken
    )
  }

  const handleBothPlatformsPost = async () => {
    await handleFacebookSubmit(Event as any)
    await handleInstagramPost()
  }

  SocialMediaService.UseLoadFacebookSDK()
  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-black">
        Social Media Post Form
      </h1>
      <form onSubmit={handleFacebookSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Post message"
            className="mt-1 px-3 py-2 block w-full rounded-md text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image (Upload or URL):
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 px-3 py-2 block w-full rounded-md text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Post to Facebook
          </button>

          <button
            type="button"
            onClick={handleInstagramPost}
            className="ml-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50"
          >
            Post to Instagram
          </button>

          <button
            type="button"
            onClick={handleBothPlatformsPost}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50"
          >
            Post to Both
          </button>
        </div>
      </form>
    </div>
  )
}

export default FacebookPostForm
