import { useEffect, useState } from 'react'
import './Media_files.css'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const Media_files = () => {

  const [photos, setPhotos] = useState([]);
  // view all photos fetch from the database
  const fetchPhotos = () => {
    axios.get('/api/photo')
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
  }
  useEffect(() => {
    fetchPhotos();
  }, []);

  // delete photo from database
  const deletePhoto = async (id) => {
    await axios.delete(`/api/photo/${id}`)
      .then(() => {
        setPhotos(photos.filter(photo => photo._id !== id));
        toast.warn("Photo deleted successfully!");
        fetchPhotos();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
  }

  return (
    <section id='media_files'>
      <Outlet />
      <div className="mediaHeader">
        <h1>ALL PHOTOS</h1>
        <Link to="add-photo" id='add_photo_btn'>Upload Photo</Link>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Photo</th>
            <th>Photo Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {photos.map((photo, index) => (
            <tr key={photo._id}>
              <td>{index + 1}</td>
              <td><img src={`${import.meta.env.VITE_API_URL}/uploadedImage/${photo.imageName}`} /></td>
              <td>{photo.imageName}</td>
              <td>
                <button onClick={() => deletePhoto(photo._id)}>
                  <i className='fa-solid fa-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Media_files
