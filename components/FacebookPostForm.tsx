import { get } from "http"
import React, { useState, useEffect } from "react"
require("dotenv").config()

interface WindowWithFB extends Window {
  fbAsyncInit?: () => void
  FB?: {
    init: (config: {
      appId: string
      autoLogAppEvents: boolean
      xfbml: boolean
      version: string
    }) => void
  }
}

const FacebookPostForm = () => {
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleFacebookSubmit = async (e: any) => {
    e.preventDefault()
    try {
      // Page Access Token
      const accessToken = process.env.NEXT_PUBLIC_API_KEY || ""
      console.log("access token:", accessToken)

      // Page ID
      const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID || ""
      console.log(pageId)

      // Prepare form data
      const formData = new FormData()
      formData.append("message", message)
      formData.append("access_token", accessToken)
      if (image) {
        formData.append("image", image)
      }

      // endpoint to publish the image with caption
      const response = await fetch(
        `https://graph.facebook.com/v17.0/${pageId}/photos`,
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await response.json()

      if (response.ok) {
        console.log("Image published successfully:", data)
      } else {
        console.error("Error publishing image:", data.error)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleInstagramPost = async () => {
    const accessToken = process.env.NEXT_PUBLIC_API_KEY || ""
    console.log("access token:", accessToken)

    // Page ID
    const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID || "a"
    console.log(pageId)
    try {
      // Instagram Access Token
      const instagramAccessToken = process.env.API_KEY || ""
      console.log("Instagram Access Token:", instagramAccessToken)

      // Instagram User ID
      const instagramPageId = process.env.IG_PAGE_ID || ""
      console.log("Instagram User ID:", instagramPageId)

      // Prepare form data
      const formData = new FormData()
      formData.append("access_token", instagramAccessToken)
      formData.append("caption", message)
      if (image) {
        const imageUrl = await getImageUrl()
        formData.append("image_url", imageUrl)
      }

      // endpoint to publish the image with caption
      const response = await fetch(
        `https://graph.facebook.com/v17.0/${instagramPageId}/media?media_type=IMAGE`,
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await response.json()

      if (response.ok) {
        console.log("Image uploaded to Instagram successfully:", data)
        publishPost(data.id)
      } else {
        console.error("Error uploading image to Instagram:", data.error)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const publishPost = async (id: string) => {
    try {
      // Instagram Access Token
      const instagramAccessToken = process.env.NEXT_PUBLIC_API_KEY || ""
      console.log("Instagram Access Token:", instagramAccessToken)

      const instagramPageId = process.env.NEXT_PUBLIC_IG_PAGE_ID || ""

      // Prepare form data
      const formData = new FormData()
      formData.append("access_token", instagramAccessToken)

      // endpoint to publish the image with caption
      const instagramResponse = await fetch(
        `https://graph.facebook.com/v17.0/${instagramPageId}/media_publish?creation_id=${id}`,
        {
          method: "POST",
          body: formData,
        }
      )

      const instagramResult = await instagramResponse.json()

      if (instagramResponse.ok) {
        console.log(
          "Image published on Instagram successfully:",
          instagramResult
        )
      } else {
        console.error(
          "Error publishing image on Instagram:",
          instagramResult.error
        )
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const getImageUrl = async () => {
    try {
      const formData = new FormData()
      formData.append("image", image as Blob)

      const imageHostResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=1234",
        {
          method: "POST",
          body: formData,
        }
      )
      const imageHostData = await imageHostResponse.json()
      console.log("Image Host Data:", imageHostData)

      if (imageHostResponse.ok) {
        return imageHostData.data.url
      } else {
        console.error(
          "Error uploading image to image host:",
          imageHostData.error
        )
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }
  const handleBothPlatformsPost = async () => {
    // Call handleFacebookSubmit and handleInstagramPost as needed
    await handleFacebookSubmit(Event as any)
    // await handleInstagramPost()
  }

  useEffect(() => {
    // Load the Facebook SDK asynchronously
    ;(window as WindowWithFB).fbAsyncInit = function () {
      ;(window as WindowWithFB).FB?.init({
        appId: "your-app-id",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v10.0",
      })
    }
    ;(function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s) as HTMLScriptElement
      js.id = id
      js.src = "https://connect.facebook.net/en_US/sdk.js"
      fjs.parentNode?.insertBefore(js, fjs)
    })(document, "script", "facebook-jssdk")
  }, [])

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
