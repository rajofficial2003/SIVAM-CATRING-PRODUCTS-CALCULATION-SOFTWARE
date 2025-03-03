import { useLocation } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { FaPlus, FaList } from "react-icons/fa"

function NavBar() {
  const location = useLocation()
  const isSharedOrder = location.pathname.startsWith("/shared-order")

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
        </div>
      </div>
    </nav>
  )
}

export default NavBar

