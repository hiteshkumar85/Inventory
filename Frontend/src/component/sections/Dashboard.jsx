import { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const Dashboard = () => {

  const [counts, setCounts] = useState({
    categoryCount: 0,
    productCount: 0,
    saleCount: 0,
    userCount: 0
  });
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios.get('/api/dashboardCounts').then((res) => {
        setCounts(res.data);
      });

      axios.get('/api/latestSales').then((res) => {
        setSales(res.data);
      });

      axios.get('/api/recentlyAddProduct').then((res) => {
        setProducts(res.data);
      });
    } catch (err) {
      toast.error("Something went wrong while fetching dashboard data!");
    }

  }, []);



  return (
    <section id='dashboard'>
      <div className='counterContainer'>
        <div>
          <i className="fa-solid fa-user"></i>
          <div>
            <h1>{counts.userCount}</h1>
            <h3>Users</h3>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-list"></i>
          <div>
            <h1>{counts.categoryCount}</h1>
            <h3>Categories</h3>
          </div>
        </div>
        <div>
          <i className="fa-regular fa-cube"></i>
          <div>
            <h1>{counts.productCount}</h1>
            <h3>Product</h3>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-cart-shopping"></i>
          <div>
            <h1>{counts.saleCount}</h1>
            <h3>Sales</h3>
          </div>
        </div>
      </div>
      <div className='detailContainer'>
        <div>
          <h3>LATEST SALES</h3>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Date</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td>{sale.name}</td>
                  <td>{sale.date}</td>
                  <td>{sale.quantity}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
        <div>
          <h3>RECENTLY ADDED PRODUCT</h3>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Selling Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{product.sellingPrice}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
