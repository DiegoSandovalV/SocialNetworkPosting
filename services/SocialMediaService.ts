import { useEffect } from "react"

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

export const SocialMediaService = {
  handleFacebookSubmit: async (
    message: string,
    image: File | null,
    pageId: string,
    accessToken: string
  ) => {
    try {
      const formData = new FormData()
      formData.append("message", message)
      formData.append("access_token", accessToken)
      if (image) {
        formData.append("image", image)
      }

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
  },

  handleInstagramPost: async (
    message: string,
    image: File | null,
    instagramPageId: string,
    instagramAccessToken: string
  ) => {
    try {
      const formData = new FormData()
      formData.append("access_token", instagramAccessToken)
      formData.append("caption", message)
      if (image) {
        const imageUrl = await SocialMediaService.getImageUrl(image)
        formData.append("image_url", imageUrl)
      }

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
        SocialMediaService.publishPost(
          data.id,
          instagramPageId,
          instagramAccessToken
        )
      } else {
        console.error("Error uploading image to Instagram:", data.error)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  },

  publishPost: async (
    id: string,
    instagramPageId: string,
    instagramAccessToken: string
  ) => {
    try {
      const formData = new FormData()
      formData.append("access_token", instagramAccessToken)

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
  },

  getImageUrl: async (image: File) => {
    try {
      const formData = new FormData()
      formData.append("image", image)

      const imageHostResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=" +
          process.env.NEXT_PUBLIC_IMG_HOST_KEY,
        {
          method: "POST",
          body: formData,
        }
      )
      const imageHostData = await imageHostResponse.json()

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
  },

  UseLoadFacebookSDK: () => {
    useEffect(() => {
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
  },
}
