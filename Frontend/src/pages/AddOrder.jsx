"use client"

import { useRef, useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase/config"
import CustomerDetailsForm from "../components/CustomerDetailsForm"
import PoojaItemsForm from "../components/PoojaItemsForm"
import GeneralItemsForm from "../components/GeneralItemsForm"
import RiceAndPulsesForm from "../components/RiceAndPulsesForm"
import EssenceAndColorForm from "../components/EssenceAndColorForm"
import OilsAndFloursForm from "../components/OilsAndFloursForm"
import MasalaForm from "../components/MasalaForm"
import SauceAndSuppliesForm from "../components/SauceAndSuppliesForm"
import FruitsForm from "../components/FruitsForm"
import VegetablesForm from "../components/VegetablesForm"
import UtensilsForm from "../components/UtensilsForm"
import IdliBatterForm from "../components/IdliBatterForm"

const AddOrder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: "" })
  const navigate = useNavigate()

  // Refs for all forms
  const customerDetailsRef = useRef()
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
      const docRef = await addDoc(collection(db, "Orders"), orderData)

      setSubmitStatus({
        show: true,
        success: true,
        message: "Order submitted successfully!",
      })

      // Redirect to the order details page
      navigate(`/orders/${docRef.id}`)
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
    <div className="container-fluid py-4">
      <h1 className="mb-4">Add New Order</h1>

      <CustomerDetailsForm ref={customerDetailsRef} />

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

      <div className="mb-4">
        {submitStatus.show && (
          <div className={`alert ${submitStatus.success ? "alert-success" : "alert-danger"} mb-3`}>
            {submitStatus.message}
          </div>
        )}

        <button className="btn btn-primary w-100 py-3" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Order"}
        </button>
      </div>
    </div>
  )
}

export default AddOrder

