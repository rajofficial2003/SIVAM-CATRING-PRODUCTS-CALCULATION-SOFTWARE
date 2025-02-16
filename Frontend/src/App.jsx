import React from 'react';
import Header from './components/Header';
import PoojaItemsForm from './components/PoojaItemsForm';
import GeneralItemsForm from './components/GeneralItemsForm';
import RiceAndPulsesForm from './components/RiceAndPulsesForm';
import EssenceAndColorForm from './components/EssenceAndColorForm';
import OilsAndFloursForm from './components/OilsAndFloursForm';
import MasalaForm from './components/MasalaForm';
import SauceAndSuppliesForm from './components/SauceAndSuppliesForm';
import FruitsForm from './components/FruitsForm';
import VegetablesForm from './components/VegetablesForm';
import BatterGrindingForm from './components/BatterGrindingForm';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 py-4">
        <PoojaItemsForm />
        <GeneralItemsForm />
        <RiceAndPulsesForm />
        <EssenceAndColorForm />
        <OilsAndFloursForm />
        <MasalaForm />
        <SauceAndSuppliesForm />
        <FruitsForm />
        <VegetablesForm />
        <BatterGrindingForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;