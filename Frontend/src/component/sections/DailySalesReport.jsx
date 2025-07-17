import { useForm } from 'react-hook-form'
import './DailySalesReport.css'
import axios from '../../api/axiosInstance'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DailySalesReport = () => {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [sales, setSales] = useState([]);
  const filterSales = async (data) => {
    await axios.post('/api/dailySales', data).then((res) => {
      setSales(res.data);
    }).catch((err) => {
      toast.error("Something went wrong!");
    });
    reset();
  }

  useEffect(() => {
    axios.get('/api/lastDaySales').then((res) => {
      setSales(res.data);
    }).catch((err)=>{
      toast.error("Something went wrong!");
    })
  }, []);

  return (
    <section id="dailySalesReport">
      <div className="dailySalesReportHeader">
        <h1>Daily Sales Report</h1>
        <form onSubmit={handleSubmit(filterSales)}>
          <input type="date" {...register('date')} required />
          <button className='filter_btn'>Filter</button>
        </form>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity Sold</th>
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
              <td></td>
            </tr>
          </tfoot>
        </>}
      </table>
    </section>
  )
}

export default DailySalesReport
