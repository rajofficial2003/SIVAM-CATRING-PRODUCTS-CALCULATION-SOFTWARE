import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PoojaItemsForm.css';

const PoojaItemsForm = () => {
  return (
    <div className="pooja-items-form py-4">
      <div className="container">
        <form>
          <div className="card">
            <div className="card-header bg-primary-subtle">
              <h3 className="card-title mb-0">
                <span className="tamil-text">பூஜைப் பொருட்கள்</span>
                <span className="english-text">/ Pooja Items</span>
              </h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
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
                    <tr>
                      <td>
                        <label className="form-label mb-0">
                          <span className="tamil-text">மஞ்சள் தூள்</span>
                          <span className="english-text">/ Turmeric Powder</span>
                        </label>
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          min="0"
                          placeholder="Kg"
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          min="0"
                          placeholder="Grams"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form-label mb-0">
                          <span className="tamil-text">குங்குமம்</span>
                          <span className="english-text">/ Kumkum</span>
                        </label>
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          min="0"
                          placeholder="Kg"
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          min="0"
                          placeholder="Grams"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form-label mb-0">
                          <span className="tamil-text">கற்பூரம், வத்தி</span>
                          <span className="english-text">/ Camphor, Wicks</span>
                        </label>
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          min="0"
                          placeholder="Kg"
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          min="0"
                          placeholder="Grams"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form-label mb-0">
                          <span className="tamil-text">வெற்றிலைபாக்கு</span>
                          <span className="english-text">/ Betel Leaves & Nuts</span>
                        </label>
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          min="0"
                          placeholder="Kg"
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          className="form-control form-control-sm" 
                          min="0"
                          placeholder="Grams"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PoojaItemsForm;