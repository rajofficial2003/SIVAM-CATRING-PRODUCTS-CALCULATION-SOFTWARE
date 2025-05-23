"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

const PoojaItemsForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "மஞ்சள் தூள்", englishName: "Turmeric Powder", rs: "" },
    { id: 2, tamilName: "குங்குமம்", englishName: "Kumkum", rs: "" },
    { id: 3, tamilName: "கற்பூரம், வத்தி", englishName: "Camphor, Wicks", rs: "" },
    { id: 4, tamilName: "வெற்றிலைபாக்கு", englishName: "Betel Leaves & Nuts", rs: "" },
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
      return items.filter((item) => item.rs)
    },
  }))

  return (
    <div className="pooja-items-form py-4">
      <div className="container">
        <form>
          <div className="card shadow-sm">
            <div className="card-header" style={{ backgroundColor: "#3d9565", color: "white" }}>
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
                        <span className="tamil-text">ரூபாய்</span>
                        <span className="english-text"> / Rs</span>
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
                            value={item.rs}
                            onChange={(e) => handleInputChange(item.id, "rs", e.target.value)}
                            placeholder="Rs"
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