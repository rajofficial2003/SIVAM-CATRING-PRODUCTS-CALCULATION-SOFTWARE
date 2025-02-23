"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

const PoojaItemsForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "மஞ்சள் தூள்", englishName: "Turmeric Powder", kg: "", grams: "" },
    { id: 2, tamilName: "குங்குமம்", englishName: "Kumkum", kg: "", grams: "" },
    { id: 3, tamilName: "கற்பூரம், வத்தி", englishName: "Camphor, Wicks", kg: "", grams: "" },
    { id: 4, tamilName: "வெற்றிலைபாக்கு", englishName: "Betel Leaves & Nuts", kg: "", grams: "" },
  ])

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setItems((prevItems) =>
        prevItems.map((item) => {
          const matchingItem = initialData.find((dataItem) => dataItem.id === item.id)
          return matchingItem ? { ...item, ...matchingItem } : item
        }),
      )
    }
  }, [initialData])

  const handleInputChange = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return items.filter((item) => item.kg || item.grams)
    },
  }))

  return (
    <div className="pooja-items-form py-4">
      <div className="container">
        <form>
          <div className="card shadow-sm">
            <div className="card-header" style={{ backgroundColor: "#d33131", color: "white" }}>
              <h3 className="card-title mb-0">
                <span className="tamil-text">பூஜைப் பொருட்கள்</span>
                <span className="english-text"> / Pooja Items</span>
              </h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr style={{ backgroundColor: "#f8f9fa" }}>
                      <th className="item-name-header">
                        <span className="tamil-text">பொருட்கள்</span>
                        <span className="english-text"> / Items</span>
                      </th>
                      <th className="measurement-header">
                        <span className="tamil-text">கிலோ</span>
                        <span className="english-text"> / Kg</span>
                      </th>
                      <th className="measurement-header">
                        <span className="tamil-text">கிராம்</span>
                        <span className="english-text"> / Grams</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
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
                            value={item.kg}
                            onChange={(e) => handleInputChange(item.id, "kg", e.target.value)}
                            placeholder="Kg"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            min="0"
                            value={item.grams}
                            onChange={(e) => handleInputChange(item.id, "grams", e.target.value)}
                            placeholder="Grams"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
})

PoojaItemsForm.displayName = "PoojaItemsForm"

export default PoojaItemsForm

