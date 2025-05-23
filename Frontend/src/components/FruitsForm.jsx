"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const FruitsForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "மாம்பழம்", englishName: "Mango", kg: "" },
    { id: 2, tamilName: "பலாப்பழம்", englishName: "Jackfruit", quantity: "" },
    { id: 3, tamilName: "வாழைப்பழம் (மஞ்சள்)", englishName: "Banana (Yellow)", kg: "" },
    { id: 4, tamilName: "பச்சை வாழைப்பழம்", englishName: "Green Banana", kg: "" },
    { id: 5, tamilName: "கற்பூர வாழைப்பழம்", englishName: "Karpooravalli Banana", kg: "" },
    { id: 6, tamilName: "அன்னாச்சி பழம்", englishName: "Pineapple", quantity: "" },
    { id: 7, tamilName: "ஆப்பிள் பழம்", englishName: "Apple", kg: "" },
    { id: 8, tamilName: "தர்பூசணி பழம்", englishName: "Watermelon", kg: "" },
    { id: 9, tamilName: "பப்பாளி பழம்", englishName: "Papaya", kg: "" },
    { id: 10, tamilName: "மாதுளம் பழம்", englishName: "Pomegranate", kg: "" },
    { id: 11, tamilName: "சீட்லெஸ் திராட்சை", englishName: "Seedless Grapes", kg: "" },
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

  const handleInputChange = (id, value, field) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return items.filter((item) => item.kg || item.quantity)
    },
  }))

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header" style={{ backgroundColor: "#3d9565", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">பழ வகைகள்</span>
            <span className="english-text"> / Fruit Types</span>
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
                    <span className="tamil-text">அளவு</span>
                    <span className="english-text"> / Measurement</span>
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
                        value={item.id === 2 || item.id === 6 ? item.quantity : item.kg}
                        onChange={(e) =>
                          handleInputChange(item.id, e.target.value, item.id === 2 || item.id === 6 ? "quantity" : "kg")
                        }
                        placeholder={item.id === 2 || item.id === 6 ? "Quantity" : "Kg"}
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

FruitsForm.displayName = "FruitsForm"

export default FruitsForm

