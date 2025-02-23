"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const UtensilsForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "படி டபரா செட் - 3", englishName: "Padi Dabara Set - 3", count: "" },
    { id: 2, tamilName: "படி டபரா செட் - 5", englishName: "Padi Dabara Set - 5", count: "" },
    { id: 3, tamilName: "படி டபரா செட் - 7", englishName: "Padi Dabara Set - 7", count: "" },
    { id: 4, tamilName: "படி டபரா செட் - 10", englishName: "Padi Dabara Set - 10", count: "" },
    { id: 5, tamilName: "படி டபரா செட் - 12", englishName: "Padi Dabara Set - 12", count: "" },
    { id: 6, tamilName: "படி டபரா செட் - 15", englishName: "Padi Dabara Set - 15", count: "" },
    { id: 7, tamilName: "படி டபரா செட் - 20", englishName: "Padi Dabara Set - 20", count: "" },
    { id: 8, tamilName: "படி டபரா செட் - 25", englishName: "Padi Dabara Set - 25", count: "" },
    { id: 9, tamilName: "மைசூர் பாக் தட்டு", englishName: "Mysore Pak Plate", count: "" },
    { id: 10, tamilName: "இட்லி பானை (200, 150, 100)", englishName: "Idli Pot (200, 150, 100)", count: "" },
    { id: 11, tamilName: "அலுமினிய அன்ன கூடை", englishName: "Aluminum Anna Basket", count: "" },
    { id: 12, tamilName: "அ.மக்கு", englishName: "A.Mug", count: "" },
    { id: 13, tamilName: "சில்வர் அன்ன கூடை", englishName: "Silver Anna Basket", count: "" },
    { id: 14, tamilName: "வாளி -கரண்டி", englishName: "Bucket-Spoon", count: "" },
    { id: 15, tamilName: "கொத்து", englishName: "Kothu", count: "" },
    { id: 16, tamilName: "பேஷன் -அன்ன வெட்டி", englishName: "Fashion Anna Cutter", count: "" },
    { id: 17, tamilName: "தாம்பூலத் தட்டு", englishName: "Thamboolam Plate", count: "" },
    { id: 18, tamilName: "டம்ளர்", englishName: "Tumbler", count: "" },
    { id: 19, tamilName: "டீ கேன்", englishName: "Tea Can", count: "" },
    { id: 20, tamilName: "ஜக்கு", englishName: "Jug", count: "" },
    { id: 21, tamilName: "வானல்", englishName: "Pan", count: "" },
    { id: 22, tamilName: "ஜல்லி", englishName: "Strainer", count: "" },
    { id: 23, tamilName: "துடுப்பு", englishName: "Paddle", count: "" },
    { id: 24, tamilName: "தேங்காய் துருவி", englishName: "Coconut Scraper", count: "" },
    { id: 25, tamilName: "பந்தியாய்", englishName: "Panthiyai", count: "" },
    { id: 26, tamilName: "2 கேஸ் அடுப்பு", englishName: "2 Gas Stove", count: "" },
    { id: 27, tamilName: "1 கேஸ் அடுப்பு", englishName: "1 Gas Stove", count: "" },
    { id: 28, tamilName: "டைனிங் டேபிள்", englishName: "Dining Table", count: "" },
    { id: 29, tamilName: "பிளாஸ்டிக் சேர்", englishName: "Plastic Chair", count: "" },
    { id: 30, tamilName: "பிளாஸ்டிக் தண்ணீர் போல்", englishName: "Plastic Water Bowl", count: "" },
    { id: 31, tamilName: "மூங்கில் கூடை", englishName: "Bamboo Basket", count: "" },
    { id: 32, tamilName: "வடி கூடை", englishName: "Filter Basket", count: "" },
    { id: 33, tamilName: "இரும்பு அடுப்பு", englishName: "Iron Stove", count: "" },
    { id: 34, tamilName: "தட்டு (பிளேட்)", englishName: "Plate", count: "" },
    { id: 35, tamilName: "தோசை கல் செட்", englishName: "Dosa Stone Set", count: "" },
    { id: 36, tamilName: "மினி இட்லி பானை (பெரியது)", englishName: "Mini Idli Pot (Big)", count: "" },
    { id: 37, tamilName: "குழி பணியாரம் சட்டி", englishName: "Kuzhi Paniyaram Pan", count: "" },
    { id: 38, tamilName: "விறகு", englishName: "Firewood", count: "" },
    { id: 39, tamilName: "மண்ணெண்ணெய்", englishName: "Kerosene", count: "" },
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
    setItems(items.map((item) => (item.id === id ? { ...item, count: value } : item)))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return items.filter((item) => item.count)
    },
  }))

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header" style={{ backgroundColor: "#d33131", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">பாத்திர வகைகள்</span>
            <span className="english-text"> / Utensil Types</span>
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
                    <span className="tamil-text">எண்ணிக்கை</span>
                    <span className="english-text"> / Count</span>
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
                        value={item.count}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="Count"
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

UtensilsForm.displayName = "UtensilsForm"

export default UtensilsForm

