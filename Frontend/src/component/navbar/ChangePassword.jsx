import './ChangePassword.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axiosInstance'
import {toast} from 'react-toastify'
const ChangePassword = () => {

  const {
    register,
    handleSubmit
  } = useForm();

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/profile');
  };

  const onSubmit = async (data) => {
    await axios.put('/api/changeUserPassword', data);
    toast.info("Password updated successfully. Please login again!");
    localStorage.removeItem('token');
    handleCancel();
  }

  return (
    <section id="changePassword">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>CHANGE PASSWORD</h1>
        <hr />
        <input type="password" placeholder='Enter new password.' required
          {...register('newPassword')} />
        <button>change password</button>
      </form>
      <button className="cancel" onClick={handleCancel}>Cancel</button>
    </section>
  )
}

export default ChangePassword
