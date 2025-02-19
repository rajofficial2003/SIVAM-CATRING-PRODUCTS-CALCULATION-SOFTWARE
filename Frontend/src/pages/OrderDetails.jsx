"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrderDetails()
  }, []) // Updated useEffect dependency array

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
      <div className="mb-4">
        <h3 className="mb-3">{title}</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="bg-light">
              <tr>
                <th>Tamil Name</th>
                <th>English Name</th>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.tamilName || "-"}</td>
                  <td>{item.englishName || "-"}</td>
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
    )
  }

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">Order not found.</div>
        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Order Details</h1>
        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>

      {/* Customer Details */}
      <div className="card mb-4">
        <div className="card-header bg-primary-subtle">
          <h2 className="card-title h5 mb-0">Customer Details</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <strong>Name:</strong> {order.customerDetails?.name || "-"}
            </div>
            <div className="col-md-3">
              <strong>Order Date:</strong> {order.timestamp?.toLocaleDateString() || "-"}
            </div>
            <div className="col-md-3">
              <strong>Function Type:</strong> {order.customerDetails?.functionType || "-"}
            </div>
            <div className="col-md-3">
              <strong>Address:</strong> {order.customerDetails?.address || "-"}
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

