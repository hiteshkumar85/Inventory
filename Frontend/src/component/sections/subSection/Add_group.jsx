import './Add_group.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from '../../../api/axiosInstance';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
const Add_group = () => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.search.slice(1,);
  const [loading, setLoading] = useState(false);

  const addGroupForm = async (data) => {
    setLoading(true);
    if (!groupId) {
      try {
        await axios.post('/api/group', data);
        toast.success("Group added successfully!");
        navigate('/manage-group');
      }
      catch (err) {
        if (err.response?.status === 409) {
          toast.error("Group name already exists!");
        } else if (err.response?.status === 400) {
          toast.error("Invalid group name!");
        } else {
          toast.error("Something went wrong!");
        }
      }
    } else {
      try {
        await axios.put(`/api/group/${groupId}`, data);
        toast.info("Group updated successfully!");
        navigate('/manage-group');
      } catch (err) {
        if (err.response?.status === 409) {
          toast.error("Group name already exists!");
        } else if (err.response?.status === 400) {
          toast.error("Invalid group name!");
        } else {
          toast.error("Something went wrong!");
        }
      }
    }
    reset();
    setLoading(false);
  }

  useEffect(() => {
    if (groupId) {
      axios.get(`/api/group/${groupId}`).then((res) => {
        setValue('name', res.data.name);
        setValue('level', res.data.level);
        setValue('status', res.data.status);
      }).catch((err) => {
        toast.error("Failed to fetch group data!");
      });
    }
  }, [groupId, setValue]);

  return (
    <form id='add_group' onSubmit={handleSubmit(addGroupForm)}>
      <h1>{groupId ? 'Update Group' : 'Add New Group'}</h1>
      <hr />
      <div>
        <label htmlFor="name">Group Name</label>
        <input type="text" id='name'
          {...register('name', { required: true })} />
      </div>
      <div>
        <label htmlFor="level">Group Level</label>
        <input type="text" id='level'
          {...register('level', { required: true })} />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" {...register('status', { required: true })}>
          <option value=""></option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {(errors.name || errors.level || errors.status) && <span className='errorMsg'>All field are required.</span>}
      <button disabled={loading}>
        {loading ? 'Please wait...' : groupId ? 'Update Group' : 'Add Group'}
      </button>
    </form>
  )
}

export default Add_group
