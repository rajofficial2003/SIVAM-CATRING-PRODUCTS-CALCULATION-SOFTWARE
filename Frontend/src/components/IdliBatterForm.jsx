"use client"

import { useState, forwardRef, useImperativeHandle } from "react"

const IdliBatterForm = forwardRef((props, ref) => {
  const [items, setItems] = useState([
    { id: 1, tamilName: "இட்லி குண்டு அரிசி", englishName: "Idli Rice Grinding", count: "" },
    { id: 2, tamilName: "பச்சை அரிசி", englishName: "Raw Rice Grinding", count: "" },
    { id: 3, tamilName: "குண்டு உளுத்தம் பருப்பு", englishName: "Urad Dal Grinding", count: "" },
  ])

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
        <div className="card-header bg-primary-subtle">
          <h3 className="card-title mb-0">
            <span className="tamil-text">இட்லி மாவு அரைப்பு</span>
            <span className="english-text">/ Idli Batter Grinding</span>
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
                    <span className="tamil-text">எண்ணிக்கை</span>
                    <span className="english-text">/ Count</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
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

export default IdliBatterForm

