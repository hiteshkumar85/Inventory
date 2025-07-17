import { useState } from 'react'
import './Nav.css'
import { NavLink, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


const Nav = () => {

  // changable code of drop down
  const [dropdown1, setdropdown1] = useState(false);
  const [dropdown2, setdropdown2] = useState(false);
  const managementDropdown = () => {
    setdropdown1(!dropdown1);
    setdropdown2(false);
  }
  const sales_report_Dropdown = () => {
    setdropdown2(!dropdown2);
    setdropdown1(false);
  }

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const role = decoded.role;

  return (
    <div className='navbar'>
      <h1>INVENTORY SYSTEM</h1>
      <hr />
      <ul>
        {(role === "Admin") && <>
          <li>
            <NavLink to="/dashboard" className="links">Dashboard</NavLink>
          </li>
          <li onClick={managementDropdown} className="links">
            User Management
          </li>
          {dropdown1 && <div className='submenu'>
            <NavLink to="/manage-group" className="subLinks">Manage Group</NavLink>
            <NavLink to="/manage-user" className="subLinks">Manage User</NavLink>
          </div>}
        </>}
        {(role === 'Admin' || role === 'Special') && <>
          <li>
            <NavLink to="/categories" className="links">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/product" className="links">Product</NavLink>
          </li>
          <li>
            <NavLink to="/media-files" className="links">Media files</NavLink>
          </li>
        </>}
        <li>
          <NavLink to="/sales" className="links">Sales</NavLink>
        </li>
        {(role === 'Admin' || role === 'Special') && <>
          <li onClick={sales_report_Dropdown} className="links">
            Sales Report
          </li>
          {dropdown2 && <div className='submenu'>
            <NavLink to="/daily-sales-report" className="subLinks">Daily Sales</NavLink>
            <NavLink to="/monthly-sales-report" className="subLinks">Monthly Sales</NavLink>
            <NavLink to="/sales-by-date" className="subLinks">Sales by date</NavLink>
          </div>}
        </>}
      </ul>
    </div>
  )
}

export default Nav


