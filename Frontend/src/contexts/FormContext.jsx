import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    poojaItems: [],
    generalItems: [],
    riceAndPulses: [],
    essenceAndColor: [],
    oilsAndFlours: [],
    masala: [],
    sauceAndSupplies: [],
    fruits: [],
    vegetables: [],
    utensils: [],
    batterGrinding: []
  });

  const updateFormData = (category, data) => {
    setFormData(prev => ({
      ...prev,
      [category]: data
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);