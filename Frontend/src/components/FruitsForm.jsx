import React, { useState } from 'react';

const FruitsForm = () => {
  const [items, setItems] = useState([
    { id: 1, tamilName: 'மாம்பழம்', englishName: 'Mango', kg: '', grams: '' },
    { id: 2, tamilName: 'பலாப்பழம்', englishName: 'Jackfruit', kg: '', grams: '' },
    { id: 3, tamilName: 'வாழைப்பழம் (மஞ்சள்)', englishName: 'Banana (Yellow)', kg: '', grams: '' },
    { id: 4, tamilName: 'பச்சை வாழைப்பழம்', englishName: 'Green Banana', kg: '', grams: '' },
    { id: 5, tamilName: 'கற்பூர வாழைப்பழம்', englishName: 'Karpooravalli Banana', kg: '', grams: '' },
    { id: 6, tamilName: 'அன்னாச்சி பழம்', englishName: 'Pineapple', kg: '', grams: '' },
    { id: 7, tamilName: 'ஆப்பிள் பழம்', englishName: 'Apple', kg: '', grams: '' },
    { id: 8, tamilName: 'தர்பூசணி பழம்', englishName: 'Watermelon', kg: '', grams: '' },
    { id: 9, tamilName: 'பப்பாளி பழம்', englishName: 'Papaya', kg: '', grams: '' },
    { id: 10, tamilName: 'மாதுளம் பழம்', englishName: 'Pomegranate', kg: '', grams: '' },
    { id: 11, tamilName: 'சீட்லெஸ் திராட்சை', englishName: 'Seedless Grapes', kg: '', grams: '' },
  ]);

  const handleInputChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary-subtle">
          <h3 className="card-title mb-0">
            <span className="tamil-text">பழ வகைகள்</span>
            <span className="english-text">/ Fruit Types</span>
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
                {items.map(item => (
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
                        onChange={(e) => handleInputChange(item.id, 'kg', e.target.value)}
                        placeholder="Kg"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        min="0"
                        value={item.grams}
                        onChange={(e) => handleInputChange(item.id, 'grams', e.target.value)}
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
  );
};

export default FruitsForm;