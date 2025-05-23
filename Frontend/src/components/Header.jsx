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
    color: "#1f5b3a",
    fontWeight: "bold",
    margin: "0",
  }

  const businessSubtitleStyle = {
    color: "red",
    fontSize: "1.2rem",
    fontWeight: "normal",
  }

  const businessAddressStyle = {
    color: "red",
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
            <h3 style={businessSubtitleStyle}><b>M.அருள்சங்கர், P.பாலாஜி</b></h3>
            <h2 style={businessNameStyle} className=""> சமையல் காண்ட்ராக்ட் </h2>
            <p style={businessAddressStyle}> <b>திருவண்ணாமலை</b></p>
          </div>
          <div className="col-md-2 text-center text-md-start">
            <div style={contactInfoStyle}>
              <h3 className="text-center text-md-start">Cell:</h3>
              <h3 className="mb-1 text-dark"><b>9047176011</b></h3>
              <h3 className="mb-0 text-dark"><b>9786232524</b></h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

