"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const SauceAndSuppliesForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "சோயா சாஸ்", englishName: "Soya Sauce", quantity: "" },
    { id: 2, tamilName: "சில்லி சாஸ்", englishName: "Chilli Sauce", quantity: "" },
    { id: 3, tamilName: "தக்காளி சாஸ்", englishName: "Tomato Sauce", quantity: "" },
    { id: 4, tamilName: "சபினா பவுடர்", englishName: "Sabena Powder", quantity: "" },
    { id: 5, tamilName: "சோப்பு", englishName: "Soap", quantity: "" },
    { id: 6, tamilName: "தீ பெட்டி", englishName: "Match Box", quantity: "" },
    { id: 7, tamilName: "நியூஸ் பேப்பர்", englishName: "Newspaper", quantity: "" },
    { id: 8, tamilName: "நூல் உருண்டை", englishName: "Thread Ball", quantity: "" },
    { id: 9, tamilName: "பேபிள் பேப்பர் ரோல்", englishName: "Paper Roll", quantity: "" },
    { id: 10, tamilName: "கை உறை (கிளவுஸ்)", englishName: "Hand Gloves", quantity: "" },
    { id: 11, tamilName: "தலை (கேப்)", englishName: "Cap", quantity: "" },
    { id: 12, tamilName: "டீ கப்", englishName: "Tea Cup", quantity: "" },
    { id: 13, tamilName: "பாயாசம் கப்", englishName: "Payasam Cup", quantity: "" },
    { id: 14, tamilName: "பாதாம் கீர் கப்", englishName: "Badam Kheer Cup", quantity: "" },
    { id: 15, tamilName: "தண்ணீர் கப்", englishName: "Water Cup", quantity: "" },
    { id: 16, tamilName: "தண்ணீர் கேன் 500 ML", englishName: "Water Can 500ml", quantity: "" },
    { id: 17, tamilName: "தண்ணீர் கேன் 20 லிட்டர்", englishName: "Water Can 20L", quantity: "" },
    { id: 18, tamilName: "ஐஸ் க்ரீம் (அருண்)", englishName: "Ice Cream (Arun)", quantity: "" },
    { id: 19, tamilName: "மாலை-பால்", englishName: "Evening-Milk", quantity: "" },
    { id: 20, tamilName: "காலை-பால்", englishName: "Morning-Milk", quantity: "" },
    { id: 21, tamilName: "மாலை-தயிர்", englishName: "Evening-Curd", quantity: "" },
    { id: 22, tamilName: "காலை-தயிர்", englishName: "Morning-Curd", quantity: "" },
    { id: 23, tamilName: "கேஸ் சிலிண்டர்", englishName: "Gas Cylinder", quantity: "" },
    { id: 24, tamilName: "வெள்ளைத் துண்டு", englishName: "White Cloth", quantity: "" },
    { id: 25, tamilName: "காடாத் துணி", englishName: "Gada Cloth", quantity: "" },
    { id: 26, tamilName: "தென்னந்துடைப்பம்", englishName: "Coconut Broom", quantity: "" },
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
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: value } : item)))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return items.filter((item) => item.quantity)
    },
  }))

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header" style={{ backgroundColor: "#d33131", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">சாஸ் வகைகள்</span>
            <span className="english-text"> / Sauce & Supplies</span>
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
                    <span className="english-text"> / Quantity</span>
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
                        value={item.quantity}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="Quantity"
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

SauceAndSuppliesForm.displayName = "SauceAndSuppliesForm"

export default SauceAndSuppliesForm

