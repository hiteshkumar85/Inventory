import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './MonthlySalesReport.css'
import axios from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const MonthlySalesReport = () => {

  const {
    register,
    handleSubmit
  } = useForm()
  const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const year = ["2025", "2024", "2023", "2022", "2021", "2020"];
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('/api/lastMonthSales').then((res) => {
      setSales(res.data);
    }).catch((err) => {
      toast.error("Something went wrong!");
    });
  }, [])

  const filterSales = async (data) => {
    await axios.post('/api/monthlySales', data).then((res) => {
      setSales(res.data);
    }).catch((err) => {
      toast.error("Something went wrong!");
    })
  };

  return (
    <section id="monthlySalesReport">
      <div className="monthlySalesReportHeader">
        <h1>Monthly Sales Report</h1>
        <form onSubmit={handleSubmit(filterSales)}>
          <select {...register('month')} required>
            <option value="">Month</option>
            {month.map((m, i) => (
              <option value={m} key={i}>{m}</option>
            ))}
          </select>
          <select {...register('year')} required>
            <option value="">Year</option>
            {year.map((y, i) => (
              <option value={y} key={i}>{y}</option>
            ))}
          </select>
          <button>Filter</button>
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

export default MonthlySalesReport
