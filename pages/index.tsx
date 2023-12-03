import React from "react"
import FacebookPostForm from "../components/FacebookPostForm"
import Navbar from "@/components/Navbar"

//routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <Navbar />
      <FacebookPostForm />
    </div>
  )
}

export default Home
