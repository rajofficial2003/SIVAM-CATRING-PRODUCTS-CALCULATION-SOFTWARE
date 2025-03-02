"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { FaEdit, FaArrowLeft, FaDownload, FaShare, FaWhatsapp } from "react-icons/fa"
import jsPDF from "jspdf"
import "jspdf-autotable"
import { Modal, Button, Dropdown } from "react-bootstrap"

// Import the Noto Sans Tamil font
import notoSansTamilUrl from "../fonts/NotoSansTamil-Regular.ttf"

const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareLink, setShareLink] = useState("")
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
                      let value = "-"
                      if (title === "Oil Types") {
                        if (key === "kg") {
                          value = item.kg ? `${item.kg} (Kg)` : "-"
                        } else if (key === "liters") {
                          value = item.liters ? `${item.liters} (Liters)` : "-"
                        } else if (key === "ml") {
                          value = item.ml ? `${item.ml} (ml)` : "-"
                        } else if (key === "count") {
                          value = item.count ? `${item.count} (Count)` : "-"
                        } else if (key === "grams") {
                          value = item.grams ? `${item.grams} (Grams)` : "-"
                        }
                      } else if (title === "Vegetables") {
                        if (item.id === 40 || item.id === 44 || item.id === 45) {
                          value = `${item.count} (Count)`
                        } else if ([37, 38, 39, 42, 43, 46].includes(item.id)) {
                          value = `${item.bundle} (கட்டு)`
                        } else if ([14, 15, 34, 35, 36].includes(item.id)) {
                          value = `${item.quantity} (Quantity)`
                        } else {
                          value = `${item.kg} (Kg)`
                        }
                      } else if (title === "Color Powder Types") {
                        value = `${item.pockets} (Pockets)`
                      } else if (title === "Flour Types") {
                        value = `${item.kg} (Kg)`
                      } else if (title === "General Items") {
                        if (item.id === 50) {
                          value = `${item.bundle} (கட்டு)`
                        } else if (item.id === 59) {
                          value = `${item.count} (Count)`
                        } else if (key === "kg/bundle(கட்டு)") {
                          value = item.kg ? `${item.kg} (Kg)` : "-"
                        } else if (key === "grams") {
                          value = item.grams ? `${item.grams} (Grams)` : "-"
                        }
                      } else if (title === "Pooja Items") {
                        value = `${item.rs} (Rs)`
                      } else if (title === "Sauce and Supplies") {
                        if (item.quantity) {
                          value = `${item.quantity} (Quantity)`
                        } else if (item.liters) {
                          value = `${item.liters} (Liters)`
                        } else if (item.meter) {
                          value = `${item.meter} (Meter)`
                        } else {
                          value = "-"
                        }
                      } else if (title === "Fruits") {
                        if (item.id === 2 || item.id === 6) {
                          // Jackfruit and Pineapple
                          value = `${item.quantity} (Quantity)`
                        } else {
                          value = `${item.kg} (Kg)`
                        }
                      } else {
                        value = item[key] || "-"
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
              let value = "-"
              if (title === "Oil Types") {
                if (key === "kg") {
                  value = item.kg ? `${item.kg} (Kg)` : "-"
                } else if (key === "liters") {
                  value = item.liters ? `${item.liters} (Liters)` : "-"
                } else if (key === "ml") {
                  value = item.ml ? `${item.ml} (ml)` : "-"
                } else if (key === "count") {
                  value = item.count ? `${item.count} (Count)` : "-"
                } else if (key === "grams") {
                  value = item.grams ? `${item.grams} (Grams)` : "-"
                }
              } else if (title === "Vegetables") {
                if (item.id === 40 || item.id === 44 || item.id === 45) {
                  value = `${item.count} (Count)`
                } else if ([37, 38, 39, 42, 43, 46].includes(item.id)) {
                  value = `${item.bundle} (கட்டு)`
                } else if ([14, 15, 34, 35, 36].includes(item.id)) {
                  value = `${item.quantity} (Quantity)`
                } else {
                  value = `${item.kg} (Kg)`
                }
              } else if (title === "Color Powder Types") {
                value = `${item.pockets} (Pockets)`
              } else if (title === "Flour Types") {
                value = `${item.kg} (Kg)`
              } else if (title === "General Items") {
                if (item.id === 50) {
                  value = `${item.bundle} (கட்டு)`
                } else if (item.id === 59) {
                  value = `${item.count} (Count)`
                } else if (key === "kg/bundle(கட்டு)") {
                  value = item.kg ? `${item.kg} (Kg)` : "-"
                } else if (key === "grams") {
                  value = item.grams ? `${item.grams} (Grams)` : "-"
                }
              } else if (title === "Pooja Items") {
                value = `${item.rs} (Rs)`
              } else if (title === "Sauce and Supplies") {
                if (item.quantity) {
                  value = `${item.quantity} (Quantity)`
                } else if (item.liters) {
                  value = `${item.liters} (Liters)`
                } else if (item.meter) {
                  value = `${item.meter} (Meter)`
                } else {
                  value = "-"
                }
              } else if (title === "Fruits") {
                if (item.id === 2 || item.id === 6) {
                  // Jackfruit and Pineapple
                  value = `${item.quantity} (Quantity)`
                } else {
                  value = `${item.kg} (Kg)`
                }
              } else {
                value = item[key] || "-"
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
      addItemsTable(order.generalItems, "General Items", ["Kg/Bundle(கட்டு)", "Grams"])
      addItemsTable(order.riceAndPulses, "Rice and Pulses", ["Kg", "Grams"])
      addItemsTable(order.essenceAndColor?.essences, "Essence Types", ["ML"])
      addItemsTable(order.essenceAndColor?.colorPowders, "Color Powder Types", ["Pockets"])
      addItemsTable(order.oilsAndFlours?.oils, "Oil Types", ["Kg", "Liters", "ml", "Count", "Grams"])
      addItemsTable(order.oilsAndFlours?.flours, "Flour Types", ["Kg"])
      addItemsTable(order.masala, "Masala Items", ["Kg", "Grams"])
      addItemsTable(order.sauceAndSupplies, "Sauce and Supplies", ["Quantity/Liters/Meter"])
      addItemsTable(order.fruits, "Fruits", ["Measurement"])
      addItemsTable(order.vegetables, "Vegetables", ["Measurement"])
      addItemsTable(order.utensils, "Utensils", ["Count"])
      addItemsTable(order.idliBatter, "Idli Batter", ["Count"])
      addItemsTable(order.smallGrains, "Small Grains", ["Kg"])

      doc.save(`Order_${order.id}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("An error occurred while generating the PDF. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handleShare = () => {
    const shareLink = `${window.location.origin}/shared-order/${orderId}`
    setShareLink(shareLink)
    setShowShareModal(true)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    alert("Link copied to clipboard!")
  }

  const handleDirectShare = (platform) => {
    const shareLink = `${window.location.origin}/shared-order/${orderId}`
    let shareUrl = ""

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareLink)}`
        break
      // Add more cases for other platforms as needed
      default:
        shareUrl = shareLink
    }

    window.open(shareUrl, "_blank")
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
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
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
        <div className="d-flex gap-2">
          <Link to={`/orders/${orderId}/edit`} className="btn" style={{ backgroundColor: "#d33131", color: "white" }}>
            <FaEdit className="me-2" /> Edit Order
          </Link>
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
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-share">
              <FaShare className="me-2" /> Share
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleShare}>
                <FaShare className="me-2" /> Copy Link
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDirectShare("whatsapp")}>
                <FaWhatsapp className="me-2" /> Share on WhatsApp
              </Dropdown.Item>
              {/* Add more direct share options here */}
            </Dropdown.Menu>
          </Dropdown>
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
      {renderItemsTable(order.generalItems, "General Items", ["Kg/Bundle(கட்டு)", "Grams"])}

      {/* Rice and Pulses */}
      {renderItemsTable(order.riceAndPulses, "Rice and Pulses", ["Kg", "Grams"])}

      {/* Essence and Color */}
      {renderItemsTable(order.essenceAndColor?.essences, "Essence Types", ["ML"])}
      {renderItemsTable(order.essenceAndColor?.colorPowders, "Color Powder Types", ["Pockets"])}

      {/* Oils and Flours */}
      {renderItemsTable(order.oilsAndFlours?.oils, "Oil Types", ["Kg", "Liters", "ml", "Count", "Grams"])}
      {renderItemsTable(order.oilsAndFlours?.flours, "Flour Types", ["Kg"])}

      {/* Masala Items */}
      {renderItemsTable(order.masala, "Masala Items", ["Kg", "Grams"])}

      {/* Sauce and Supplies */}
      {renderItemsTable(order.sauceAndSupplies, "Sauce and Supplies", ["Quantity/Liters/Meter"])}

      {/* Fruits */}
      {renderItemsTable(order.fruits, "Fruits", ["Measurement"])}

      {/* Vegetables */}
      {renderItemsTable(order.vegetables, "Vegetables", ["Measurement"])}

      {/* Small Grains */}
      {renderItemsTable(order.smallGrains, "Small Grains", ["Kg"])}

      {/* Utensils */}
      {renderItemsTable(order.utensils, "Utensils", ["Count"])}

      {/* Idli Batter */}
      {renderItemsTable(order.idliBatter, "Idli Batter", ["Count"])}

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#d33131", color: "white" }}>
          <Modal.Title>Share Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Share this link to view the order details:</p>
          <div className="input-group mb-3">
            <input type="text" className="form-control" value={shareLink} readOnly />
            <button className="btn btn-outline-secondary" type="button" onClick={handleCopyLink}>
              Copy
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowShareModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OrderDetails

