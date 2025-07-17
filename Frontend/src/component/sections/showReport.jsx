import { useEffect, useState } from 'react'
import { useLocation, useNavigate, } from 'react-router-dom'
import axios from '../../api/axiosInstance';
import './showReport.css'
import { toast } from 'react-toastify'

const showReport = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const location = useLocation();
  const [startDate, lastDate, category, product] = location.search.slice(1,).split("&").map(decodeURIComponent);
  useEffect(() => {
    if (location.search) {
      axios.post('/api/reportByDateRange', { startDate, lastDate, category, product }).then((res) => {
        setSales(res.data);
      }).catch((err) => {
        toast.error("Something went wrong!");
      });
    }
  }, []);

  return (
    <section id='showReport'>
      <div className="report">
        <div className="showReportHeader">
          <h1>Inventory Management System - Sales Report</h1>
          <hr />
          <h4>{startDate} TO {lastDate}</h4>
          <hr />
        </div>
        <div className='btn'>
          <button id='back' onClick={() => navigate('/sales-by-date')}>Back</button>
          <button id='print' onClick={() => window.print()}>Print</button>
        </div>
        <table id='table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          {sales.length === 0 ? <tbody>
            <tr><td colSpan={5}>Sales not found.</td></tr>
          </tbody> : <>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={sale._id}>
                  <td>{index + 1}</td>
                  <td>{sale.name}</td>
                  <td>{sale.category}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.date}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Total Quantity : </td>
                <td>{sales.reduce((sum, sale) => sum + parseInt(sale.quantity), 0)}</td>
              </tr>
            </tfoot>
          </>}
        </table>
      </div>
    </section>
  )
}

export default showReport
