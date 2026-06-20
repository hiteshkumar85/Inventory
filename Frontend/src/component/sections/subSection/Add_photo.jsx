import axios from '../../../api/axiosInstance'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
const Add_photo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  async function addPhotoForm(data) {
    const file = data.photo[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/photo`, formData);
      toast.success("Photo added successfully!");
      reset();
      navigate('/media-files');
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }

  const h = {
    width: "400px",
    height: "50px",
  
    margin: "10px auto",
  
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  
    background: "#1e293b",
    color: "#f8fafc",
  
    border: "1px solid #334155",
    borderRadius: "8px",
  
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.25)",
  };
  
  return (
    <form id='add_photo' onSubmit={handleSubmit(addPhotoForm)} style={h}>
      <input type="file" accept='image/*'
        {...register('photo')} required />
      <button disabled={isSubmitting} style={{ padding: '5px 30px' }}>
        {isSubmitting ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  )
}

export default Add_photo