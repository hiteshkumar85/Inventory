import { useEffect, useState } from 'react';
import './Add_sales.css'
import { useForm } from 'react-hook-form'
import axios from '../../../api/axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

const Add_sales = () => {

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProduct] = useState([]);

  useEffect(() => {
    const seen = new Set();
    const filtered = products.filter(item => {
      if (seen.has(item.title)) return false;
      seen.add(item.title);
      return true;
    });
    setFilterProduct(filtered);
  }, [products]);

  const [categories, setCategories] = useState([]);
  const [sales, setSales] = useState([]);
  useEffect(() => {
    // get the all products from the database 
    axios.get('/api/product').then((res) => {
      setProducts(res.data);
    }).catch((err) => {
      toast.error("Something went wrong!");
    })

    // get all the categories from the database
    axios.get('/api/category')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });

    // get all sales from the database
    axios.get('/api/sale').then((res) => {
      setSales(res.data);
    }).catch((err) => {
      toast.error("Something went wrong!");
    });

    // get a sale from the database for update
    if (editSale) {
      axios.get(`/api/sale/${editSale}`).then((res) => {
        setValue('name', res.data.name);
        setValue('category', res.data.category);
        setValue('quantity', res.data.quantity);
        setValue('date', res.data.date);
      }).catch((err) => {
        toast.error("Something went wrong!");
      });
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const editSale = location.search.slice(1,);

  async function addSaleForm(data) {
    if (editSale) {
      try {
        await axios.put(`/api/sale/${editSale}`, data);
        toast.info("Sale updated successfully!");
      }
      catch (err) {
        if (err.response?.status === 409) {
          toast.error("Sale already exists!");
        } else if (err.response?.status === 400) {
          toast.error("Invalid sale!");
        } else {
          toast.error("Something went wrong!");
        }
      }
    } else {
      try {
        await axios.post('/api/sale', data);
        toast.success("Sale added successfully!")
      }
      catch (err) {
        if (err.response?.status === 409) {
          toast.error("Sale already exists!");
        } else if (err.response?.status === 400) {
          toast.error("Invalid sale!");
        } else {
          toast.error("Something went wrong!");
        }
      }
    }

    reset();
    navigate('/sales')
  }

  const [selectProductQuantity, setSelectProductQuantity] = useState(0);
  const isExistProduct = () => {

    const date = watch('date');
    if (!date) {
      setValue('date', dayjs(new Date().toLocaleDateString()).format("YYYY-MM-DD"));
    }

    const selectProduct = watch('name');
    const selectCategory = watch('category');
    if (selectProduct && selectCategory) {
      const isProduct = products.find(product => product.title === selectProduct && product.category === selectCategory);

      const isSale = sales.find(sale => sale.name === selectProduct && sale.category === selectCategory);

      if (isProduct) {
        if (editSale) {
          if (isSale) {
            setSelectProductQuantity(parseInt(isProduct.quantity) + parseInt(isSale.quantity))
          } else {
            setSelectProductQuantity(isProduct.quantity);
          }
        } else {
          setSelectProductQuantity(isProduct.quantity);
        }
      } else {
        setSelectProductQuantity(0);
      }

    }
  }
  useEffect(isExistProduct);

  useEffect(() => {
    resetField('quantity');
  }, [selectProductQuantity]);

  return (
    <form id='add-sale' onSubmit={handleSubmit(addSaleForm)}>
      <h1>ADD NEW SALE</h1>
      <hr />
      <select {...register('name', { required: true })}>
        <option value="">Product Name</option>
        {filterProducts.map((product) => (
          <option key={product._id} value={product.title}>{product.title}</option>
        ))}
      </select>
      <select {...register('category', { required: true })}>
        <option value="">Product category</option>
        {categories.map((category) => (
          <option key={category._id} value={category.category}>{category.category}</option>
        ))}
      </select>
      <h5>In stock : {selectProductQuantity}</h5>
      <input type="number" placeholder='Quantity' min='1' max={selectProductQuantity} {...register('quantity', { required: true })} />
      {errors.quantity && <span className='errorMsg'>{errors.quantity.message}</span>}
      <input type="date" {...register('date', { required: true })} disabled />
      {(errors.name || errors.pricePerProduct || errors.quantity || errors.date) && <span className='errorMsg'>All field are required.</span>}
      <button>Add Sale</button>
    </form>
  )
}

export default Add_sales
