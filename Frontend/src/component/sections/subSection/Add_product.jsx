import './Add_product.css'
import axios from '../../../api/axiosInstance'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Add_product = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const [categories, setCategories] = useState([]);
    const [photos, setPhotos] = useState([]);
    const location = useLocation();
    let paramId = location.search.slice(1,);

    useEffect(() => {
        // fetch the categories from the database 
        axios.get('/api/category')
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                toast.error("Something went wrong!");
            });

        // fetch the photos from the database 
        axios.get('/api/photo')
            .then((res) => {
                setPhotos(res.data)
            })
            .catch((err) => {
                toast.error("Something went wrong!");
            });

        if (paramId) {
            axios.get(`/api/product/${paramId}`)
                .then((res) => {
                    setValue('title', res.data.title);
                    setValue('category', res.data.category);
                    setValue('photo', res.data.photo);
                    setValue('quantity', res.data.quantity);
                    setValue('buyingPrice', res.data.buyingPrice);
                    setValue('sellingPrice', res.data.sellingPrice);
                })
                .catch((err) => {
                    toast.error("Something went wrong!");
                });
        }

    }, [paramId]);


    async function addProductForm(data) {
        if (!paramId) {
            try {
                await axios.post('/api/product', data);
                toast.success("Product added successfully!");
            } catch (err) {
                if (err.response?.status === 400) {
                    toast.error("Product title and category is required!");
                } else if (err.response?.status === 409) {
                    toast.error("Product already exists!");
                } else {
                    toast.error("Something went wrong!");
                }
            }
        }
        else {
            try {
                await axios.put(`/api/product/${paramId}`, data);
                toast.info("Product updated successfully!");
            } catch (err) {
                if (err.response?.status === 400) {
                    toast.error("Product title and category is required!");
                } else if (err.response?.status === 409) {
                    toast.error("Product already exists!");
                } else {
                    toast.error("Something went wrong!");
                }
            }
        }

        reset();
        navigate('/product');
    }

    return (
        <form id="addProduct" onSubmit={handleSubmit(addProductForm)}>
            <h1>{paramId ? 'Update Product' : 'Add New Product'}</h1>
            <hr />
            <div>
                <input type="text" placeholder='Product Title' id='title'
                    {...register('title', { required: true })}
                />
            </div>
            <div>
                <select name="" id="category" {...register('category', { required: true })}>
                    <option value="">Select Product Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.category}>{category.category}</option>
                    ))}
                </select>
                <select name="" id="photo" {...register('photo', { required: true })}>
                    <option value="">Select Product photo</option>
                    {photos.map((photo) => (
                        <option key={photo._id} value={photo.imageName}>{photo.imageName}</option>
                    ))}
                </select>
            </div>
            <div>
                <input type="number" placeholder='Product Quantity' id='quantity'
                    {...register('quantity', { required: true })}
                />
                <input type="number" placeholder='Buying Price ($)' id='buyingPrice'
                    {...register('buyingPrice', { required: true })}
                />
                <input type="number" placeholder='Selling price ($)' id='sellingPrice'
                    {...register('sellingPrice', { required: true })}
                />
            </div>
            {(errors.title || errors.category || errors.photo || errors.quantity || errors.buyingPrice || errors.sellingPrice) && <span className='errorMsg'>All inputs are requied.</span>}
            <button>{paramId ? 'Update Product' : 'Add Product'}</button>
        </form>
    )
}

export default Add_product
