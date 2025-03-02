"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const SmallGrainsForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "சாம", englishName: "Little Millet", kg: "" },
    { id: 2, tamilName: "குதர வாலி", englishName: "Barnyard Millet", kg: "" },
    { id: 3, tamilName: "வரகு", englishName: "Kodo Millet", kg: "" },
    { id: 4, tamilName: "தினை", englishName: "Foxtail Millet", kg: "" },
    { id: 5, tamilName: "கம்பு", englishName: "Pearl Millet", kg: "" },
    { id: 6, tamilName: "கேழ்வரகு", englishName: "Finger Millet", kg: "" },
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

  const handleInputChange = (id, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, kg: value } : item)))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return items.filter((item) => item.kg)
    },
  }))

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header" style={{ backgroundColor: "#d33131", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">சிறு தானியம்</span>
            <span className="english-text"> / Small Grains</span>
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
                    <span className="tamil-text">கிலோ</span>
                    <span className="english-text"> / Kg</span>
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
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="Kg"
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

SmallGrainsForm.displayName = "SmallGrainsForm"

export default SmallGrainsForm

