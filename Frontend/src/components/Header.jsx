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
          <div className="col-md-2 text-center text-md-none d-none d-md-block">
            <img src="./assets/anamalayar.png" alt="Business Logo" style={logoStyle} />
          </div>
          <div className="col-md-8 text-center mb-3 mb-md-0">
            <h1 style={businessNameStyle} className="py-1"> சாணானந்தல் சிவம் </h1>
            <h2 style={businessNameStyle} className="py-1"> சமையல் காண்ட்ராக்ட் </h2>
            <h3 style={businessSubtitleStyle}>M.அருள்சங்கர், P.பாலாஜி</h3>
            <p style={businessAddressStyle}> தி.மலை  மாவட்டம் - 606 805</p>
          </div>
          <div className="col-md-2 text-center text-md-start">
            <div style={contactInfoStyle}>
              <h3 className="text-center text-md-start">Cell:</h3>
              <h3 className="mb-1">9047176011</h3>
              <h3 className="mb-0">9786232524</h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

