import { useState, useEffect } from 'react'
import './Manage_group.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axiosInstance';
import { toast } from 'react-toastify';
const Manage_group = () => {

  const [groups, setGroups] = useState([]);
  useEffect(() => {
    axios.get('/api/group').then((res) => {
      setGroups(res.data);
    })
  }, []);

  const navigate = useNavigate();
  const updateGroup = (id) => {
    navigate(`add-group/?${id}`);
  }

  const deleteGroup = async (id) => {
    await axios.delete(`/api/group/${id}`).then(() => {
      setGroups(groups => groups.filter(group => group._id !== id));
      toast.info("Group deleted successfully!");
    }).catch((err) => {
      toast.error("Something went wrong!");
    });
  }

  return (
    <div className='groupContainer'>
      <div className="groupHeader">
        <h1>GROUPS</h1>
        <button>
          <Link to='add-group' id='add_group_btn'>ADD NEW GROUP</Link>
        </button>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>GROUP NAME</th>
            <th>GROUP LEVEL</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={group._id}>
              <td>{index + 1}</td>
              <td>{group.name}</td>
              <td>{group.level}</td>
              <td>{group.status}</td>
              <td>
                <button onClick={() => updateGroup(group._id)}>
                  <i className='fa-solid fa-pen'></i>
                </button>
                <button onClick={() => deleteGroup(group._id)}>
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

export default Manage_group
