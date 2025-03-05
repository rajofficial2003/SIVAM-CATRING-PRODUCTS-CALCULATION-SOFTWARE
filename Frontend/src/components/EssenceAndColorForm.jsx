"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const EssenceAndColorForm = forwardRef(({ initialData }, ref) => {
  const [essenceItems, setEssenceItems] = useState([
    { id: 1, tamilName: "பைனாப்பிள் எஸ்சென்ஸ்", englishName: "Pineapple Essence", ml: "" },
    { id: 2, tamilName: "ரோஸ் எஸ்சென்ஸ்", englishName: "Rose Essence", ml: "" },
    { id: 3, tamilName: "வெண்ணிலா எஸ்சென்ஸ்", englishName: "Vanilla Essence", ml: "" },
    { id: 4, tamilName: "ஏலக்காய் எஸ்சென்ஸ்", englishName: "Cardamom Essence", ml: "" },
  ])

  const [colorPowderItems, setColorPowderItems] = useState([
    { id: 1, tamilName: "கேசரி பவுடர்", englishName: "Kesari Powder", pockets: "" },
    { id: 2, tamilName: "ஆரஞ்சி பவுடர்", englishName: "Orange Powder", pockets: "" },
    { id: 3, tamilName: "லெமன் பவுடர்", englishName: "Lemon Powder", pockets: "" },
    { id: 4, tamilName: "பச்சை பவுடர்", englishName: "Green Powder", pockets: "" },
    { id: 5, tamilName: "சாக்லேட் பவுடர்", englishName: "Chocolate Powder", pockets: "" },
  ])

  useEffect(() => {
    if (initialData && initialData.essences) {
      setEssenceItems((prevItems) =>
        prevItems.map((item) => {
          const matchingItem = initialData.essences.find((dataItem) => dataItem.id === item.id)
          return matchingItem ? { ...item, ...matchingItem } : item
        }),
      )
    }
    if (initialData && initialData.colorPowders) {
      setColorPowderItems((prevItems) =>
        prevItems.map((item) => {
          const matchingItem = initialData.colorPowders.find((dataItem) => dataItem.id === item.id)
          return matchingItem ? { ...item, ...matchingItem } : item
        }),
      )
    }
  }, [initialData])

  const handleEssenceInputChange = (id, value) => {
    setEssenceItems(essenceItems.map((item) => (item.id === id ? { ...item, ml: value } : item)))
  }

  const handleColorPowderInputChange = (id, value) => {
    setColorPowderItems(colorPowderItems.map((item) => (item.id === id ? { ...item, pockets: value } : item)))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return {
        essences: essenceItems.filter((item) => item.ml),
        colorPowders: colorPowderItems.filter((item) => item.pockets),
      }
    },
  }))

  return (
    <div className="container mb-4">
      {/* Essence Types Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-header" style={{ backgroundColor: "#3d9565", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">எஸ்சென்ஸ் வகைகள்</span>
            <span className="english-text"> / Essence Types</span>
          </h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
              <thead className="sticky-top" style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="item-name-header">
                    <span className="tamil-text">பொருட்கள்</span>
                    <span className="english-text"> / Items</span>
                  </th>
                  <th className="measurement-header">
                    <span className="tamil-text">மில்லி</span>
                    <span className="english-text"> / ml</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {essenceItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <label className="form-label mb-0">
                        <span className="tamil-text">{item.tamilName}</span>
                        <span className="english-text"> / {item.englishName}</span>
                      </label>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        min="0"
                        value={item.ml}
                        onChange={(e) => handleEssenceInputChange(item.id, e.target.value)}
                        placeholder="ml"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Color Powder Types Section */}
      <div className="card shadow-sm">
        <div className="card-header" style={{ backgroundColor: "#3d9565", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">கலர் பவுடர் வகைகள்</span>
            <span className="english-text"> / Color Powder Types</span>
          </h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
              <thead className="sticky-top" style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th className="item-name-header">
                    <span className="tamil-text">பொருட்கள்</span>
                    <span className="english-text"> / Items</span>
                  </th>
                  <th className="measurement-header">
                    <span className="tamil-text">பாக்கெட்டுகள்</span>
                    <span className="english-text"> / Pockets</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {colorPowderItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <label className="form-label mb-0">
                        <span className="tamil-text">{item.tamilName}</span>
                        <span className="english-text"> / {item.englishName}</span>
                      </label>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        min="0"
                        value={item.pockets}
                        onChange={(e) => handleColorPowderInputChange(item.id, e.target.value)}
                        placeholder="Pockets"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
})

EssenceAndColorForm.displayName = "EssenceAndColorForm"

export default EssenceAndColorForm

