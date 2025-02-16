import React, { useState } from 'react';

const OilsAndFloursForm = () => {
  const [oilItems, setOilItems] = useState([
    { id: 1, tamilName: 'ரீஃபைன் ஆயில் SVS', englishName: 'Refined Oil SVS', liters: '', ml: '' },
    { id: 2, tamilName: 'தேங்காய் எண்ணெய் VVD', englishName: 'Coconut Oil VVD', liters: '', ml: '' },
    { id: 3, tamilName: 'நல்லெண்ணெய் (இதயம்)', englishName: 'Gingelly Oil (Idhayam)', liters: '', ml: '' },
    { id: 4, tamilName: 'கடலை எண்ணெய் ரீஃபைன்ட்', englishName: 'Refined Groundnut Oil', liters: '', ml: '' },
    { id: 5, tamilName: 'நெய் (ஆவின்)', englishName: 'Ghee (Aavin)', liters: '', ml: '' },
    { id: 6, tamilName: 'டால்டா', englishName: 'Dalda', liters: '', ml: '' },
    { id: 7, tamilName: 'ரூபினி பாமாயில்', englishName: 'Rupini Palm Oil', liters: '', ml: '' },
    { id: 8, tamilName: 'வெண்ணை (உழுத்துக் குளி)', englishName: 'Butter (Uzhuthu Kuli)', liters: '', ml: '' },
    { id: 9, tamilName: 'பன்னீர்', englishName: 'Rose Water', liters: '', ml: '' },
    { id: 10, tamilName: 'கோவா (சர்க்கரை)', englishName: 'Khova (Sweet)', liters: '', ml: '' },
    { id: 11, tamilName: 'சர்க்கரை இல்லாத கோவா', englishName: 'Sugar-free Khova', liters: '', ml: '' },
    { id: 12, tamilName: 'பிரட்', englishName: 'Bread', liters: '', ml: '' },
    { id: 13, tamilName: 'தாளான் (பட்டன்)', englishName: 'Thalan (Button)', liters: '', ml: '' },
  ]);

  const [flourItems, setFlourItems] = useState([
    { id: 1, tamilName: 'ரவை', englishName: 'Rava', kg: '', grams: '' },
    { id: 2, tamilName: 'சம்பா கோதுமை ரவை', englishName: 'Samba Wheat Rava', kg: '', grams: '' },
    { id: 3, tamilName: 'அரிசி சேவை', englishName: 'Rice Sevai', kg: '', grams: '' },
    { id: 4, tamilName: 'சேமியா', englishName: 'Semiya', kg: '', grams: '' },
    { id: 5, tamilName: 'கோதுமை மாவு (ஆசீர்வாத)', englishName: 'Wheat Flour (Aashirvaad)', kg: '', grams: '' },
    { id: 6, tamilName: 'மைதா மாவு (நரசு & நாகா)', englishName: 'Maida Flour (Narasu & Naga)', kg: '', grams: '' },
    { id: 7, tamilName: 'கடலை மாவு', englishName: 'Gram Flour', kg: '', grams: '' },
    { id: 8, tamilName: 'பச்சரிசி மாவு', englishName: 'Raw Rice Flour', kg: '', grams: '' },
    { id: 9, tamilName: 'கார்ன் பிளவர் மாவு', englishName: 'Corn Flour', kg: '', grams: '' },
    { id: 10, tamilName: 'கிழங்கு மாவு', englishName: 'Potato Flour', kg: '', grams: '' },
  ]);

  const handleOilInputChange = (id, field, value) => {
    setOilItems(oilItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleFlourInputChange = (id, field, value) => {
    setFlourItems(flourItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="container mb-4">
      {/* Oils Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary-subtle">
          <h3 className="card-title mb-0">
            <span className="tamil-text">எண்ணெய் வகைகள்</span>
            <span className="english-text">/ Oil Types</span>
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
                    <span className="tamil-text">லிட்டர்</span>
                    <span className="english-text">/ Liters</span>
                  </th>
                  <th className="measurement-header">
                    <span className="tamil-text">மில்லி</span>
                    <span className="english-text">/ ml</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {oilItems.map(item => (
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
                        value={item.liters}
                        onChange={(e) => handleOilInputChange(item.id, 'liters', e.target.value)}
                        placeholder="Liters"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        min="0"
                        value={item.ml}
                        onChange={(e) => handleOilInputChange(item.id, 'ml', e.target.value)}
                        placeholder="ml"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Flours Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary-subtle">
          <h3 className="card-title mb-0">
            <span className="tamil-text">மாவு வகைகள்</span>
            <span className="english-text">/ Flour Types</span>
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
                {flourItems.map(item => (
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
                        onChange={(e) => handleFlourInputChange(item.id, 'kg', e.target.value)}
                        placeholder="Kg"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-control form-control-sm" 
                        min="0"
                        value={item.grams}
                        onChange={(e) => handleFlourInputChange(item.id, 'grams', e.target.value)}
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

export default OilsAndFloursForm;