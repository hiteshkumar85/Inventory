import { useEffect, useState } from 'react'
import './Sales.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const Sales = () => {

    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/sale').then((res) => {
            setSales(res.data);
        }).catch((err) => {
            toast.error("Something went wrong!");
        })

        axios.get('/api/product').then((res) => {
            setProducts(res.data);
        }).catch((err) => {
            toast.error("Something went wrong!");
        })
    }, []);

    const deleteSale = async (id) => {
        await axios.delete(`/api/sale/${id}`)
            .then(() => {
                setSales(sales.filter(sale => sale._id !== id));
                toast.warn("Sale deleted successfully!");
            })
            .catch((err) => {
                toast.error("Something went wrong!");
            })
    };

    const updateSale = async (id) => {
        navigate(`add-sales/?${id}`);
    };

    const getSellingPrice = (name, category) => {
        const isProduct = products.find(product => product.title === name && product.category === category);
        return isProduct?.sellingPrice || 0
    }
    return (
        <section id='sales'>
            <div className="salesHeader">
                <h1>ALL SALES</h1>
                <button><Link to="add-sales" id='add-sale-btn'>ADD NEW SALE</Link></button>
            </div>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <tr key={sale._id}>
                            <td>{index + 1}</td>
                            <td>{sale.name}</td>
                            <td>{sale.category}</td>
                            <td>{sale.quantity}</td>
                            <td>{getSellingPrice(sale.name, sale.category) * sale.quantity}</td>
                            <td>{sale.date}</td>
                            <td>
                                <button onClick={() => updateSale(sale._id)}>
                                    <i className='fa-solid fa-pen'></i>
                                </button>
                                <button onClick={() => deleteSale(sale._id)}>
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

export default Sales
