"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddOrder from "./pages/AddOrder"
import OrdersPage from "./pages/OrdersPage"
import OrderDetails from "./pages/OrderDetails"
import SharedOrderDetails from "./pages/SharedOrderDetails"
import { FaArrowUp } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <main className="flex-grow-1" style={{ backgroundColor: "#ffffff" }}>
          <Routes>
            <Route path="/" element={<AddOrder />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/orders/:orderId/edit" element={<AddOrder />} />
            <Route path="/shared-order/:orderId" element={<SharedOrderDetails />} />
          </Routes>
        </main>
        {showBackToTop && (
          <button className="back-to-top premium-btn" onClick={scrollToTop} aria-label="Back to top">
            <FaArrowUp />
          </button>
        )}
      </div>
    </Router>
  )
}

export default App

