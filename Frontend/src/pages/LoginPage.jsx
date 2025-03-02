"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/config"
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      setError("Failed to log in. Please check your credentials.")
    }
  }

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="card shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-header text-center py-3" style={{ backgroundColor: "#d33131", color: "white" }}>
          <h2 className="mb-0">Login to Sivam Catering</h2>
        </div>
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#d33131" }}>
                  <FaUser color="white" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#d33131" }}>
                  <FaLock color="white" />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn w-100 py-2"
              style={{
                backgroundColor: "#d33131",
                color: "white",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#b52020")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#d33131")}
            >
              <FaSignInAlt className="me-2" />
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

