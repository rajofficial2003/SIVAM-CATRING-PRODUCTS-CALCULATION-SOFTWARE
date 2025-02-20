import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AddOrder from "./pages/AddOrder"
import OrdersPage from "./pages/OrdersPage"
import OrderDetails from "./pages/OrderDetails"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Header />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                New Order
              </Link>
              <Link className="nav-link" to="/orders">
                View Orders
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<AddOrder />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

