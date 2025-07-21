import './Add_user.css'
import { useForm } from 'react-hook-form'
import axios from '../../../api/axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Add_user = () => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.search.slice(1,);

  async function addNewUser(data) {
    if (userId) {
      try {
        await axios.put(`/api/user/${userId}`, data);
        toast.info("User updated successfully!");
      } catch (err) {
        if (err.response?.status === 400) {
          toast.error("Invalid user name!");
        } else if (err.response?.status === 409) {
          toast.error("User name is already exists!");
        } else {
          toast.error("Something went wrong!");
        }
      }
    }
    else {
      try {
        await axios.post('/api/user', data);
        toast.success("User added successfully!");
      } catch (err) {
        if (err.response?.status === 400) {
          toast.error("Invalid user name!");
        } else if (err.response?.status === 409) {
          toast.error("User name is already exists!");
        } else {
          toast.error("Something went wrong!");
        }
      }
    }
    navigate('/manage-user');
    reset();
  }

  useEffect(() => {
    if (userId) {
      axios.get(`/api/user/${userId}`).then((res) => {
        setValue('name', res.data.name);
        setValue('role', res.data.role);
        setValue('status', res.data.status);
      }).catch((err) => {
        toast.error("Something went wrong!");
      });
    }
  }, []);

  return (
    <form id='add_user' onSubmit={handleSubmit(addNewUser)}>
      <h1>{userId ? "Update User" : "Add New User"}</h1>
      <hr />
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id='name'
          {...register('name', { required: true })} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id='password' disabled={userId}
          {...register('password', { required: userId ? false : true })} />
      </div>
      <div>
        <label htmlFor="userRole">User Role</label>
        <select id="userRole" {...register('role', { required: true })}>
          <option value=""></option>
          <option value="Admin">Admin</option>
          <option value="Special">Special</option>
          <option value="User">User</option>
        </select>
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" {...register('status', { required: true })}>
          <option value=""></option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button disabled={isSubmitting}>{isSubmitting? 'Please wait..': userId ? "Update User" : "Add User"}</button>
    </form>
  )
}

export default Add_user
