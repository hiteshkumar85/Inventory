import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axiosInstance'
import {toast} from 'react-toastify'
const header = () => {

  let d, m, y;
  const showDate = () => {
    const date = new Date();
    d = date.getDate();
    m = date.getMonth();
    y = date.getFullYear();
  }

  showDate()
  setInterval(showDate, 1000);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    toast.warn("User logout successfully!");
    navigate('/');
  }

  let [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  
  let [profile, setProfile] = useState({name : '', image: ''});

  useEffect(()=>{
    axios.get('/api/profile').then((res)=>{
      setProfile(res.data);
    }).catch((err)=>{
      toast.error("Something went wrong!");
    });
  },[]);

  useEffect(()=>{
  });
  if(!profile) {
    profile = {name : '', image: ''};
    logOut();
  }

  return (
    <div className='header'>
      <div className="date">{d}/{m + 1}/{y}</div>
      <div className="profile" onClick={handleDropdown}>
        <div className="profilePhoto">
          <img src={profile.image ? `src/assets/profileImage/${profile.image}` : `src/assets/default.jpg`} />
        </div>
        <div className="profileName">
          {profile.name}
          <span><i class="fa-solid fa-caret-down"></i></span>
        </div>
      </div>
      {dropdown && <div className="dropdown">
        <Link to='/profile'>Profile</Link>
        <Link to='/' onClick={logOut}>Logout</Link>
      </div>}
    </div>
  )
}

export default header