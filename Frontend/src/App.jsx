"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AddOrder from "./pages/AddOrder"
import OrdersPage from "./pages/OrdersPage"
import OrderDetails from "./pages/OrderDetails"
import { FaArrowUp, FaPlus, FaList } from "react-icons/fa"
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
        <Header />
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            padding: "0.5rem 0",
          }}
        >
          <div className="container">
            <div className="navbar-nav w-100 justify-content-center flex-row">
              <NavLink className={({ isActive }) => `nav-link premium-btn ${isActive ? "active" : ""}`} to="/">
                <FaPlus className="me-2" />
                <span>New Order</span>
              </NavLink>
              <NavLink className={({ isActive }) => `nav-link premium-btn ${isActive ? "active" : ""}`} to="/orders">
                <FaList className="me-2" />
                <span>View Orders</span>
              </NavLink>
            </div>
          </div>
        </nav>
        <main className="flex-grow-1" style={{ backgroundColor: "#ffffff" }}>
          <Routes>
            <Route path="/" element={<AddOrder />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/orders/:orderId/edit" element={<AddOrder />} />
          </Routes>
        </main>
        <Footer />
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

