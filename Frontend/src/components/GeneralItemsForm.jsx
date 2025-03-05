"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const GeneralItemsForm = forwardRef(({ initialData }, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "குண்டு மிளகாய்", englishName: "Round Chili", kg: "", grams: "" },
    { id: 2, tamilName: "நீட்டு மிளகாய்", englishName: "Long Chili", kg: "", grams: "" },
    { id: 3, tamilName: "தனி கடுகு", englishName: "Whole Mustard", kg: "", grams: "" },
    { id: 4, tamilName: "மிளகு", englishName: "Black Pepper", kg: "", grams: "" },
    { id: 5, tamilName: "சீரகம்", englishName: "Cumin Seeds", kg: "", grams: "" },
    { id: 6, tamilName: "வெந்தயம்", englishName: "Fenugreek Seeds", kg: "", grams: "" },
    { id: 7, tamilName: "சோம்பு", englishName: "Fennel Seeds", kg: "", grams: "" },
    { id: 8, tamilName: "புதிய புளி", englishName: "Fresh Tamarind", kg: "", grams: "" },
    { id: 9, tamilName: "பழைய புளி", englishName: "Aged Tamarind", kg: "", grams: "" },
    { id: 10, tamilName: "சிறிய ஜவ்வரிசி", englishName: "Small Sago", kg: "", grams: "" },
    { id: 11, tamilName: "பட்டை", englishName: "Cinnamon", kg: "", grams: "" },
    { id: 12, tamilName: "லவங்கம்", englishName: "Cloves", kg: "", grams: "" },
    { id: 13, tamilName: "ஏலக்காய்", englishName: "Cardamom", kg: "", grams: "" },
    { id: 14, tamilName: "வெள்ளி ரேக்", englishName: "Silver Foil", kg: "", grams: "" },
    { id: 15, tamilName: "பிரிஞ்சி இலை", englishName: "Curry Leaves", kg: "", grams: "" },
    { id: 16, tamilName: "மாரட்டி", englishName: "Marathi Moggu", kg: "", grams: "" },
    { id: 17, tamilName: "ஜாதி பத்திரி", englishName: "Mace", kg: "", grams: "" },
    { id: 18, tamilName: "பச்சைக் கற்பூரம்", englishName: "Green Camphor", kg: "", grams: "" },
    { id: 19, tamilName: "ஜாதிக்காய்", englishName: "Nutmeg", kg: "", grams: "" },
    { id: 20, tamilName: "அண்ணாச்சி மொக்கு", englishName: "Star Anise", kg: "", grams: "" },
    { id: 21, tamilName: "கல் பாசி", englishName: "Stone Flower", kg: "", grams: "" },
    { id: 22, tamilName: "கஸ்தூரி மெத்தி", englishName: "Kasturi Methi", kg: "", grams: "" },
    { id: 23, tamilName: "முழு தனியா", englishName: "Whole Coriander", kg: "", grams: "" },
    { id: 24, tamilName: "கசகசா", englishName: "Poppy Seeds", kg: "", grams: "" },
    { id: 25, tamilName: "வெள்ளை எள்ளு", englishName: "White Sesame", kg: "", grams: "" },
    { id: 26, tamilName: "கருப்பு எள்ளு", englishName: "Black Sesame", kg: "", grams: "" },
    { id: 27, tamilName: "வடகம்", englishName: "Vadagam", kg: "", grams: "" },
    { id: 28, tamilName: "மணத்தக்காளி வத்தல்", englishName: "Dried Black Nightshade", kg: "", grams: "" },
    { id: 29, tamilName: "சுண்டைக்காய் வத்தல்", englishName: "Dried Turkey Berry", kg: "", grams: "" },
    { id: 30, tamilName: "LG பெருங்காயம் கட்டி", englishName: "LG Asafoetida Block", kg: "", grams: "" },
    { id: 31, tamilName: "LG பெருங்காயம் தூள்", englishName: "LG Asafoetida Powder", kg: "", grams: "" },
    { id: 32, tamilName: "மீல் மேக்கர் (சிறியது)", englishName: "Small Meal Maker", kg: "", grams: "" },
    { id: 33, tamilName: "வெல்லம்", englishName: "Jaggery", kg: "", grams: "" },
    { id: 34, tamilName: "பனை வெல்லம்", englishName: "Palm Jaggery", kg: "", grams: "" },
    { id: 35, tamilName: "சர்க்கரை", englishName: "Sugar", kg: "", grams: "" },
    { id: 36, tamilName: "பனங்கற்கண்டு", englishName: "Palm Sugar Candy", kg: "", grams: "" },
    { id: 37, tamilName: "டைமன் கற்கண்டு", englishName: "Diamond Sugar Candy", kg: "", grams: "" },
    { id: 38, tamilName: "வெள்ளை மூக்கடலை", englishName: "White Peanuts", kg: "", grams: "" },
    { id: 39, tamilName: "கருப்பு மூக்கடலை", englishName: "Black Peanuts", kg: "", grams: "" },
    { id: 40, tamilName: "பச்சை பட்டாணி", englishName: "Green Peas", kg: "", grams: "" },
    { id: 41, tamilName: "காராமணி", englishName: "Black Gram", kg: "", grams: "" },
    { id: 42, tamilName: "மொச்சை (ரங்கோன்)", englishName: "Rangoon Beans", kg: "", grams: "" },
    { id: 43, tamilName: "டபுள் பீன்ஸ்", englishName: "Double Beans", kg: "", grams: "" },
    { id: 44, tamilName: "முந்திரி", englishName: "Cashew Nuts", kg: "", grams: "" },
    { id: 45, tamilName: "திராட்சை", englishName: "Raisins", kg: "", grams: "" },
    { id: 46, tamilName: "வெள்ளரி விதை", englishName: "Cucumber Seeds", kg: "", grams: "" },
    { id: 47, tamilName: "பாதாம் பருப்பு", englishName: "Almond Dal", kg: "", grams: "" },
    { id: 48, tamilName: "பிஸ்தா பருப்பு", englishName: "Pistachio Dal", kg: "", grams: "" },
    { id: 49, tamilName: "சாரை பருப்பு", englishName: "Sarai Dal", kg: "", grams: "" },
    { id: 50, tamilName: "அப்பளம் (பாப்புலர்)", englishName: "Appalam (Popular)", bundle: "" },
    { id: 51, tamilName: "சிப்ஸ் அப்பளம்", englishName: "chips Appalam", kg: "", grams: "" },
    { id: 52, tamilName: "கான் சிப்ஸ்", englishName: "Corn Chips", kg: "", grams: "" },
    { id: 53, tamilName: "காலிபிளவர் சிப்ஸ்", englishName: "Cauliflower Chips", kg: "", grams: "" },
    { id: 54, tamilName: "கலர் தேங்காய் பூ", englishName: "Colored Coconut Flower", kg: "", grams: "" },
    { id: 55, tamilName: "அவல்", englishName: "Flattened Rice", kg: "", grams: "" },
    { id: 56, tamilName: "வருகல்லை", englishName: "Varukallai", kg: "", grams: "" },
    { id: 57, tamilName: "மணிலாப் பயிறு", englishName: "Manila Beans", kg: "", grams: "" },
    { id: 58, tamilName: "வருத்த மணிலாப் பயிறு", englishName: "Roasted Manila Beans", kg: "", grams: "" },
    { id: 59, tamilName: "மில்க் டின்", englishName: "Milk Tin", count: "" },
    { id: 60, tamilName: "மாஸ் பவுடர்", englishName: "Malt Powder", kg: "", grams: "" },
    { id: 61, tamilName: "பாதாம் பவுடர்", englishName: "Almond Powder", kg: "", grams: "" },
    { id: 62, tamilName: "போன்விட்டா", englishName: "Bournvita", kg: "", grams: "" },
    { id: 63, tamilName: "ஹார்லிக்ஸ்", englishName: "Horlicks", kg: "", grams: "" },
    { id: 64, tamilName: "அமுல் பால் பவுடர்", englishName: "Amul Milk Powder", kg: "", grams: "" },
    { id: 65, tamilName: "த்ரிரோஸஸ் டீ தூள்", englishName: "Three Roses Tea Powder", kg: "", grams: "" },
    { id: 66, tamilName: "சக்கரகோட்டு டீ தூள்", englishName: "Chakkarakottu Tea Powder", kg: "", grams: "" },
    { id: 67, tamilName: "ப்ரூ காபி தூள்", englishName: "Bru Coffee Powder", kg: "", grams: "" },
    { id: 68, tamilName: "சன்ரைஸ் காபி தூள்", englishName: "Sunrise Coffee Powder", kg: "", grams: "" },
    { id: 69, tamilName: "சிக்கரி தூள்", englishName: "Chicory Powder", kg: "", grams: "" },
    { id: 70, tamilName: "ரஸ்க் தூள்", englishName: "Rusk Powder", kg: "", grams: "" },
    { id: 71, tamilName: "ரஸ்னா குளிர்பானம்", englishName: "Rasna Cool Drink", kg: "", grams: "" },
    { id: 72, tamilName: "பேக்கிங் பவுடர் ", englishName: "Baking Powder", kg: "", grams: "" },
    { id: 73, tamilName: "ஆப்ப சோடா", englishName: "Appa Soda", kg: "", grams: "" },
    { id: 74, tamilName: "லெமன் சால்ட்", englishName: "Lemon Salt", kg: "", grams: "" },
    { id: 75, tamilName: "அஜினாமோட்டோ", englishName: "Ajinomoto", kg: "", grams: "" },
    { id: 76, tamilName: "கல் உப்பு (டாடா)", englishName: "Rock Salt (Tata)", kg: "", grams: "" },
    { id: 77, tamilName: "சால்ட் உப்பு", englishName: "Table Salt", kg: "", grams: "" },
    { id: 78, tamilName: "ரோல் பண் (ரொட்டி)", englishName: "Roll Bun (Bread)", kg: "", grams: "" },
    { id: 79, tamilName: "தேன் பாட்டில்", englishName: "Honey Bottle", kg: "", grams: "" },
    { id: 80, tamilName: "பேரிச்சம்பழம் (லயன்)", englishName: "Dates (Lion)", kg: "", grams: "" },
    { id: 81, tamilName: "செர்ரி பழம்", englishName: "Cherry Fruit", kg: "", grams: "" },
    { id: 82, tamilName: "புருட்டி, புருட்டி 3 கலர்", englishName: "Purutti, Purutti 3 Colors", kg: "", grams: "" },
    { id: 83, tamilName: "ஊறுகாய்", englishName: "Pickle", kg: "", grams: "" },
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
      return items.filter((item) => item.kg || item.grams || item.bundle || item.count)
    },
  }))

  const renderItemsTable = () => (
    <div className="table-responsive">
      <table className="table table-bordered table-hover mb-0">
        <thead className="sticky-top" style={{ backgroundColor: "#f8f9fa" }}>
          <tr>
            <th className="item-name-header">
              <span className="tamil-text">பொருட்கள்</span>
              <span className="english-text"> / Items</span>
            </th>
            <th className="measurement-header">
              <span className="tamil-text">கிலோ/கட்டு</span>
              <span className="english-text"> / Kg/Bundle</span>
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
              {item.id === 50 ? (
                <td colSpan="2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    min="0"
                    value={item.bundle}
                    onChange={(e) => handleInputChange(item.id, "bundle", e.target.value)}
                    placeholder="கட்டு"
                  />
                </td>
              ) : item.id === 59 ? (
                <td colSpan="2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    min="0"
                    value={item.count}
                    onChange={(e) => handleInputChange(item.id, "count", e.target.value)}
                    placeholder="Count"
                  />
                </td>
              ) : (
                <>
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
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header" style={{ backgroundColor: "#3d9565", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">மளிகை பொருட்கள்</span>
            <span className="english-text"> / Grocery Items</span>
          </h3>
        </div>
        <div className="card-body p-0">{renderItemsTable()}</div>
      </div>
    </div>
  )
})

GeneralItemsForm.displayName = "GeneralItemsForm"

export default GeneralItemsForm

