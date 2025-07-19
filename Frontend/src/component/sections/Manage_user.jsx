import './Manage_user.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axiosInstance'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Manage_user = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/user');
      setUsers(res.data);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate();
  const updateUser = (id) => {
    navigate(`add-user/?${id}`)
  }

  const deleteUser = async (id) => {
    await axios.delete(`/api/user/${id}`).then(() => {
      setUsers(users.filter(user => user._id !== id));
      toast.warn("User deleted successfully!");
      fetchUsers();
    }).catch((err) => {
      toast.error("Something went wrong!");
    });
  }

  return (
    <div className='userContainer'>
      <div className="userHeader">
        <h1>USERS</h1>
        <button>
          <Link to='add-user' id='add_user_btn'>ADD NEW USER</Link>
        </button>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>ADDED BY</th>
            <th>NAME</th>
            <th>ROLE</th>
            <th>STATUS</th>
            <th>LAST LOGIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.addedBy}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
              </td>
              <td>
                <button onClick={() => updateUser(user._id)}>
                  <i className='fa-solid fa-pen'></i>
                </button>
                <button onClick={() => deleteUser(user._id)}>
                  <i className='fa-solid fa-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Manage_user
