import axios from '../../../api/axiosInstance'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Add_photo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  async function addPhotoForm(data) {
    const file = data.photo[0];
    const formData = new FormData();
    formData.append('image', file);
    try{
      await axios.post('https://inventory-backend-63ui.onrender.com/api/photo', formData);
      toast.success("Photo added successfully!");
    } catch (err) {
      toast.error("Something went wrong!");      
    }

    reset();
    navigate(-1);
  }
  
  const h = {
    "width": "400px",
    "boxShadow": "2px 2px 5px black",
    "height": "50px",
    "margin": "10px auto",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-around",
  }
  return (
    <form id='add_photo' onSubmit={handleSubmit(addPhotoForm)} style={h}>
      <input type="file" accept='image/*'
        {...register('photo', { required: true })} />
      <button style={{ "padding": "5px 30px" }}>Upload</button>
    </form>
  )
}

export default Add_photo