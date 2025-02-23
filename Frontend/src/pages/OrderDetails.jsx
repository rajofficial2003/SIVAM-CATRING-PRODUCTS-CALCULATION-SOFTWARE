"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { FaEdit, FaArrowLeft } from "react-icons/fa"

const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  const fetchOrderDetails = async () => {
    try {
      const orderDoc = await getDoc(doc(db, "Orders", orderId))
      if (orderDoc.exists()) {
        setOrder({
          id: orderDoc.id,
          ...orderDoc.data(),
          timestamp: orderDoc.data().timestamp?.toDate(),
        })
      }
    } catch (error) {
      console.error("Error fetching order details:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderItemsTable = (items, title, columns) => {
    if (!items || items.length === 0) return null

    return (
      <div className="card shadow-sm mb-5">
        <div className="card-header" style={{ backgroundColor: "#d33131", color: "white" }}>
          <h3 className="card-title mb-0">{title}</h3>
        </div>
        <div className="card-body p-3">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
              <thead className="sticky-top" style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th>
                    <span className="tamil-text">பொருட்கள்</span>
                    <span className="english-text"> / Items</span>
                  </th>
                  {columns.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span className="tamil-text">{item.tamilName || "-"}</span>
                      <span className="english-text"> / {item.englishName || "-"}</span>
                    </td>
                    {columns.map((col, colIndex) => {
                      const key = col.toLowerCase().replace(/ /g, "")
                      return <td key={colIndex}>{item[key] || "-"}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" style={{ color: "#d33131" }} role="status">
          <span className="visually-hidden">Loading order details...</span>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mt-5">
        <div className="alert" style={{ backgroundColor: "#d33131", color: "white" }} role="alert">
          Order not found.
        </div>
        <button
          onClick={() => navigate("/orders")}
          className="btn"
          style={{ backgroundColor: "#d33131", color: "white" }}
        >
          <FaArrowLeft className="me-2" /> Back to Orders
        </button>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-md-row justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <button
            onClick={() => navigate("/orders")}
            className="btn me-3"
            style={{ backgroundColor: "#d33131", color: "white" }}
          >
            <FaArrowLeft />
          </button>
          <h1 style={{ color: "black", margin: 0 }}>Order Details</h1>
        </div>
        <div>
          <Link
            to={`/orders/${orderId}/edit`}
            className="btn"
            style={{ backgroundColor: "#d33131", color: "white", width: "100%" }}
          >
            <FaEdit className="me-2" /> Edit Order
          </Link>
        </div>
      </div>

      {/* Customer Details */}
      <div className="card shadow-sm mb-5">
        <div className="card-header" style={{ backgroundColor: "#d33131", color: "white" }}>
          <h2 className="card-title h5 mb-0">Customer Details</h2>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6 col-lg-3">
              <div className="d-flex flex-column">
                <strong>Name:</strong>
                <span>{order.customerDetails?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="d-flex flex-column">
                <strong>Order Date:</strong>
                <span>{order.customerDetails?.orderDate || "-"}</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="d-flex flex-column">
                <strong>Function Type:</strong>
                <span>{order.customerDetails?.functionType || "-"}</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="d-flex flex-column">
                <strong>Mobile Number:</strong>
                <span>{order.customerDetails?.mobileNumber || "-"}</span>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column">
                <strong>Address:</strong>
                <span>{order.customerDetails?.address || "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pooja Items */}
      {renderItemsTable(order.poojaItems, "Pooja Items", ["Kg", "Grams"])}

      {/* General Items */}
      {renderItemsTable(order.generalItems, "General Items", ["Kg", "Grams"])}

      {/* Rice and Pulses */}
      {renderItemsTable(order.riceAndPulses, "Rice and Pulses", ["Kg", "Grams"])}

      {/* Essence and Color */}
      {renderItemsTable(order.essenceAndColor?.essences, "Essence Types", ["ML"])}
      {renderItemsTable(order.essenceAndColor?.colorPowders, "Color Powder Types", ["Grams"])}

      {/* Oils and Flours */}
      {renderItemsTable(order.oilsAndFlours?.oils, "Oil Types", ["Liters", "ML"])}
      {renderItemsTable(order.oilsAndFlours?.flours, "Flour Types", ["Kg", "Grams"])}

      {/* Masala Items */}
      {renderItemsTable(order.masala, "Masala Items", ["Kg", "Grams"])}

      {/* Sauce and Supplies */}
      {renderItemsTable(order.sauceAndSupplies, "Sauce and Supplies", ["Quantity"])}

      {/* Fruits */}
      {renderItemsTable(order.fruits, "Fruits", ["Kg", "Grams"])}

      {/* Vegetables */}
      {renderItemsTable(order.vegetables, "Vegetables", ["Kg"])}

      {/* Utensils */}
      {renderItemsTable(order.utensils, "Utensils", ["Count"])}

      {/* Idli Batter */}
      {renderItemsTable(order.idliBatter, "Idli Batter", ["Count"])}
    </div>
  )
}

export default OrderDetails

