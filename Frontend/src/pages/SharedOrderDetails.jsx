"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { FaDownload } from "react-icons/fa"
import jsPDF from "jspdf"
import "jspdf-autotable"

// Import the Noto Sans Tamil font
import notoSansTamilUrl from "../fonts/NotoSansTamil-Regular.ttf"

const SharedOrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

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
                      let value = item[key] || "-"
                      if (title === "Sauce and Supplies") {
                        if (item.liters !== undefined) {
                          value = `${item.liters} (Liters)`
                        } else if (item.quantity !== undefined) {
                          value = item.quantity
                        }
                      } else if (title === "Vegetables") {
                        if (item.id === 40 || item.id === 44 || item.id === 45) {
                          value = `${item.count} (Count)`
                        } else if (
                          item.id === 37 ||
                          item.id === 38 ||
                          item.id === 39 ||
                          item.id === 41 ||
                          item.id === 42 ||
                          item.id === 43
                        ) {
                          value = `${item.bundle} (கட்டு)`
                        } else {
                          value = `${item.kg} (Kg)`
                        }
                      }
                      return <td key={colIndex}>{value}</td>
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

  const generatePDF = async () => {
    setGenerating(true)
    try {
      const doc = new jsPDF()

      // Load and add the Noto Sans Tamil font to the PDF
      const fontResponse = await fetch(notoSansTamilUrl)
      const fontArrayBuffer = await fontResponse.arrayBuffer()
      doc.addFileToVFS("NotoSansTamil-Regular.ttf", fontArrayBuffer)
      doc.addFont("NotoSansTamil-Regular.ttf", "NotoSansTamil", "normal")

      // Set the default font to Noto Sans Tamil
      doc.setFont("NotoSansTamil")

      doc.setFontSize(18)
      doc.text("Order Details", 14, 22)

      doc.setFontSize(12)
      doc.text(`Order ID: ${order.id}`, 14, 32)
      doc.text(`Customer Name: ${order.customerDetails.name}`, 14, 40)
      doc.text(`Order Date: ${order.customerDetails.orderDate}`, 14, 48)
      doc.text(`Function Type: ${order.customerDetails.functionType}`, 14, 56)
      doc.text(`Mobile Number: ${order.customerDetails.mobileNumber}`, 14, 64)
      doc.text(`Address: ${order.customerDetails.address}`, 14, 72)

      let yPos = 90

      const addItemsTable = (items, title, columns) => {
        if (items && items.length > 0) {
          doc.setFontSize(14)
          doc.text(title, 14, yPos)
          yPos += 10

          const tableData = items.map((item) => [
            `${item.tamilName} / ${item.englishName}`,
            ...columns.map((col) => {
              const key = col.toLowerCase().replace(/ /g, "")
              let value = item[key] || "-"
              if (title === "Sauce and Supplies") {
                if (item.liters !== undefined) {
                  value = `${item.liters} (Liters)`
                } else if (item.quantity !== undefined) {
                  value = item.quantity
                }
              } else if (title === "Vegetables") {
                if (item.id === 40 || item.id === 44 || item.id === 45) {
                  value = `${item.count} (Count)`
                } else if (
                  item.id === 37 ||
                  item.id === 38 ||
                  item.id === 39 ||
                  item.id === 41 ||
                  item.id === 42 ||
                  item.id === 43
                ) {
                  value = `${item.bundle} (கட்டு)`
                } else {
                  value = `${item.kg} (Kg)`
                }
              }
              return value
            }),
          ])

          doc.autoTable({
            head: [["Item", ...columns]],
            body: tableData,
            startY: yPos,
            styles: {
              font: "NotoSansTamil",
              fontSize: 10,
            },
            columnStyles: { 0: { cellWidth: 80 } },
          })

          yPos = doc.lastAutoTable.finalY + 15
        }
      }

      addItemsTable(order.poojaItems, "Pooja Items", ["Rs"])
      addItemsTable(order.generalItems, "General Items", ["Kg", "Grams"])
      addItemsTable(order.riceAndPulses, "Rice and Pulses", ["Kg", "Grams"])
      addItemsTable(order.essenceAndColor?.essences, "Essence Types", ["ML"])
      addItemsTable(order.essenceAndColor?.colorPowders, "Color Powder Types", ["Grams"])
      addItemsTable(order.oilsAndFlours?.oils, "Oil Types", ["Liters", "ML"])
      addItemsTable(order.oilsAndFlours?.flours, "Flour Types", ["Kg", "Grams"])
      addItemsTable(order.masala, "Masala Items", ["Kg", "Grams"])
      addItemsTable(order.sauceAndSupplies, "Sauce and Supplies", ["Quantity/Liters"])
      addItemsTable(order.fruits, "Fruits", ["Kg", "Grams"])
      addItemsTable(order.vegetables, "Vegetables", ["Measurement"])
      addItemsTable(order.utensils, "Utensils", ["Count"])
      addItemsTable(order.idliBatter, "Idli Batter", ["Count"])

      doc.save(`Order_${order.id}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("An error occurred while generating the PDF. Please try again.")
    } finally {
      setGenerating(false)
    }
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
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h1 style={{ color: "black", margin: 0 }}>Shared Order Details</h1>
        <div className="d-flex gap-2">
          <button
            onClick={generatePDF}
            className="btn"
            style={{ backgroundColor: "#d33131", color: "white" }}
            disabled={generating}
          >
            {generating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Generating...
              </>
            ) : (
              <>
                <FaDownload className="me-2" /> Download PDF
              </>
            )}
          </button>
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
      {renderItemsTable(order.poojaItems, "Pooja Items", ["Rs"])}

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
      {renderItemsTable(order.sauceAndSupplies, "Sauce and Supplies", ["Quantity/Liters"])}

      {/* Fruits */}
      {renderItemsTable(order.fruits, "Fruits", ["Kg", "Grams"])}

      {/* Vegetables */}
      {renderItemsTable(order.vegetables, "Vegetables", ["Measurement"])}

      {/* Utensils */}
      {renderItemsTable(order.utensils, "Utensils", ["Count"])}

      {/* Idli Batter */}
      {renderItemsTable(order.idliBatter, "Idli Batter", ["Count"])}
    </div>
  )
}

export default SharedOrderDetails

