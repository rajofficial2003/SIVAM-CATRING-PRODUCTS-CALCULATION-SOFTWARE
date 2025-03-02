"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import LoginPage from "./pages/LoginPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AddOrder from "./pages/AddOrder"
import OrdersPage from "./pages/OrdersPage"
import OrderDetails from "./pages/OrderDetails"
import SharedOrderDetails from "./pages/SharedOrderDetails"
import { FaArrowUp, FaPlus, FaList, FaSignOutAlt } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function NavBar() {
  const location = useLocation()
  const isSharedOrder = location.pathname.startsWith("/shared-order")
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await auth.signOut()
      navigate("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (isSharedOrder) {
    return null
  }

  return (
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
          <button className="nav-link premium-btn" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>
    }
    if (!user) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        {user && <Header />}
        {user && <NavBar />}
        <main className="flex-grow-1" style={{ backgroundColor: "#ffffff" }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AddOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:orderId"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:orderId/edit"
              element={
                <ProtectedRoute>
                  <AddOrder />
                </ProtectedRoute>
              }
            />
            <Route path="/shared-order/:orderId" element={<SharedOrderDetails />} />
          </Routes>
        </main>
        {user && <Footer />}
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

