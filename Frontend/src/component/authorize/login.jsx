import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useEffect } from 'react';

const login = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function login(data) {
    try {
      const res = await axios.post('https://inventory-backend-63ui.onrender.com/api/login', data);
      localStorage.setItem('token', res.data);
      toast.success("welcome, Login successfully!");
      navigate('welcome');
      reset();
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid User name and Password!");
      }
    }
  }
  
  // if all users are deleted, store a user 
  useEffect(()=>{
    axios.post('https://inventory-backend-63ui.onrender.com/api/saveAdmin');
  },[]);
  
  const form = {
    height : "400px",
    width : "370px",
    borderRadius :"0.3rem",
    padding : "15px",
    color:"white",
    textShadow :"0 0 5px black",
    boxShadow : "0 0 5px white",
    
  }
  




  return (
    <form onSubmit={handleSubmit(login)} style={form}>
      <h1 style={{textAlign : "center", paddingBottom : "10px",}}>Login Panel</h1>
      <hr />
      <div style={{display : "flex", flexDirection : "column"}}>
        <label htmlFor="name" style={{marginTop:"10px",fontSize:"17px"}}>USER NAME</label>
        <input type="text" id='name'
          {...register('name', { required: true })} placeholder='Enter the user name' style={{height:"40px",paddingInline:"5px", border:"none",outline:"none"}}/>
      </div>
      <div style={{display : "flex", flexDirection : "column"}}>
        <label htmlFor="password" style={{marginTop:"10px",fontSize:"17px"}}>PASSWORD</label>
        <input type="password" id='password'
          {...register('password', { required: true })} placeholder='Enter the user password' style={{height:"40px",paddingInline:"5px", border:"none",outline:"none"}}/>
      </div>
      {(errors.name || errors.password) && <span>Please fill all inputs.</span>}
      <button style={{height:"40px",width:"150px",margin:"30% auto",display:"block",fontSize:"16px",fontWeight:"550",border:"1px solid white",background:"transparent",color:"white",textShadow :"0 0 5px black",}}>LOGIN</button>
    </form>
  )
}

export default login
