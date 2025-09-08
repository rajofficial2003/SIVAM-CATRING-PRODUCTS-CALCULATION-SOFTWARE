"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { FaDownload, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"
import jsPDF from "jspdf"
import "jspdf-autotable"
import html2canvas from "html2canvas"
import { Modal, ProgressBar, Alert } from "react-bootstrap"
import Header from "../components/Header"
import Footer from "../components/Footer"

const pdfStyles = `
  @media print {
    .table-bordered,
    .table-bordered th,
    .table-bordered td {
      border: 1px solid black !important;
    }
  }
`

const SharedOrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [pdfProgress, setPdfProgress] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState("")
  const [verificationResults, setVerificationResults] = useState(null)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationPassed, setVerificationPassed] = useState(false)

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
    // Always render table structure even if no items
    const tableItems = items && items.length > 0 ? items : []
    const hasData = tableItems.length > 0

    return (
      <div
        className="card shadow-sm mb-5 pdf-table"
        data-table-title={title}
        data-items-count={tableItems.length}
        data-has-data={hasData}
      >
        <div className="card-header text-center" style={{ backgroundColor: "#3d9565", color: "white" }}>
          <h3 className="card-title mb-0">{title}</h3>
        </div>
        <div className="card-body p-3">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0 text-center" style={{ border: "1px solid black" }}>
              <thead className="sticky-top" style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="align-middle text-start" style={{ border: "1px solid black" }}>
                    <span className="tamil-text">பொருட்கள்</span>
                    <span className="english-text"> / Items</span>
                  </th>
                  {columns.map((col, index) => (
                    <th key={index} className="align-middle" style={{ border: "1px solid black" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hasData ? (
                  tableItems.map((item, index) => (
                    <tr key={index} data-row-index={index}>
                      <td className="text-start align-middle" style={{ border: "1px solid black" }}>
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
                          <td key={colIndex} className="align-middle" style={{ border: "1px solid black" }}>
                            {value}
                          </td>
                        )
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="text-center align-middle text-muted"
                      style={{ border: "1px solid black", padding: "20px" }}
                    >
                      No items in this category
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Comprehensive verification function
  const verifyAllTableData = async () => {
    setVerificationStatus("Starting comprehensive data verification...")
    const results = {
      totalTables: 0,
      totalExpectedRows: 0,
      totalRenderedRows: 0,
      emptyTables: 0,
      tableDetails: [],
      issues: [],
      isValid: true,
    }

    try {
      const content = document.getElementById("pdf-content")
      const tables = content.querySelectorAll(".pdf-table")
      results.totalTables = tables.length

      setVerificationStatus(`Verifying ${results.totalTables} tables...`)

      for (let i = 0; i < tables.length; i++) {
        const table = tables[i]
        const tableTitle = table.getAttribute("data-table-title") || `Table ${i + 1}`
        const expectedItemsCount = Number.parseInt(table.getAttribute("data-items-count")) || 0
        const hasData = table.getAttribute("data-has-data") === "true"
        const renderedRows = table.querySelectorAll("tbody tr")
        const actualRowsCount = renderedRows.length

        const tableDetail = {
          title: tableTitle,
          expectedRows: expectedItemsCount,
          renderedRows: actualRowsCount,
          hasData: hasData,
          isEmpty: !hasData,
          isComplete: hasData ? expectedItemsCount === actualRowsCount : true, // Empty tables are considered complete
          hasVisibleContent: table.offsetHeight > 0 && table.offsetWidth > 0,
        }

        if (!hasData) {
          results.emptyTables++
        }

        // Check if all rows have proper content (skip for empty tables)
        let emptyRowsCount = 0
        if (hasData) {
          renderedRows.forEach((row, rowIndex) => {
            const cells = row.querySelectorAll("td")
            let hasContent = false
            cells.forEach((cell) => {
              if (
                cell.textContent.trim() &&
                cell.textContent.trim() !== "-" &&
                cell.textContent.trim() !== "No items in this category"
              ) {
                hasContent = true
              }
            })
            if (!hasContent) {
              emptyRowsCount++
            }
          })
        }

        tableDetail.emptyRows = emptyRowsCount
        tableDetail.contentRows = actualRowsCount - emptyRowsCount

        results.totalExpectedRows += expectedItemsCount
        results.totalRenderedRows += actualRowsCount

        if (hasData && !tableDetail.isComplete) {
          results.issues.push(`${tableTitle}: Expected ${expectedItemsCount} rows, found ${actualRowsCount}`)
          results.isValid = false
        }

        if (!tableDetail.hasVisibleContent) {
          results.issues.push(`${tableTitle}: Table content is not properly rendered`)
          results.isValid = false
        }

        if (hasData && emptyRowsCount > 0) {
          results.issues.push(`${tableTitle}: Found ${emptyRowsCount} empty rows`)
        }

        results.tableDetails.push(tableDetail)
        setVerificationStatus(
          `Verified ${tableTitle} - ${hasData ? `${actualRowsCount}/${expectedItemsCount} rows` : "Empty table"}`,
        )
      }

      setVerificationStatus(
        results.isValid
          ? `✅ Verification passed! ${results.totalTables} tables (${results.emptyTables} empty) with ${results.totalRenderedRows} total rows are ready`
          : `❌ Verification failed! Found ${results.issues.length} issues`,
      )

      return results
    } catch (error) {
      results.isValid = false
      results.issues.push(`Verification error: ${error.message}`)
      setVerificationStatus(`❌ Verification failed: ${error.message}`)
      return results
    }
  }

  // Handle verification before PDF generation
  const handleVerifyAndDownload = async () => {
    setShowVerificationModal(true)
    setVerificationPassed(false)
    setVerificationStatus("Initializing verification...")

    try {
      // Wait for content to fully render
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const results = await verifyAllTableData()
      setVerificationResults(results)

      if (results.isValid) {
        setVerificationPassed(true)
        setVerificationStatus("✅ All data verified successfully! Ready to generate PDF.")
      } else {
        setVerificationPassed(false)
        setVerificationStatus("❌ Data verification failed. Please check the issues below.")
      }
    } catch (error) {
      setVerificationPassed(false)
      setVerificationStatus(`❌ Verification error: ${error.message}`)
    }
  }

  // Proceed with PDF generation after verification
  const proceedWithPDFGeneration = async () => {
    setShowVerificationModal(false)
    await generatePDF()
  }

  // Calculate element height in PDF coordinates
  const calculateElementPDFHeight = (element, pdfWidth, margins) => {
    if (!element) return 0
    const elementWidth = element.offsetWidth || 800
    const elementHeight = element.offsetHeight || 0
    const scaleFactor = (pdfWidth - 2 * margins) / elementWidth
    return elementHeight * scaleFactor
  }

  // Check available space on current page
  const getAvailableSpace = (pdfHeight, currentYOffset, margins) => {
    return pdfHeight - currentYOffset - margins - 60 // 60pt buffer for page numbers
  }

  // Smart space utilization - try to fit smaller elements in remaining space
  const canFitInRemainingSpace = (element, pdfWidth, pdfHeight, margins, currentYOffset) => {
    const elementHeight = calculateElementPDFHeight(element, pdfWidth, margins)
    const availableSpace = getAvailableSpace(pdfHeight, currentYOffset, margins)
    return elementHeight <= availableSpace
  }

  const generatePDF = async () => {
    setGenerating(true)
    setShowPdfModal(true)
    setPdfProgress(0)
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

      // Add Header
      const headerElement = document.querySelector("header")
      if (headerElement) {
        yOffset = await addElementToPDF(headerElement, pdf, pdfWidth, pdfHeight, margins, yOffset)
        yOffset += 10
      }

      // Add customer details
      const customerCard = content.querySelector(".card:not(.pdf-table)")
      if (customerCard) {
        // Check if customer card fits in remaining space
        if (!canFitInRemainingSpace(customerCard, pdfWidth, pdfHeight, margins, yOffset)) {
          pdf.addPage()
          yOffset = margins
        }
        yOffset = await addElementToPDF(customerCard, pdf, pdfWidth, pdfHeight, margins, yOffset)
        yOffset += 5
      }
      setPdfProgress(10)

      // Get all tables (including empty ones)
      const tables = content.querySelectorAll(".pdf-table")
      const totalTables = tables.length
      const progressPerTable = 80 / totalTables

      // Process each table with smart space utilization
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i]
        const tableTitle = table.getAttribute("data-table-title") || `Table ${i + 1}`
        const hasData = table.getAttribute("data-has-data") === "true"

        // Process table with optimized spacing
        yOffset = await processTableWithOptimizedSpacing(
          table,
          pdf,
          pdfWidth,
          pdfHeight,
          margins,
          yOffset,
          tableTitle,
          hasData,
        )

        // Add minimal spacing only if there's reasonable space left
        const remainingSpace = getAvailableSpace(pdfHeight, yOffset, margins)
        if (remainingSpace > 100) {
          yOffset += 5 // Minimal spacing between tables
        }

        // Update progress
        setPdfProgress((prevProgress) => prevProgress + progressPerTable)
      }

      // Add Footer with smart positioning
      const footerElement = document.querySelector("footer")
      if (footerElement) {
        const footerHeight = 80
        if (!canFitInRemainingSpace(footerElement, pdfWidth, pdfHeight, margins, yOffset)) {
          pdf.addPage()
          yOffset = margins
        }

        const footerCanvas = await html2canvas(footerElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#ffffff",
        })
        const footerImgData = footerCanvas.toDataURL("image/jpeg", 0.8)

        const footerWidth = pdfWidth - 2 * margins
        const footerImgHeight = (footerCanvas.height * footerWidth) / footerCanvas.width

        pdf.addImage(footerImgData, "JPEG", margins, yOffset, footerWidth, footerImgHeight)
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

      setPdfProgress(100)
      setTimeout(() => {
        pdf.save(`Order_${order.id}.pdf`)
        setShowPdfModal(false)
      }, 1000)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("An error occurred while generating the PDF. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  // Process table with optimized spacing to minimize empty spaces and prevent header duplication
  const processTableWithOptimizedSpacing = async (
    table,
    pdf,
    pdfWidth,
    pdfHeight,
    margins,
    yOffset,
    tableTitle,
    hasData,
  ) => {
    try {
      // Ensure table is visible
      table.scrollIntoView({ behavior: "instant", block: "start" })
      await new Promise((resolve) => setTimeout(resolve, 200))

      const header = table.querySelector(".card-header")
      const tableContent = table.querySelector(".table-responsive")
      const thead = tableContent.querySelector("thead")
      const tbody = tableContent.querySelector("tbody")
      const rows = tbody.querySelectorAll("tr")

      let isFirstPageOfTable = true // Track if we're on the first page of this table

      // Add table header ONLY ONCE at the beginning of the table
      if (header) {
        if (!canFitInRemainingSpace(header, pdfWidth, pdfHeight, margins, yOffset)) {
          pdf.addPage()
          yOffset = margins
        }
        yOffset = await addElementToPDFEnhanced(
          header,
          pdf,
          pdfWidth,
          pdfHeight,
          margins,
          yOffset,
          `${tableTitle} Header`,
        )
        isFirstPageOfTable = true // We just added the main header
      }

      // Add column headers
      if (thead) {
        if (!canFitInRemainingSpace(thead, pdfWidth, pdfHeight, margins, yOffset)) {
          pdf.addPage()
          yOffset = margins
          isFirstPageOfTable = false // Now we're on a continuation page
          // DO NOT re-add the main table header here - only column headers
        }
        yOffset = await addElementToPDFEnhanced(
          thead,
          pdf,
          pdfWidth,
          pdfHeight,
          margins,
          yOffset,
          `${tableTitle} Column Headers`,
        )
      }

      // Process rows with smart batching
      let rowBatch = []
      const maxRowsPerBatch = 10

      for (let j = 0; j < rows.length; j++) {
        const row = rows[j]
        rowBatch.push(row)

        // Check if we should process current batch
        const shouldProcessBatch =
          rowBatch.length >= maxRowsPerBatch ||
          j === rows.length - 1 ||
          !canFitInRemainingSpace(row, pdfWidth, pdfHeight, margins, yOffset)

        if (shouldProcessBatch) {
          // Check if batch fits on current page
          const batchHeight = rowBatch.length * 25 // Estimated row height
          if (getAvailableSpace(pdfHeight, yOffset, margins) < batchHeight) {
            pdf.addPage()
            yOffset = margins
            isFirstPageOfTable = false // Now we're on a continuation page

            // ONLY re-add column headers on continuation pages, NOT the main table header
            if (thead) {
              yOffset = await addElementToPDFEnhanced(
                thead,
                pdf,
                pdfWidth,
                pdfHeight,
                margins,
                yOffset,
                `${tableTitle} Column Headers (Continued)`,
              )
            }
          }

          // Process each row in the batch
          for (const batchRow of rowBatch) {
            batchRow.scrollIntoView({ behavior: "instant", block: "nearest" })
            await new Promise((resolve) => setTimeout(resolve, 30))

            yOffset = await addElementToPDFEnhanced(
              batchRow,
              pdf,
              pdfWidth,
              pdfHeight,
              margins,
              yOffset,
              `${tableTitle} Row`,
            )
          }

          // Reset batch
          rowBatch = []
        }
      }

      return yOffset
    } catch (error) {
      console.error(`Error processing table ${tableTitle}:`, error)
      return yOffset + 50
    }
  }

  // Enhanced helper function with better error handling and data capture
  const addElementToPDFEnhanced = async (
    element,
    pdf,
    pdfWidth,
    pdfHeight,
    margins,
    yOffset,
    elementName = "Element",
  ) => {
    try {
      // Ensure element is fully loaded and visible
      if (!element || element.offsetHeight === 0) {
        console.warn(`${elementName} is not visible or has no height`)
        return yOffset
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
        windowWidth: Math.max(document.documentElement.clientWidth, 1024),
        onclone: (clonedDoc) => {
          // Ensure all content is visible in the cloned document
          const clonedElement = clonedDoc.querySelector(`[data-row-index="${element.getAttribute("data-row-index")}"]`)
          if (clonedElement) {
            clonedElement.style.visibility = "visible"
            clonedElement.style.display = "table-row"
          }
        },
      })

      const imgData = canvas.toDataURL("image/jpeg", 0.8)
      const imgWidth = pdfWidth - 2 * margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Validate captured content
      if (imgHeight < 10) {
        console.warn(`${elementName} captured with very small height: ${imgHeight}`)
      }

      // Center the image horizontally
      const xOffset = (pdfWidth - imgWidth) / 2
      pdf.addImage(imgData, "JPEG", xOffset, yOffset, imgWidth, imgHeight, "", "FAST")

      return yOffset + imgHeight
    } catch (error) {
      console.error(`Error adding ${elementName} to PDF:`, error)
      return yOffset + 20 // Return with minimal offset to continue
    }
  }

  // Original helper function for backward compatibility
  const addElementToPDF = async (element, pdf, pdfWidth, pdfHeight, margins, yOffset) => {
    return addElementToPDFEnhanced(element, pdf, pdfWidth, pdfHeight, margins, yOffset)
  }

  useEffect(() => {
    // Add the styles to the document
    const styleElement = document.createElement("style")
    styleElement.innerHTML = pdfStyles
    document.head.appendChild(styleElement)

    return () => {
      // Clean up
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" style={{ color: "#3d9565" }} role="status">
          <span className="visually-hidden">Loading order details...</span>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mt-5">
        <div className="alert" style={{ backgroundColor: "#3d9565", color: "white" }} role="alert">
          Order not found.
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div key="header" className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <h1 style={{ color: "black", margin: 0 }}>Shared Order Details</h1>
          <div className="d-flex gap-2">
            <button
              onClick={handleVerifyAndDownload}
              className="btn"
              style={{ backgroundColor: "#3d9565", color: "white" }}
              disabled={generating}
            >
              <FaDownload className="me-2" /> Verify & Download PDF
            </button>
          </div>
        </div>

        <div id="pdf-content">
          {/* Customer Details */}
          <div className="card shadow-sm mb-5">
            <div className="card-header text-center" style={{ backgroundColor: "#3d9565", color: "white" }}>
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

        {/* Data Verification Modal */}
        <Modal show={showVerificationModal} centered backdrop="static" keyboard={false} size="lg">
          <Modal.Header style={{ backgroundColor: "#3d9565", color: "white" }}>
            <Modal.Title>
              <FaCheckCircle className="me-2" />
              Data Verification
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <p className="mb-2">Verifying all table data before PDF generation...</p>
              <small className="text-muted">{verificationStatus}</small>
            </div>

            {verificationResults && (
              <div className="mt-3">
                <Alert variant={verificationPassed ? "success" : "warning"}>
                  <div className="d-flex align-items-center mb-2">
                    {verificationPassed ? (
                      <FaCheckCircle className="text-success me-2" />
                    ) : (
                      <FaExclamationTriangle className="text-warning me-2" />
                    )}
                    <strong>{verificationPassed ? "Verification Passed!" : "Verification Issues Found"}</strong>
                  </div>
                  <div className="small">
                    <p className="mb-1">
                      <strong>Total Tables:</strong> {verificationResults.totalTables}
                    </p>
                    <p className="mb-1">
                      <strong>Empty Tables:</strong> {verificationResults.emptyTables}
                    </p>
                    <p className="mb-1">
                      <strong>Total Rows:</strong> {verificationResults.totalRenderedRows} /{" "}
                      {verificationResults.totalExpectedRows}
                    </p>
                  </div>
                </Alert>

                {verificationResults.tableDetails.length > 0 && (
                  <div className="mt-3">
                    <h6>Table Details:</h6>
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {verificationResults.tableDetails.map((table, index) => (
                        <div key={index} className="small border-bottom py-1">
                          <strong>{table.title}:</strong>
                          {table.isEmpty ? (
                            <span className="text-info"> Empty table</span>
                          ) : (
                            <>
                              {table.renderedRows}/{table.expectedRows} rows
                              {table.emptyRows > 0 && <span className="text-warning"> ({table.emptyRows} empty)</span>}
                              {!table.isComplete && <span className="text-danger"> ⚠️ Incomplete</span>}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {verificationResults.issues.length > 0 && (
                  <div className="mt-3">
                    <h6 className="text-warning">Issues Found:</h6>
                    <ul className="small text-danger">
                      {verificationResults.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={() => setShowVerificationModal(false)}
              disabled={!verificationResults}
            >
              Cancel
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "#3d9565", color: "white" }}
              onClick={proceedWithPDFGeneration}
              disabled={!verificationPassed}
            >
              {verificationPassed ? "Generate PDF" : "Fix Issues First"}
            </button>
          </Modal.Footer>
        </Modal>

        {/* PDF Generation Modal */}
        <Modal show={showPdfModal} centered backdrop="static" keyboard={false}>
          <Modal.Header style={{ backgroundColor: "#3d9565", color: "white" }}>
            <Modal.Title>Generating PDF</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please wait while we generate your optimized PDF...</p>
            <ProgressBar animated now={pdfProgress} label={`${Math.round(pdfProgress)}%`} />
            <small className="text-muted mt-2 d-block">
              Preventing header duplication and optimizing space utilization...
            </small>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </>
  )
}

export default SharedOrderDetails
