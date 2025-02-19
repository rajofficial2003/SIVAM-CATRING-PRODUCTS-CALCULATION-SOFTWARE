"use client"

import { useState, useRef } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "./firebase/config"
import Header from "./components/Header"
import PoojaItemsForm from "./components/PoojaItemsForm"
import GeneralItemsForm from "./components/GeneralItemsForm"
import RiceAndPulsesForm from "./components/RiceAndPulsesForm"
import EssenceAndColorForm from "./components/EssenceAndColorForm"
import OilsAndFloursForm from "./components/OilsAndFloursForm"
import MasalaForm from "./components/MasalaForm"
import SauceAndSuppliesForm from "./components/SauceAndSuppliesForm"
import FruitsForm from "./components/FruitsForm"
import VegetablesForm from "./components/VegetablesForm"
import UtensilsForm from "./components/UtensilsForm"
import IdliBatterForm from "./components/IdliBatterForm"
import CustomerDetailsForm from "./components/CustomerDetailsForm"
import Footer from "./components/Footer"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import OrdersPage from "./pages/OrdersPage"
import OrderDetails from "./pages/OrderDetails"

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: "" })

  // Refs for all forms
  const poojaItemsRef = useRef()
  const generalItemsRef = useRef()
  const riceAndPulsesRef = useRef()
  const essenceAndColorRef = useRef()
  const oilsAndFloursRef = useRef()
  const masalaRef = useRef()
  const sauceAndSuppliesRef = useRef()
  const fruitsRef = useRef()
  const vegetablesRef = useRef()
  const utensilsRef = useRef()
  const idliBatterRef = useRef()
  const customerDetailsRef = useRef()

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setSubmitStatus({ show: false, success: false, message: "" })

      // Collect data from all forms
      const orderData = {
        timestamp: new Date(),
        customerDetails: customerDetailsRef.current?.getFormData() || {},
        poojaItems: poojaItemsRef.current?.getFormData() || [],
        generalItems: generalItemsRef.current?.getFormData() || [],
        riceAndPulses: riceAndPulsesRef.current?.getFormData() || [],
        essenceAndColor: essenceAndColorRef.current?.getFormData() || [],
        oilsAndFlours: oilsAndFloursRef.current?.getFormData() || [],
        masala: masalaRef.current?.getFormData() || [],
        sauceAndSupplies: sauceAndSuppliesRef.current?.getFormData() || [],
        fruits: fruitsRef.current?.getFormData() || [],
        vegetables: vegetablesRef.current?.getFormData() || [],
        utensils: utensilsRef.current?.getFormData() || [],
        idliBatter: idliBatterRef.current?.getFormData() || [],
      }

      // Submit to Firestore
      await addDoc(collection(db, "Orders"), orderData)

      setSubmitStatus({
        show: true,
        success: true,
        message: "Order submitted successfully!",
      })

      // Optional: Reset all forms
      // You can add reset functionality to each form component if needed
    } catch (error) {
      console.error("Error submitting order:", error)
      setSubmitStatus({
        show: true,
        success: false,
        message: "Error submitting order. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Header />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                New Order
              </Link>
              <Link className="nav-link" to="/orders">
                View Orders
              </Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <main className="flex-grow-1 py-4">
                <PoojaItemsForm ref={poojaItemsRef} />
                <GeneralItemsForm ref={generalItemsRef} />
                <RiceAndPulsesForm ref={riceAndPulsesRef} />
                <EssenceAndColorForm ref={essenceAndColorRef} />
                <OilsAndFloursForm ref={oilsAndFloursRef} />
                <MasalaForm ref={masalaRef} />
                <SauceAndSuppliesForm ref={sauceAndSuppliesRef} />
                <FruitsForm ref={fruitsRef} />
                <VegetablesForm ref={vegetablesRef} />
                <UtensilsForm ref={utensilsRef} />
                <IdliBatterForm ref={idliBatterRef} />
                <CustomerDetailsForm ref={customerDetailsRef} />

                <div className="container mb-4">
                  {submitStatus.show && (
                    <div className={`alert ${submitStatus.success ? "alert-success" : "alert-danger"} mb-3`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <button className="btn btn-primary w-100 py-3" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Order"}
                  </button>
                </div>
              </main>
            }
          />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

