import "bootstrap/dist/css/bootstrap.min.css"

const Header = () => {
  const headerStyle = {
    backgroundColor: "#ffffff",
    borderBottom: "2px solid #d33131",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "1rem 0",
  }

  const logoStyle = {
    maxWidth: "100%",
    height: "auto",
  }

  const businessNameStyle = {
    color: "#d33131",
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "0",
  }

  const businessSubtitleStyle = {
    color: "#000000",
    fontSize: "1.2rem",
    fontWeight: "normal",
  }

  const businessAddressStyle = {
    color: "#000000",
    fontSize: "1rem",
  }

  const contactInfoStyle = {
    color: "#d33131",
    fontSize: "1rem",
  }

  return (
    <header style={headerStyle}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-2 text-center text-md-start">
            <img src="./Frame 2.png" alt="Business Logo" style={logoStyle} />
          </div>
          <div className="col-md-8 text-center mb-3 mb-md-0">
            <h1 style={businessNameStyle}>சிவம் கேட்டரிங்</h1>
            <h2 style={businessSubtitleStyle}>M.அருள்சங்கர், P.பாலாஜி</h2>
            <p style={businessAddressStyle}>புதுசாணாநந்தல் கிராமம், தி.மலை வட்டம் & மாவட்டம் - 606 805</p>
          </div>
          <div className="col-md-2 text-center text-md-end">
            <div style={contactInfoStyle}>
              <p className="mb-1">Cell: 9047176011</p>
              <p className="mb-0">9786232524</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

