import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="business-footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-4">
            <div className="tamil-content">
              <h2 className="special-text mb-3">மிகஸி எடுத்து வரவும்</h2>
              <p className="special-description">
                எங்களிடம் திருமணம் மஞ்சள் நீராட்டு விழா மற்றும் சுப விசேஷங்களுக்கு
                சிறந்த முறையில் சமையல் செய்ய ஆட்கள் கிடைக்கும்.
              </p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="copyright">
              &copy; {currentYear} சிவம் கேட்டரிங் | அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;