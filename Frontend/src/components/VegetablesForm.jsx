"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const VegetablesForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "முள்ளுக் கத்தரிக்காய்", englishName: "Spiny Brinjal", kg: "" },
    { id: 2, tamilName: "முருங்கைக்காய்", englishName: "Drumstick", kg: "" },
    { id: 3, tamilName: "மாங்காய்", englishName: "Raw Mango", kg: "" },
    { id: 4, tamilName: "வெண்டைக்காய்", englishName: "Ladies Finger", kg: "" },
    { id: 5, tamilName: "புடலங்காய்", englishName: "Snake Gourd", kg: "" },
    { id: 6, tamilName: "கொத்தவரங்காய்", englishName: "Cluster Beans", kg: "" },
    { id: 7, tamilName: "அவரைக்காய்", englishName: "Broad Beans", kg: "" },
    { id: 8, tamilName: "பச்சை மிளகாய்", englishName: "Green Chili", kg: "" },
    { id: 9, tamilName: "பீர்க்கங்காய்", englishName: "Ridge Gourd", kg: "" },
    { id: 10, tamilName: "சுரைக்காய்", englishName: "Bottle Gourd", kg: "" },
    { id: 11, tamilName: "குட மிளகாய்", englishName: "Capsicum", kg: "" },
    { id: 12, tamilName: "மஞ்சள் பூசணிக்காய்", englishName: "Yellow Pumpkin", kg: "" },
    { id: 13, tamilName: "கல்யாணப் பூசணிக்காய்", englishName: "Ash Gourd", kg: "" },
    { id: 14, tamilName: "வாழைக்காய்", englishName: "Raw Banana", quantity: "" },
    { id: 15, tamilName: "தேங்காய் (பொல்லாச்சி)", englishName: "Coconut (Pollachi)", quantity: "" },
    { id: 16, tamilName: "பெரிய வெங்காயம்", englishName: "Big Onion", kg: "" },
    { id: 17, tamilName: "சம்பா வெங்காயம்", englishName: "Sambar Onion", kg: "" },
    { id: 18, tamilName: "தக்காளி", englishName: "Tomato", kg: "" },
    { id: 19, tamilName: "கோஸ்", englishName: "Cabbage", kg: "" },
    { id: 20, tamilName: "பீன்ஸ்", englishName: "Beans", kg: "" },
    { id: 21, tamilName: "கேரட்", englishName: "Carrot", kg: "" },
    { id: 22, tamilName: "சௌ சௌ", englishName: "chow chow", kg: "" },
    { id: 23, tamilName: "நூக்கல்", englishName: "Nukal", kg: "" },
    { id: 24, tamilName: "பீட்ரூட்", englishName: "Beetroot", kg: "" },
    { id: 25, tamilName: "முள்ளங்கி", englishName: "Radish", kg: "" },
    { id: 26, tamilName: "இஞ்சி", englishName: "Ginger", kg: "" },
    { id: 27, tamilName: "பூண்டு (உதிரி)", englishName: "Loose Garlic", kg: "" },
    { id: 28, tamilName: "வெள்ளரி பிஞ்சு", englishName: "Tender Cucumber", kg: "" },
    { id: 29, tamilName: "மா இஞ்சி", englishName: "Mango Ginger", kg: "" },
    { id: 30, tamilName: "உருளைக்கிழங்கு", englishName: "Potato", kg: "" },
    { id: 31, tamilName: "பெரிய உருளை (சிப்ஸ்)", englishName: "Big Potato (Chips)", kg: "" },
    { id: 32, tamilName: "சர்க்கரை வள்ளிக்கிழங்கு", englishName: "Sweet Potato", kg: "" },
    { id: 33, tamilName: "சட்டி கருணைக்கிழங்கு", englishName: "Yam", kg: "" },
    { id: 34, tamilName: "வாழைப்பூ", englishName: "Banana Flower", quantity: "" },
    { id: 35, tamilName: "வாழைத் தண்டு", englishName: "Banana Stem", quantity: "" },
    { id: 36, tamilName: "காலிபிளவர் பூ", englishName: "Cauliflower", quantity: "" },
    { id: 37, tamilName: "சிறு கீரை", englishName: "Small Greens", bundle: "" },
    { id: 38, tamilName: "அரை கீரை", englishName: "Amaranth Greens", bundle: "" },
    { id: 39, tamilName: "முடக்கத்தான் கீரை", englishName: "Balloon Vine Greens", bundle: "" },
    { id: 40, tamilName: "எலுமிச்சை பழம்", englishName: "Lemon", count: "" },
    { id: 41, tamilName: "கருவேப்பிலை", englishName: "Curry Leaves", kg: "" },
    { id: 42, tamilName: "கொத்தமல்லி", englishName: "Coriander", bundle: "" },
    { id: 43, tamilName: "புதினா", englishName: "Mint", bundle: "" },
    { id: 44, tamilName: "சாப்பாடு இலை", englishName: "Banana Leaf", count: "" },
    { id: 45, tamilName: "டிபன் இலை", englishName: "Small Banana Leaf", count: "" },
    { id: 46, tamilName: "வெங்காயம் தண்டு", englishName: "Onion Stalk", bundle: "" },
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
    setItems(
      items.map((item) => {
        if (item.id === 40 || item.id === 44 || item.id === 45) {
          return item.id === id ? { ...item, count: value } : item
        }
        if (item.id === 37 || item.id === 38 || item.id === 39 || item.id === 42 || item.id === 43 || item.id === 46) {
          return item.id === id ? { ...item, bundle: value } : item
        }
        if (item.id === 14 || item.id === 15 || item.id === 34 || item.id === 35 || item.id === 36) {
          return item.id === id ? { ...item, quantity: value } : item
        }
        return item.id === id ? { ...item, kg: value } : item
      }),
    )
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return items.filter((item) => item.kg || item.count || item.bundle || item.quantity)
    },
  }))

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header" style={{ backgroundColor: "#3d9565", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">காய்கறி வகைகள்</span>
            <span className="english-text"> / Vegetable Types</span>
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
                        value={item.kg || item.count || item.bundle || item.quantity || ""}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder={
                          item.id === 40 || item.id === 44 || item.id === 45
                            ? "Count"
                            : item.id === 37 ||
                                item.id === 38 ||
                                item.id === 39 ||
                                item.id === 42 ||
                                item.id === 43 ||
                                item.id === 46
                              ? "கட்டு"
                              : item.id === 14 || item.id === 15 || item.id === 34 || item.id === 35 || item.id === 36
                                ? "Quantity"
                                : "Kg"
                        }
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

VegetablesForm.displayName = "VegetablesForm"

export default VegetablesForm

