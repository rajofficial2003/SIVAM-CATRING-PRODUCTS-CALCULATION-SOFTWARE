import "bootstrap/dist/css/bootstrap.min.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerStyle = {
    backgroundColor: "#ffffff",
    padding: "2rem 0",
    borderTop: "2px solid #d33131",
    marginTop: "auto",
  }

  const specialTextStyle = {
    color: "#d33131",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  }

  const specialDescriptionStyle = {
    color: "#000000",
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "0",
  }

  const dividerStyle = {
    height: "1px",
    backgroundColor: "#d33131",
    margin: "1.5rem auto",
    width: "80%",
    opacity: "0.2",
  }

  const copyrightStyle = {
    color: "#000000",
    fontSize: "0.9rem",
    marginBottom: "0",
  }

  return (
    <footer style={footerStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-4">
            <div className="tamil-content">
              <h2 style={specialTextStyle}>மிகஸி எடுத்து வரவும்</h2>
              <p style={specialDescriptionStyle}>
                எங்களிடம் திருமணம் மஞ்சள் நீராட்டு விழா மற்றும் சுப விசேஷங்களுக்கு சிறந்த முறையில் சமையல் செய்ய ஆட்கள் கிடைக்கும்.
              </p>
            </div>
          </div>
        </div>
        <div style={dividerStyle}></div>
        <div className="row">
          <div className="col-12 text-center">
            <p style={copyrightStyle}>&copy; {currentYear} சிவம் கேட்டரிங் | அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

