"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const RiceAndPulsesForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    // Pulses Section
    {
      id: 1,
      category: "பருப்பு வகைகள்",
      categoryEnglish: "Types of Pulses",
      items: [
        { id: "p1", tamilName: "துவரம் பருப்பு", englishName: "Toor Dal", kg: "", grams: "" },
        { id: "p2", tamilName: "பயித்தம் பருப்பு", englishName: "Green Gram Dal", kg: "", grams: "" },
        { id: "p3", tamilName: "கடலைப் பருப்பு", englishName: "Bengal Gram Dal", kg: "", grams: "" },
        { id: "p4", tamilName: "பாம்பே கடலை பருப்பு(அரைப்பு)", englishName: "Bombay Bengal Gram Dal", kg: "", grams: "" },
        { id: "p5", tamilName: "பட்டாணிப் பருப்பு", englishName: "Yellow Peas Dal", kg: "", grams: "" },
        { id: "p6", tamilName: "வெள்ளைக் குண்டு உளுந்து", englishName: "White Urad Dal Whole", kg: "", grams: "" },
      ],
    },
    // Rice Section
    {
      id: 2,
      category: "அரிசி வகைகள்",
      categoryEnglish: "Types of Rice",
      items: [
        { id: "r1", tamilName: "பொன்னி சாப்பாடு புழுங்கல்", englishName: "Ponni Boiled Rice", kg: "" },
        { id: "r2", tamilName: "பொன்னி பச்சை அரிசி", englishName: "Ponni Raw Rice", kg: "" },
        { id: "r3", tamilName: "இட்லி குண்டு அரிசி", englishName: "Idli Rice", kg: "" },
        { id: "r4", tamilName: "சீரக சம்பா அரிசி", englishName: "Seeraga Samba Rice", kg: "" },
        { id: "r5", tamilName: "பாஸ்மதி அரிசி", englishName: "Basmati Rice", kg: "" },
        { id: "r6", tamilName: "ராயல் புல்லட்டு அரிசி", englishName: "Royal Bullet Rice", kg: "" },
        { id: "r7", tamilName: "உடைத்த அரிசி நெய்", englishName: "Broken Rice", kg: "" },
      ],
    },
  ])

  useEffect(() => {
    if (initialData) {
      setItems((prevItems) =>
        prevItems.map((category) => ({
          ...category,
          items: category.items.map((item) => {
            const matchingItem = initialData.find((dataItem) => dataItem.id === item.id)
            return matchingItem ? { ...item, ...matchingItem } : item
          }),
        })),
      )
    }
  }, [initialData])

  const handleInputChange = (categoryId, itemId, field, value) => {
    setItems(
      items.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                // For rice items, only update the kg field
                if (category.category === "அரிசி வகைகள்") {
                  return { ...item, kg: value }
                }
                // For pulse items, update both kg and grams fields
                return { ...item, [field]: value }
              }
              return item
            }),
          }
        }
        return category
      }),
    )
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return items.flatMap((category) => category.items.filter((item) => item.kg || item.grams))
    },
  }))

  return (
    <div className="container mb-4">
      {items.map((category) => (
        <div key={category.id} className="card shadow-sm mb-4">
          <div className="card-header" style={{ backgroundColor: "#d33131", color: "white" }}>
            <h3 className="card-title mb-0">
              <span className="tamil-text">{category.category}</span>
              <span className="english-text"> / {category.categoryEnglish}</span>
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
                    {category.category !== "அரிசி வகைகள்" && (
                      <th className="measurement-header">
                        <span className="tamil-text">கிராம்</span>
                        <span className="english-text"> / Grams</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item) => (
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
                          onChange={(e) => handleInputChange(category.id, item.id, "kg", e.target.value)}
                          placeholder="Kg"
                        />
                      </td>
                      {category.category !== "அரிசி வகைகள்" && (
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            min="0"
                            value={item.grams}
                            onChange={(e) => handleInputChange(category.id, item.id, "grams", e.target.value)}
                            placeholder="Grams"
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

RiceAndPulsesForm.displayName = "RiceAndPulsesForm"

export default RiceAndPulsesForm

