"use client"

import { useState, useEffect, useCallback } from "react"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEdit, FaTrash, FaSearch, FaCalendar, FaUtensils } from "react-icons/fa"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState([])
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState(null)
  const [filterMonth, setFilterMonth] = useState("")
  const navigate = useNavigate()

  const fetchOrders = useCallback(async () => {
    try {
      const ordersCollection = collection(db, "Orders")
      const ordersSnapshot = await getDocs(ordersCollection)
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
      }))

      setLoadingOrders(new Array(ordersList.length).fill(true))
      setOrders([])

      ordersList.forEach((order, index) => {
        setTimeout(() => {
          setOrders((prevOrders) => {
            const newOrders = [...prevOrders]
            newOrders[index] = order
            return newOrders
          })
          setLoadingOrders((prevLoading) => {
            const newLoading = [...prevLoading]
            newLoading[index] = false
            return newLoading
          })
        }, index * 100)
      })
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError("Failed to load orders. Please try again.")
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteDoc(doc(db, "Orders", orderId))
        setOrders((prevOrders) => prevOrders.filter((order) => order && order.id !== orderId))
      } catch (err) {
        console.error("Error deleting order:", err)
        setError("Failed to delete order. Please try again.")
      }
    }
  }

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`)
  }

  const handleEdit = (orderId) => {
    navigate(`/orders/${orderId}/edit`)
  }

  const filteredOrders = orders.filter((order) => {
    if (!order) return false
    const searchTermLower = searchTerm.toLowerCase()
    const nameMatch = order.customerDetails.name.toLowerCase().includes(searchTermLower)
    const addressMatch = order.customerDetails.address.toLowerCase().includes(searchTermLower)
    const functionTypeMatch = order.customerDetails.functionType.toLowerCase().includes(searchTermLower)
    const dateMatch = filterDate
      ? format(new Date(order.customerDetails.orderDate), "yyyy-MM-dd") === format(filterDate, "yyyy-MM-dd")
      : true
    const monthMatch = filterMonth
      ? new Date(order.customerDetails.orderDate).getMonth() === Number.parseInt(filterMonth) - 1
      : true
    return (nameMatch || addressMatch || functionTypeMatch) && dateMatch && monthMatch
  })

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert" style={{ backgroundColor: "#d33131", color: "white" }} role="alert">
          {error}
        </div>
      </div>
    )

  return (
    <div className="container my-5">
      <h1 className="mb-4" style={{ color: "black" }}>
        Orders Management
      </h1>
      <div className="card shadow-sm mb-4" style={{ backgroundColor: "white", borderColor: "#d33131" }}>
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#d33131", color: "white" }}>
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, address, or function type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#d33131", color: "white" }}>
                  <FaCalendar />
                </span>
                <DatePicker
                  selected={filterDate}
                  onChange={(date) => setFilterDate(date)}
                  className="form-control"
                  placeholderText="Select Date"
                  dateFormat="dd/MM/yyyy"
                  wrapperClassName="flex-grow-1"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: "#d33131", color: "white" }}>
                  <FaCalendar />
                </span>
                <select className="form-select" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                  <option value="">All Months</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {format(new Date(2023, month - 1, 1), "MMMM")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {filteredOrders.length === 0 && loadingOrders.every((loading) => !loading) ? (
        <div
          className="alert"
          style={{ backgroundColor: "white", color: "#d33131", border: "1px solid #d33131" }}
          role="alert"
        >
          No orders found.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredOrders.map((order, index) => (
            <div key={order.id} className="col">
              {loadingOrders[index] ? (
                <div className="card h-100 shadow-sm border-0 d-flex justify-content-center align-items-center">
                  <div className="loading-animation">
                    <FaUtensils className="loading-icon" />
                    <span className="loading-text">Loading order...</span>
                  </div>
                </div>
              ) : (
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header" style={{ backgroundColor: "#d33131", color: "white" }}>
                    <h5 className="card-title mb-0">{order.customerDetails.name}</h5>
                  </div>
                  <div className="card-body" style={{ backgroundColor: "white" }}>
                    <p className="card-text">
                      <strong>Order Date:</strong> {format(new Date(order.customerDetails.orderDate), "dd/MM/yyyy")}
                    </p>
                    <p className="card-text">
                      <strong>Function Type:</strong> {order.customerDetails.functionType}
                    </p>
                    <p className="card-text">
                      <strong>Address:</strong> {order.customerDetails.address}
                    </p>
                  </div>
                  <div className="card-footer" style={{ backgroundColor: "white", borderTop: "1px solid #d33131" }}>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#d33131", color: "white" }}
                        onClick={() => handleViewDetails(order.id)}
                      >
                        <FaEye className="me-1" /> View
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "white", color: "#d33131", borderColor: "#d33131" }}
                        onClick={() => handleEdit(order.id)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#d33131", color: "white" }}
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrash className="me-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .loading-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .loading-icon {
          font-size: 2rem;
          color: #d33131;
          animation: spin 2s linear infinite;
        }
        .loading-text {
          margin-top: 0.5rem;
          color: #d33131;
          font-weight: bold;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default OrdersPage

