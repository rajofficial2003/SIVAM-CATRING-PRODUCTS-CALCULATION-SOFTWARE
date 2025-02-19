"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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

  if (loading) return <div>Loading orders...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{order.customerDetails.name}</h5>
            <p className="card-text">Order Date: {format(new Date(order.customerDetails.orderDate), "dd/MM/yyyy")}</p>
            <p className="card-text">Function Type: {order.customerDetails.functionType}</p>
            <p className="card-text">Address: {order.customerDetails.address}</p>
            <button className="btn btn-info me-2" onClick={() => handleViewDetails(order.id)}>
              View Details
            </button>
            <button className="btn btn-primary me-2" onClick={() => handleEdit(order.id)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(order.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrdersPage

