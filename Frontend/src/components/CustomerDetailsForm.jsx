"use client"

import { forwardRef, useImperativeHandle, useState, useEffect } from "react"

const CustomerDetailsForm = forwardRef(({ initialData }, ref) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    orderDate: "",
    functionType: "",
    address: "",
    mobileNumber: "", // Added mobile number field
  })

  useEffect(() => {
    if (initialData) {
      setCustomerDetails(initialData)
    }
  }, [initialData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  useImperativeHandle(ref, () => ({
    getFormData: () => customerDetails,
  }))

  return (
    <div className="container mb-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary-subtle">
          <h3 className="card-title mb-0">
            <span className="tamil-text">வாடிக்கையாளர் விவரங்கள்</span>
            <span className="english-text">/ Customer Details</span>
          </h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                <span className="tamil-text">பெயர்</span>
                <span className="english-text">/ Name</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={customerDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="orderDate" className="form-label">
                <span className="tamil-text">ஆர்டர் தேதி</span>
                <span className="english-text">/ Order Date</span>
              </label>
              <input
                type="date"
                className="form-control"
                id="orderDate"
                name="orderDate"
                value={customerDetails.orderDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="functionType" className="form-label">
                <span className="tamil-text">நிகழ்வு வகை</span>
                <span className="english-text">/ Function Type</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="functionType"
                name="functionType"
                value={customerDetails.functionType}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="mobileNumber" className="form-label">
                <span className="tamil-text">கைபேசி எண்</span>
                <span className="english-text">/ Mobile Number</span>
              </label>
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                value={customerDetails.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="address" className="form-label">
                <span className="tamil-text">முகவரி</span>
                <span className="english-text">/ Address</span>
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                value={customerDetails.address}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CustomerDetailsForm

