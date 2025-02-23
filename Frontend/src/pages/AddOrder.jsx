"use client"

import { useRef, useState, useEffect } from "react"
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
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
  const [isLoading, setIsLoading] = useState(false)
  const [existingOrder, setExistingOrder] = useState(null)
  const navigate = useNavigate()
  const { orderId } = useParams()

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

  useEffect(() => {
    if (orderId) {
      fetchExistingOrder()
    }
  }, [orderId])

  const fetchExistingOrder = async () => {
    setIsLoading(true)
    try {
      const orderDoc = await getDoc(doc(db, "Orders", orderId))
      if (orderDoc.exists()) {
        setExistingOrder({ id: orderDoc.id, ...orderDoc.data() })
      } else {
        console.error("Order not found")
        // Handle the case when the order is not found
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      // Handle the error appropriately
    } finally {
      setIsLoading(false)
    }
  }

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

      let docRef
      if (orderId) {
        // Update existing order
        await updateDoc(doc(db, "Orders", orderId), orderData)
        docRef = { id: orderId }
      } else {
        // Submit new order to Firestore
        docRef = await addDoc(collection(db, "Orders"), orderData)
      }

      setSubmitStatus({
        show: true,
        success: true,
        message: orderId ? "Order updated successfully!" : "Order submitted successfully!",
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center" style={{ color: "black" }}>
        {orderId ? "Edit Order" : "Add New Order"}
      </h1>

      <CustomerDetailsForm ref={customerDetailsRef} initialData={existingOrder?.customerDetails} />

      <PoojaItemsForm ref={poojaItemsRef} initialData={existingOrder?.poojaItems} />
      <GeneralItemsForm ref={generalItemsRef} initialData={existingOrder?.generalItems} />
      <RiceAndPulsesForm ref={riceAndPulsesRef} initialData={existingOrder?.riceAndPulses} />
      <EssenceAndColorForm ref={essenceAndColorRef} initialData={existingOrder?.essenceAndColor} />
      <OilsAndFloursForm ref={oilsAndFloursRef} initialData={existingOrder?.oilsAndFlours} />
      <MasalaForm ref={masalaRef} initialData={existingOrder?.masala} />
      <SauceAndSuppliesForm ref={sauceAndSuppliesRef} initialData={existingOrder?.sauceAndSupplies} />
      <FruitsForm ref={fruitsRef} initialData={existingOrder?.fruits} />
      <VegetablesForm ref={vegetablesRef} initialData={existingOrder?.vegetables} />
      <UtensilsForm ref={utensilsRef} initialData={existingOrder?.utensils} />
      <IdliBatterForm ref={idliBatterRef} initialData={existingOrder?.idliBatter} />

      <div className="container mb-4">
        {submitStatus.show && (
          <div className={`alert ${submitStatus.success ? "alert-success" : "alert-danger"} mb-3`}>
            {submitStatus.message}
          </div>
        )}

        <button
          className="btn w-100 py-3"
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            backgroundColor: "#d33131",
            color: "white",
            border: "none",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#b52020")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#d33131")}
        >
          {isSubmitting ? "Submitting..." : orderId ? "Update Order" : "Submit Order"}
        </button>
      </div>
    </div>
  )
}

export default AddOrder

