import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import image from '../../assets/default.jpg'

const header = () => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  let [profile, setProfile] = useState({ name: '', image: '' });

  useEffect(() => {
    axios.get('/api/profile').then((res) => {
      setProfile(res.data);
    }).catch((err) => {
      toast.error("Something went wrong!");
    });
  }, []);


  if (!profile) {
    profile = { name: '', image: '' };
    logOut();
  }

  return (
    <div className='header'>
      <div className="date">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>
      <div className="profile" onClick={handleDropdown}>
        <div className="profilePhoto">
          <img src={profile.image ? `${process.env.BACKEND_BASE_URL}/profileImage/${profile.image}` : image} />
        </div>
        <div className="profileName">
          {profile.name}
          <span><i className="fa-solid fa-caret-down"></i></span>
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