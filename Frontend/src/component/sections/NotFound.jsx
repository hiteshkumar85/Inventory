import { useNavigate } from 'react-router-dom'
const NotFound = () => {

  const mainStyle = {
    height: "100vh",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    background: "#020617",
    color: "#f8fafc",
  };

  const button = {
    height: "50px",
    width: "150px",

    marginTop: "20px",

    background: "#7c3aed",
    color: "#ffffff",

    border: "none",
    borderRadius: "6px",

    fontSize: "16px",
    fontWeight: "600",

    cursor: "pointer",

    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
    transition: "all 0.3s ease",
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  }

  return (
    <section id="notFound" style={mainStyle}>
      <h1 style={{ fontSize: "5rem", fontWeight: "600" }}>404</h1>
      <h3>Oops! The page you're looking for doesn't exist.</h3>
      <button style={button} onClick={handleBack}>Go to Homepage</button>
    </section>
  )
}

export default NotFound
