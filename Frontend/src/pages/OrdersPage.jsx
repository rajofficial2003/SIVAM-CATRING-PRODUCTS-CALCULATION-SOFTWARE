"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa"

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, "Orders")
      const ordersSnapshot = await getDocs(ordersCollection)
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
      }))
      setOrders(ordersList)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError("Failed to load orders. Please try again.")
      setLoading(false)
    }
  }

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteDoc(doc(db, "Orders", orderId))
        setOrders(orders.filter((order) => order.id !== orderId))
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

  const filteredOrders = orders.filter((order) =>
    order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading orders...</span>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-primary">Orders Management</h1>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text bg-primary text-white">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search orders by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {filteredOrders.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No orders found.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">{order.customerDetails.name}</h5>
                </div>
                <div className="card-body">
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
                <div className="card-footer bg-white border-0">
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleViewDetails(order.id)}>
                      <FaEye className="me-1" /> View
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleEdit(order.id)}>
                      <FaEdit className="me-1" /> Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(order.id)}>
                      <FaTrash className="me-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage

