import React from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const generatePDF = (formData) => {
  const doc = new jsPDF();

  // Add autoTable to jsPDF prototype
  jsPDF.API.autoTable = autoTable;

  // Add header
  doc.setFontSize(20);
  doc.text('சிவம் கேட்டரிங்', doc.internal.pageSize.width/2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('M.அருள்சங்கர், P.பாலாஜி சமையல் கான்ட்ராக்டர்ஸ்', doc.internal.pageSize.width/2, 30, { align: 'center' });
  doc.text('புதுசாணாம்பட்டி கிராமம், தி.மலை வட்டம் & மாவட்டம் - 606 805', doc.internal.pageSize.width/2, 40, { align: 'center' });
  
  // Add contact details
  doc.text('Cell: 9047176011, 9786232524', doc.internal.pageSize.width - 60, 20);

  // Function to add section
  const addSection = (title, items, startY) => {
    doc.setFontSize(14);
    doc.text(title, 10, startY);
    
    const tableData = items
      .filter(item => item.count > 0 || item.kg > 0 || item.grams > 0)
      .map(item => [
        item.tamilName,
        item.englishName,
        item.count || `${item.kg || ''} ${item.grams ? `gm ${item.grams}` : ''}`
      ]);

    if (tableData.length > 0) {
      doc.autoTable({
        startY: startY + 5,
        head: [['பொருட்கள்', 'Items', 'Quantity']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [200, 200, 200] }
      });
    }

    return doc.lastAutoTable.finalY || startY;
  };

  // Add each section
  let currentY = 50;
  if (formData.poojaItems.length) currentY = addSection('பூஜை பொருட்கள் / Pooja Items', formData.poojaItems, currentY + 10);
  if (formData.generalItems.length) currentY = addSection('மளிகை பொருட்கள் / Grocery Items', formData.generalItems, currentY + 10);
  if (formData.riceAndPulses.length) currentY = addSection('அரிசி & பருப்பு வகைகள் / Rice & Pulses', formData.riceAndPulses, currentY + 10);
  if (formData.essenceAndColor.length) currentY = addSection('எஸ்சென்ஸ் & கலர் வகைகள் / Essence & Color Types', formData.essenceAndColor, currentY + 10);
  if (formData.oilsAndFlours.length) currentY = addSection('எண்ணெய் & மாவு வகைகள் / Oils & Flours', formData.oilsAndFlours, currentY + 10);
  if (formData.masala.length) currentY = addSection('மசாலா வகைகள் / Masala Types', formData.masala, currentY + 10);
  if (formData.sauceAndSupplies.length) currentY = addSection('சாஸ் & பொருட்கள் / Sauce & Supplies', formData.sauceAndSupplies, currentY + 10);
  if (formData.fruits.length) currentY = addSection('பழ வகைகள் / Fruit Types', formData.fruits, currentY + 10);
  if (formData.vegetables.length) currentY = addSection('காய்கறி வகைகள் / Vegetable Types', formData.vegetables, currentY + 10);
  if (formData.utensils.length) currentY = addSection('பாத்திர வகைகள் / Utensil Types', formData.utensils, currentY + 10);
  if (formData.batterGrinding.length) currentY = addSection('இட்லி மாவு அரைப்பு / Idli Batter Grinding', formData.batterGrinding, currentY + 10);

  // Add footer
  doc.setFontSize(10);
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
  }

  return doc;
};

export const downloadPDF = (formData) => {
  const doc = generatePDF(formData);
  doc.save('order-details.pdf');
};