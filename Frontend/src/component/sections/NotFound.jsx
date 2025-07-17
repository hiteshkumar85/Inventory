import {useNavigate} from 'react-router-dom'
const NotFound = () => {
  
  const mainStyle = {
    height:"100vh",
    width:"100%",
    display :"flex",
    flexDirection :"column",
    justifyContent :"center",
    alignItems :"center",
    background: "white",
  };

  const button = {
    height:"50px",
    width:"150px",
    fontSize:"16px",
    fontWeight:"550",
    border: "1px solid black",
    background: "transparent",
    marginTop :"20px",
    borderRadius :"5px",
    color : "#0501ffff"
  }
  
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  }

  return (
    <section id="notFound" style={mainStyle}>
      <h1 style={{fontSize:"5rem",fontWeight:"600"}}>404</h1>
      <h3>Oops! The page you're looking for doesn't exist.</h3>
      <button style={button} onClick={handleBack}>Go to Homepage</button>
    </section>
  )
}

export default NotFound
