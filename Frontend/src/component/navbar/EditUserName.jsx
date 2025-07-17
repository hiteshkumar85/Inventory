import './EditUserName.css'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from '../../api/axiosInstance'
import {toast} from 'react-toastify'
const EditUserName = () => {
  
  const {
    register,
    handleSubmit
  } = useForm();

  const navigate = useNavigate();
  const handleCancel = () => {
     navigate('/profile');
  };

  const onSubmit = async (data) => {
    await axios.put('/api/changeUserName', data);
    toast.info("Name updated successfully. Please login again!");
    localStorage.removeItem('token');
    handleCancel();
  }
  
  return (
    <section id='editUserName'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>EDIT USER NAME</h1>
        <hr />
        <input type="text" placeholder='Enter new name.' required
        {...register('newName')}
        />
        <button>edit name</button>
      </form>
      <button className='cancel' onClick={handleCancel}>Cancel</button>
    </section>
  )
}

export default EditUserName
