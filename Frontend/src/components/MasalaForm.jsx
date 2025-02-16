"use client"

import { useState, forwardRef, useImperativeHandle } from "react"

const MasalaForm = forwardRef((props, ref) => {
  const [masalaItems, setMasalaItems] = useState([
    { id: 1, tamilName: 'ஆச்சி குழம்பு மிளகாய் தூள்', englishName: 'Aachi Kulambu Chili Powder', kg: '', grams: '' },
    { id: 2, tamilName: 'மஞ்சள் தூள் (சக்தி)', englishName: 'Turmeric Powder (Sakthi)', kg: '', grams: '' },
    { id: 3, tamilName: 'தனி மிளகாய்த் தூள் (சக்தி)', englishName: 'Pure Chili Powder (Sakthi)', kg: '', grams: '' },
    { id: 4, tamilName: 'தனி மல்லித் தூள் (சக்தி)', englishName: 'Pure Coriander Powder (Sakthi)', kg: '', grams: '' },
    { id: 5, tamilName: 'சீரகத் தூள் (சக்தி)', englishName: 'Cumin Powder (Sakthi)', kg: '', grams: '' },
    { id: 6, tamilName: 'மிளகுத் தூள் (சக்தி)', englishName: 'Pepper Powder (Sakthi)', kg: '', grams: '' },
    { id: 7, tamilName: 'கரம் மசாலாத் தூள் (சக்தி)', englishName: 'Garam Masala Powder (Sakthi)', kg: '', grams: '' },
    { id: 8, tamilName: 'பிரியாணி மசாலாத் தூள் (சக்தி)', englishName: 'Biryani Masala Powder (Sakthi)', kg: '', grams: '' },
    { id: 9, tamilName: 'சிக்கன் மசாலா (சக்தி)', englishName: 'Chicken Masala (Sakthi)', kg: '', grams: '' },
    { id: 10, tamilName: 'சிக்கன் 65 மசாலா (சக்தி)', englishName: 'Chicken 65 Masala (Sakthi)', kg: '', grams: '' },
    { id: 11, tamilName: 'மட்டன் மசாலா (சக்தி)', englishName: 'Mutton Masala (Sakthi)', kg: '', grams: '' },
    { id: 12, tamilName: 'சென்னா மசாலா (சக்தி)', englishName: 'Chenna Masala (Sakthi)', kg: '', grams: '' },
    { id: 13, tamilName: 'முட்டை மசாலா (சக்தி)', englishName: 'Egg Masala (Sakthi)', kg: '', grams: '' },
    { id: 14, tamilName: 'சாட் மசாலா (சக்தி)', englishName: 'Chat Masala (Sakthi)', kg: '', grams: '' },
  ])

  const handleInputChange = (id, field, value) => {
    setMasalaItems(masalaItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return masalaItems.filter((item) => item.kg || item.grams)
    },
  }))

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary-subtle">
          <h3 className="card-title mb-0">
            <span className="tamil-text">மசாலா வகைகள்</span>
            <span className="english-text">/ Masala Types</span>
          </h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0">
              <thead className="sticky-top bg-light">
                <tr>
                  <th className="item-name-header">
                    <span className="tamil-text">பொருட்கள்</span>
                    <span className="english-text">/ Items</span>
                  </th>
                  <th className="measurement-header">
                    <span className="tamil-text">கிலோ</span>
                    <span className="english-text">/ Kg</span>
                  </th>
                  <th className="measurement-header">
                    <span className="tamil-text">கிராம்</span>
                    <span className="english-text">/ Grams</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {masalaItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <label className="form-label mb-0">
                        <span className="tamil-text">{item.tamilName}</span>
                        <span className="english-text">/ {item.englishName}</span>
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
    </div>
  )
})

export default MasalaForm

