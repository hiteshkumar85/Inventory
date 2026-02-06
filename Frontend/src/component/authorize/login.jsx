import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import './login.css'

const Login = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  async function login(data) {
    try {
      const res = await axios.post(`${process.env.BACKEND_BASE_URL}/api/login`, data);
      localStorage.setItem('token', res.data.token);
      toast.success("welcome, Login successfully!");
      reset();
      navigate('/welcome');
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid User name and Password!");
      }
    }
  }
  
  // if all users are deleted, store a user 
  useEffect(()=>{
    axios.post(`${process.env.BACKEND_BASE_URL}/api/saveAmin`);
  },[]);
  
  return (
    <form onSubmit={handleSubmit(login)} className='loginContainer'>
      <h1>Login Panel</h1>
      <hr />
      <div>
        <label htmlFor="name">USER NAME</label>
        <input type="text" id='name'
          {...register('name', { required: true })} placeholder='Enter the user name' required/>
      </div>
      <div>
        <label htmlFor="password">PASSWORD</label>
        <input type="password" id='password'
          {...register('password', { required: true })} placeholder='Enter the user password' required/>
      </div>
      {(errors.name || errors.password) && <span>Please fill all inputs.</span>}
      <button disabled={isSubmitting}>{isSubmitting?'logging in...':'login'}</button>
    </form>
  )
}

export default Login
