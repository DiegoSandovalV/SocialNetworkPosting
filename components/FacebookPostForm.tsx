import React, { useState } from "react"

const FacebookPostForm = () => {
  const [message, setMessage] = useState("")
  const [image, setImage] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleFacebookSubmit = async (e: any) => {
    e.preventDefault()

    if (!message || (!image && !imageUrl)) {
      alert(
        "Please fill in both the message and either select an image or provide an image URL."
      )
      return
    }

    // If an image URL is provided, use it; otherwise, use the uploaded image.
    const selectedImage = imageUrl || image

    const formData = new FormData()
    formData.append("message", message)

    // If an image URL is provided, include it in the form data.
    if (imageUrl) {
      formData.append("image", imageUrl)
    } else {
      formData.append("image", image)
    }

    try {
      const response = await fetch("/api/facebook-post", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Posted to Facebook successfully:", data)
      } else {
        const errorData = await response.json()
        console.error("Error posting to Facebook:", errorData)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleInstagramPost = async (e: any) => {
    e.preventDefault()

    if (!message || (!image && !imageUrl)) {
      alert(
        "Please fill in both the message and either select an image or provide an image URL."
      )
      return
    }

    // If an image URL is provided, use it; otherwise, use the uploaded image.
    const selectedImage = imageUrl || image

    const formData = new FormData()
    formData.append("message", message)

    // If an image URL is provided, include it in the form data.
    if (imageUrl) {
      formData.append("image", imageUrl)
    } else {
      formData.append("image", image)
    }

    try {
      const response = await fetch("/api/instagram-post", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Posted to Instagram successfully:", data)
      } else {
        const errorData = await response.json()
        console.error("Error posting to Instagram:", errorData)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleBothPlatformsPost = async (e: any) => {
    // Use Promise.all to execute both functions concurrently
    try {
      await Promise.all([handleFacebookSubmit(e), handleInstagramPost(e)])
      alert("Posted to both platforms successfully")
    } catch (error) {
      console.error("Error posting to one or both platforms:", error)
      alert(
        "Error posting to one or both platforms. Check the console for details."
      )
    }
  }

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
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Or provide an image URL"
            className="mt-2 px-3 py-2 block w-full text-gray-700 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
