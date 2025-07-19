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

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const res = await axios.get('/api/dashboardCounts');
        setCounts(res.data);
      } catch (err) {
        toast.error("Something went wrong while fetching dashboard data!");
      }
    };

    fetchDashboardCounts();
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
          <i className="fa-solid fa-cart-shopping"></i>
          <div>
            <h1>{counts.productCount}</h1>
            <h3>Product</h3>
          </div>
        </div>
        <div>
          <i className="fa-solid fa-dollar-sign"></i>
          <div>
            <h1>{counts.saleCount}</h1>
            <h3>Sales</h3>
          </div>
        </div>
      </div>
      <div className='detailContainer'>
        <div>
          <h3>HIGHEST SELLING PRODUCT</h3>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Tile</th>
                <th>Total sold</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A4*2</td>
                <td>2</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>LATEST SALES</h3>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Date</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A4*2</td>
                <td>2</td>
                <td>100</td>
              </tr>
              <tr>
                <td>A4*2</td>
                <td>2</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>RECENTLY ADDED PRODUCT</h3>
          <hr />
          <table>
            <tbody>
              <tr>
                <td>A4*2</td>
                <td>2</td>
              </tr>
              <tr>
                <td>A4*2</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
