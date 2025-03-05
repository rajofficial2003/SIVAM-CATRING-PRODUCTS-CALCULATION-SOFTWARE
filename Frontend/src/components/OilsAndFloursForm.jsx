"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"

const OilsAndFloursForm = forwardRef(({ initialData }, ref) => {
  const [oilItems, setOilItems] = useState([
    { id: 1, tamilName: "ரீஃபைன் ஆயில் SVS", englishName: "Refined Oil SVS", liters: "", ml: "" },
    { id: 2, tamilName: "தேங்காய் எண்ணெய் VVD", englishName: "Coconut Oil VVD", liters: "", ml: "" },
    { id: 3, tamilName: "நல்லெண்ணெய் (இதயம்)", englishName: "Gingelly Oil (Idhayam)", liters: "", ml: "" },
    { id: 4, tamilName: "கடலை எண்ணெய் ரீஃபைன்ட்", englishName: "Refined Groundnut Oil", liters: "", ml: "" },
    { id: 5, tamilName: "நெய் (ஆவின்)", englishName: "Ghee (Aavin)", liters: "", ml: "" },
    { id: 6, tamilName: "டால்டா", englishName: "Dalda", kg: "" },
    { id: 7, tamilName: "ரூபினி பாமாயில்", englishName: "Rupini Palm Oil", liters: "", ml: "" },
    { id: 8, tamilName: "வெண்ணை (ஊத்துக் குளி)", englishName: "Butter (Uzhuthu Kuli)", kg: "" },
    { id: 9, tamilName: "பன்னீர்", englishName: "Rose Water", kg: "" },
    { id: 10, tamilName: "கோவா (சர்க்கரை)", englishName: "Khova (Sweet)", kg: "" },
    { id: 11, tamilName: "சர்க்கரை இல்லாத கோவா", englishName: "Sugar-free Khova", kg: "" },
    { id: 12, tamilName: "பிரட்", englishName: "Bread", count: "" },
    { id: 13, tamilName: "காளான் (பட்டன்)", englishName: "Mushroom (Button)", kg: "", grams: "" },
    { id: 14, tamilName: "பேபி கார்ன்", englishName: "Baby Corn", kg: "", grams: "" },
  ])

  const [flourItems, setFlourItems] = useState([
    { id: 1, tamilName: "ரவை", englishName: "Rava", kg: "" },
    { id: 2, tamilName: "சம்பா கோதுமை ரவை", englishName: "Samba Wheat Rava", kg: "" },
    { id: 3, tamilName: "அரிசி சேவை", englishName: "Rice Sevai", kg: "" },
    { id: 4, tamilName: "சேமியா", englishName: "Semiya", kg: "" },
    { id: 5, tamilName: "கோதுமை மாவு (ஆசீர்வாத)", englishName: "Wheat Flour (Aashirvaad)", kg: "" },
    { id: 6, tamilName: "மைதா மாவு (நரசு & நாகா)", englishName: "Maida Flour (Narasu & Naga)", kg: "" },
    { id: 7, tamilName: "கடலை மாவு", englishName: "Gram Flour", kg: "" },
    { id: 8, tamilName: "பச்சரிசி மாவு", englishName: "Raw Rice Flour", kg: "" },
    { id: 9, tamilName: "கார்ன் பிளவர் மாவு", englishName: "Corn Flour", kg: "" },
    { id: 10, tamilName: "கிழங்கு மாவு", englishName: "Potato Flour", kg: "" },
  ])

  useEffect(() => {
    if (initialData && initialData.oils) {
      setOilItems((prevItems) =>
        prevItems.map((item) => {
          const matchingItem = initialData.oils.find((dataItem) => dataItem.id === item.id)
          return matchingItem ? { ...item, ...matchingItem } : item
        }),
      )
    }
    if (initialData && initialData.flours) {
      setFlourItems((prevItems) =>
        prevItems.map((item) => {
          const matchingItem = initialData.flours.find((dataItem) => dataItem.id === item.id)
          return matchingItem ? { ...item, ...matchingItem } : item
        }),
      )
    }
  }, [initialData])

  const handleOilInputChange = (id, field, value) => {
    setOilItems(oilItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleFlourInputChange = (id, value) => {
    setFlourItems(flourItems.map((item) => (item.id === id ? { ...item, kg: value } : item)))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return {
        oils: oilItems.filter((item) => item.liters || item.ml || item.kg || item.count || item.grams),
        flours: flourItems.filter((item) => item.kg),
      }
    },
  }))

  return (
    <div className="container mb-4">
      {/* Oils Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-header" style={{ backgroundColor: "#3d9565", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">எண்ணெய் வகைகள்</span>
            <span className="english-text"> / Oil Types</span>
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
                  <th className="measurement-header">
                    <span className="tamil-text">அளவு</span>
                    <span className="english-text"> / Measurement</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {oilItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <label className="form-label mb-0">
                        <span className="tamil-text">{item.tamilName}</span>
                        <span className="english-text"> / {item.englishName}</span>
                      </label>
                    </td>
                    {item.id === 6 || item.id === 8 || item.id === 9 || item.id === 10 || item.id === 11 ? (
                      <td colSpan="2">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min="0"
                          value={item.kg}
                          onChange={(e) => handleOilInputChange(item.id, "kg", e.target.value)}
                          placeholder="Kg"
                        />
                      </td>
                    ) : item.id === 12 ? (
                      <td colSpan="2">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min="0"
                          value={item.count}
                          onChange={(e) => handleOilInputChange(item.id, "count", e.target.value)}
                          placeholder="Count"
                        />
                      </td>
                    ) : item.id === 13 || item.id === 14 ? (
                      <>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            min="0"
                            value={item.kg}
                            onChange={(e) => handleOilInputChange(item.id, "kg", e.target.value)}
                            placeholder="Kg"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            min="0"
                            value={item.grams}
                            onChange={(e) => handleOilInputChange(item.id, "grams", e.target.value)}
                            placeholder="Grams"
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            min="0"
                            value={item.liters}
                            onChange={(e) => handleOilInputChange(item.id, "liters", e.target.value)}
                            placeholder="Liters"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            min="0"
                            value={item.ml}
                            onChange={(e) => handleOilInputChange(item.id, "ml", e.target.value)}
                            placeholder="ml"
                          />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Flours Section */}
      <div className="card shadow-sm">
        <div className="card-header" style={{ backgroundColor: "#3d9565", color: "white" }}>
          <h3 className="card-title mb-0">
            <span className="tamil-text">மாவு வகைகள்</span>
            <span className="english-text"> / Flour Types</span>
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
                {flourItems.map((item) => (
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
                        onChange={(e) => handleFlourInputChange(item.id, e.target.value)}
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

OilsAndFloursForm.displayName = "OilsAndFloursForm"

export default OilsAndFloursForm

