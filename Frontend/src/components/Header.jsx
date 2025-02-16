import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  return (
    <header className="business-header py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-2 text-center  text-md-start">
            <img 
              src="./assets/anamalayar.png" 
              alt="Business Logo" 
              className="logo"
            />
          </div>
          <div className="col-md-8 text-center mb-3 mb-md-0">
            <h1 className="business-name mb-2">சிவம் கேட்டரிங்</h1>
            <h2 className="business-subtitle mb-2">M.அருள்சங்கர், P.பாலாஜி</h2>
            <p className="business-address mb-0">
              புதுசாணாநந்தல் கிராமம், தி.மலை வட்டம் & மாவட்டம் - 606 805
            </p>
          </div>
          <div className="col-md-2 text-center text-md-end">
            <div className="contact-info">
              <p className="mb-1">Cell: 9047176011</p>
              <p className="mb-0">9786232524</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;