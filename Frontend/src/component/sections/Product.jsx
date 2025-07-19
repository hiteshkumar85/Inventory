import { useEffect, useState } from 'react'
import './Product.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const Product = () => {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  useEffect(() => {
    axios.get('/api/product')
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`/api/product/${id}`)
      .then(() => {
        setProduct(products.filter(product => product._id !== id));
        toast.warn("Product deleted successfully!");
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      })
  };

  const updateProduct = async (id) => {
    navigate(`/product/add-product/?${id}`);
  }
  return (
    <section id='product'>
      <div className="productHeader">
        <h1>PRODUCTS</h1>
        <button>
          <Link to="/product/add-product" className='add_product_btn'>ADD NEW PRODUCT</Link>
        </button>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Photo</th>
            <th>Product Title</th>
            <th>Category</th>
            <th>In Stock</th>
            <th>Buying Price</th>
            <th>Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td><img src={`https://inventory-backend-63ui.onrender.com/uploadedImage/${product.photo}`} /></td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.buyingPrice}</td>
              <td>{product.sellingPrice}</td>
              <td>
                <button onClick={() => updateProduct(product._id)}>
                  <i className='fa-solid fa-pen'></i>
                </button>
                <button onClick={() => deleteProduct(product._id)}>
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

export default Product
