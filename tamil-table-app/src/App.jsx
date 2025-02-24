"use client"

import { useState, useEffect } from "react"
import jsPDF from "jspdf"
import "./App.css"

function App() {
  const [fontStatus, setFontStatus] = useState("loading") // 'loading', 'loaded', or 'error'

  useEffect(() => {
    // Load the Tamil font
    const loadFont = async () => {
      try {
        const font = await fetch("/Noto-Sans-Tamil-normal.ttf")
        if (!font.ok) {
          throw new Error("Font file not found")
        }
        const fontBuffer = await font.arrayBuffer()

        const doc = new jsPDF()
        doc.addFileToVFS("Noto-Sans-Tamil-normal.ttf", Buffer.from(fontBuffer).toString("base64"))
        doc.addFont("Noto-Sans-Tamil-normal.ttf", "Noto-Sans-Tamil", "normal")

        setFontStatus("loaded")
      } catch (error) {
        console.error("Error loading font:", error)
        setFontStatus("error")
      }
    }

    loadFont()
  }, [])

  const [tableData] = useState([
    { id: 1, name: "சிக்கன் மசாலா", quantity: "1", gram: "கிராம்", measure: "அளவு" },
    { id: 2, name: "சிக்கன் 65 மசாலா", quantity: "1", gram: "கிராம்", measure: "அளவு" },
    { id: 3, name: "மட்டன் மசாலா", quantity: "1", gram: "கிராம்", measure: "அளவு" },
    { id: 4, name: "சென்னா மசாலா", quantity: "1", gram: "கிராம்", measure: "அளவு" },
  ])

  const downloadPDF = () => {
    if (fontStatus !== "loaded") {
      alert("Font is not loaded. Please try again later.")
      return
    }

    const doc = new jsPDF()

    // Set Tamil font
    doc.setFont("Noto-Sans-Tamil")
    doc.setFontSize(16)

    // Add title
    doc.text("சிவம் கேட்டரிங்", 105, 20, { align: "center" })

    // Set smaller font size for table
    doc.setFontSize(12)

    // Table headers
    const headers = ["பொருட்கள்", "கிலோ", "கிராம்", "அளவு"]

    // Calculate column widths
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const tableWidth = pageWidth - 2 * margin
    const colWidth = tableWidth / 4

    // Draw table
    let y = 40

    // Draw headers with background
    doc.setFillColor(44, 62, 80) // Dark background for headers
    doc.rect(margin, y - 5, tableWidth, 10, "F")
    doc.setTextColor(255, 255, 255) // White text for headers

    headers.forEach((header, i) => {
      doc.text(header, margin + i * colWidth, y)
    })

    // Reset text color for data
    doc.setTextColor(0, 0, 0)

    // Draw table data
    tableData.forEach((row, index) => {
      y = 55 + index * 15

      // Add alternating row background
      if (index % 2 === 0) {
        doc.setFillColor(249, 249, 249)
        doc.rect(margin, y - 5, tableWidth, 10, "F")
      }

      doc.text(row.name, margin, y)
      doc.text(row.quantity, margin + colWidth, y)
      doc.text(row.gram, margin + 2 * colWidth, y)
      doc.text(row.measure, margin + 3 * colWidth, y)
    })

    doc.save("சிவம்_கேட்டரிங்.pdf")
  }

  return (
    <div className="container">
      <h1 className="title">சிவம் கேட்டரிங்</h1>

      <table className="table">
        <thead>
          <tr>
            <th>பொருட்கள்</th>
            <th>கிலோ</th>
            <th>கிராம்</th>
            <th>அளவு</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.quantity}</td>
              <td>{row.gram}</td>
              <td>{row.measure}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={`download-btn ${fontStatus !== "loaded" ? "disabled" : ""}`}
        onClick={downloadPDF}
        disabled={fontStatus !== "loaded"}
      >
        {fontStatus === "loading" && "Loading font..."}
        {fontStatus === "loaded" && "Download PDF"}
        {fontStatus === "error" && "Font loading failed"}
      </button>
    </div>
  )
}

export default App

