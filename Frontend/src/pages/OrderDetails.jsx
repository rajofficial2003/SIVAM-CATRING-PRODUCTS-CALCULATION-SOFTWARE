"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { FaEdit, FaArrowLeft, FaDownload, FaShare, FaWhatsapp } from "react-icons/fa"
import jsPDF from "jspdf"
import "jspdf-autotable"
import { Modal, Button, Dropdown } from "react-bootstrap"
import html2canvas from "html2canvas"

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
      <div className="card shadow-sm mb-5 pdf-table">
        <div className="card-header text-center" style={{ backgroundColor: "#d33131", color: "white" }}>
          <h3 className="card-title mb-0">{title}</h3>
        </div>
        <div className="card-body p-3">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0 text-center">
              <thead className="sticky-top" style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="align-middle text-start">
                    <span className="tamil-text">பொருட்கள்</span>
                    <span className="english-text"> / Items</span>
                  </th>
                  {columns.map((col, index) => (
                    <th key={index} className="align-middle">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="text-start align-middle">
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
                          value = `${item.quantity} (Quantity)`
                        } else {
                          value = `${item.kg} (Kg)`
                        }
                      } else {
                        value = item[key] || "-"
                      }
                      return (
                        <td key={colIndex} className="align-middle">
                          {value}
                        </td>
                      )
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
      const content = document.getElementById("pdf-content")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const margins = 40
      let yOffset = margins

      // Add customer details first
      const customerCard = content.querySelector(".card:not(.pdf-table)")
      yOffset = await addElementToPDF(customerCard, pdf, pdfWidth, pdfHeight, margins, yOffset)
      yOffset += 10 // Small space after customer details

      // Get all tables
      const tables = content.querySelectorAll(".pdf-table")

      // Process each table
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i]

        // Get the table header (card-header)
        const header = table.querySelector(".card-header")
        const tableContent = table.querySelector(".table-responsive")

        // Add the table header
        yOffset = await addElementToPDF(header, pdf, pdfWidth, pdfHeight, margins, yOffset)
        yOffset += 5 // Small space after header

        // Get the rows of the table
        const rows = tableContent.querySelectorAll("tbody tr")
        const thead = tableContent.querySelector("thead")

        // Add the column headers
        yOffset = await addElementToPDF(thead, pdf, pdfWidth, pdfHeight, margins, yOffset)
        yOffset += 5 // Small space after column headers

        // Process each row
        for (let j = 0; j < rows.length; j++) {
          // Check if we need a new page
          if (yOffset > pdfHeight - margins) {
            pdf.addPage()
            yOffset = margins
            // Add the table header and column headers again on the new page
            yOffset = await addElementToPDF(header, pdf, pdfWidth, pdfHeight, margins, yOffset)
            yOffset += 5
            yOffset = await addElementToPDF(thead, pdf, pdfWidth, pdfHeight, margins, yOffset)
            yOffset += 5
          }

          // Add the row
          yOffset = await addElementToPDF(rows[j], pdf, pdfWidth, pdfHeight, margins, yOffset)
        }

        // Add a small space after the table
        yOffset += 10
      }

      // Add page numbers
      const pageCount = pdf.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(10)
        pdf.setTextColor(150)
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pdf.internal.pageSize.getWidth() / 2,
          pdf.internal.pageSize.getHeight() - 30,
          { align: "center" },
        )
      }

      pdf.save(`Order_${order.id}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("An error occurred while generating the PDF. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  // Helper function to add an element to the PDF
  const addElementToPDF = async (element, pdf, pdfWidth, pdfHeight, margins, yOffset) => {
    try {
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        allowTaint: true,
      })
      const imgData = canvas.toDataURL("image/jpeg", 0.7)
      const imgWidth = pdfWidth - 2 * margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Check if the element fits on the current page
      if (yOffset + imgHeight > pdfHeight - margins) {
        pdf.addPage()
        yOffset = margins
      }

      // Center the image horizontally
      const xOffset = (pdfWidth - imgWidth) / 2
      pdf.addImage(imgData, "JPEG", xOffset, yOffset, imgWidth, imgHeight, "", "FAST")

      return yOffset + imgHeight
    } catch (error) {
      console.error("Error adding element to PDF:", error)
      return yOffset
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

      <div id="pdf-content">
        {/* Customer Details */}
        <div className="card shadow-sm mb-5">
          <div className="card-header text-center" style={{ backgroundColor: "#d33131", color: "white" }}>
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
      </div>

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

