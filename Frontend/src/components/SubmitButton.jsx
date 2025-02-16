import React from 'react';
import { useFormContext } from '../contexts/FormContext';
import { downloadPDF } from './OrderPDF';

const SubmitButton = () => {
  const { formData } = useFormContext();

  const handleSubmit = () => {
    downloadPDF(formData);
  };

  return (
    <div className="container mb-4">
      <div className="d-flex justify-content-end">
        <button 
          className="btn btn-primary btn-lg"
          onClick={handleSubmit}
        >
          Download Order Details
        </button>
      </div>
    </div>
  );
};

export default SubmitButton;