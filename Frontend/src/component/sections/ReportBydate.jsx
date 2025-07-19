import { useEffect, useState } from 'react';
import './ReportBydate.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import { toast } from 'react-toastify'
const ReportBydate = () => {

  const {
    register,
    handleSubmit,
    resetField,
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // get the all products from the database 
    axios.get('/api/product').then((res) => {
      const seen = new Set();
      const filtered = res.data.filter(item => {
        if (seen.has(item.title)) return false;
        seen.add(item.title);
        return true;
      });
      setProducts(filtered);
    }).catch((err) => {
      toast.error("Something went wrong!");
    });


    // get all the categories from the database
    axios.get('/api/category')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  }, []);

  const navigate = useNavigate();
  const filterSales = async (data) => {
    navigate(`/generate-report/?${data.startDate}&${data.lastDate}&${data.category}&${data.product}`);

    resetField('startDate');
    resetField('lastDate');
  }

  return (
    <section id="reportBydate">
      <form onSubmit={handleSubmit(filterSales)}>
        <h1>Sales Report</h1>
        <hr />
        <div className='input'>
          <input type="date" {...register('startDate')} required /> <button> to </button> <input type="date" {...register('lastDate')} required />
        </div>
        <h3>Filter the report</h3>
        <div className='filter'>
          <select {...register('category')} required>
            <option value="All categories">All categories</option>
            {categories.map((category) => (
              <option value={category.category} key={category._id}>{category.category}</option>
            ))}
          </select>
          <select {...register('product')} required>
            <option value="All products">All products</option>
            {products.map((product) => (
              <option value={product.title} key={product._id}>{product.title}</option>
            ))}
          </select>
        </div>
        <button className='generate_btn'>Genrate the Report</button>
      </form>
    </section>
  )
}

export default ReportBydate
