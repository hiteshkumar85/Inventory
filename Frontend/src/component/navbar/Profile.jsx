import './Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import image from '../../assets/default.jpg'
import { Outlet } from 'react-router-dom'
import axios from '../../api/axiosInstance'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Profile = () => {

  const [user, setUser] = useState({ name: '', image: '' });
  const getProfile = () => {
    axios.get('/api/profile').then((res) => {
      setUser(res.data);
    });
  }

  const navigate = useNavigate();
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      await axios.post('/api/changeUserImage', formData);
      toast.success("Profile image successfully changed!");
      getProfile();
    } catch (err) {
      toast.error("Something went wrong!");
    }
    navigate('/profile');
  };
  useEffect(getProfile, []);

  return (
    <section id="profileSection">
      <div className="imageContainer">
        <div className="profileImage">
          <img src={user.image ? `https://inventory-backend-63ui.onrender.com/profileImage/${user.image}` : image} />
          <label htmlFor="edit-image">
            <i className='fa-solid fa-edit'></i>
          </label>
          <input type="file" id='edit-image' accept='image/*' onChange={handleChangeImage} />
        </div>
        <h1>{user.name || "USER NAME"}</h1>
        <div className="editLink">
          <Link to="edit-name">EDIT USER NAME</Link>
          <Link to="change-password">EDIT USER PASSWORD</Link>
          <Link to="/">Go Back</Link>
        </div>
      </div>
      <Outlet />
    </section>
  )
}

export default Profile