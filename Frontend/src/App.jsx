import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Nav from './component/navbar/Nav'
import Header from './component/sections/header'
import Dashboard from './component/sections/Dashboard'
import Manage_group from './component/sections/Manage_group'
import Add_group from './component/sections/subSection/Add_group'
import Add_user from './component/sections/subSection/Add_user'
import Manage_user from './component/sections/Manage_user'
import Categories from './component/sections/Categories'
import Product from './component/sections/Product'
import Add_product from './component/sections/subSection/Add_product'
import Media_files from './component/sections/Media_files'
import Add_photo from './component/sections/subSection/Add_photo'
import Sales from './component/sections/Sales'
import Add_sales from './component/sections/subSection/Add_sales'
import DailySalesReport from './component/sections/DailySalesReport'
import MonthlySalesRepot from './component/sections/MonthlySalesReport'
import ReportBydate from './component/sections/ReportBydate'
import Login from './component/authorize/login'
import ProtectedRoute from './component/authorize/protectedRoute'
import Unauthorize from './component/sections/Unauthorize'
import Welcome from './component/sections/welcome'
import ShowReport from './component/sections/showReport'
import Profile from './component/navbar/Profile'
import EditUserName from './component/navbar/EditUserName'
import ChangePassword from './component/navbar/ChangePassword'
import NotFound from './component/sections/NotFound'
const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Login />
      }
    ]
  },
  {
    element: <ProtectedRoute allowedFor={['Admin', 'Special', 'User']} />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
            path: 'edit-name',
            element: <EditUserName />
          },
          {
            path: 'change-password',
            element: <ChangePassword />
          }
        ]
      },
      {
        path: "/sales",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Sales />
          </div>
        </>
      },
      {
        path: "/sales/add-sales",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Add_sales />
          </div>
        </>
      },
      {
        path: '/welcome',
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Welcome />
          </div>
        </>
      }
    ]
  },
  {
    element: <ProtectedRoute allowedFor={['Admin']} />,
    children: [
      {
        path: "/dashboard",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Dashboard />
          </div>
        </>
      },
      {
        path: "/manage-group",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Manage_group />
          </div>
        </>
      },
      {
        path: "/manage-group/add-group",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Add_group />
          </div>
        </>
      },
      {
        path: "/manage-user",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Manage_user />
          </div>
        </>
      },
      {
        path: "/manage-user/add-user",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Add_user />
          </div>
        </>
      },
    ]
  },
  {
    element: <ProtectedRoute allowedFor={['Admin', 'Special']} />,
    children: [
      {
        path: "/categories",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Categories />
          </div>
        </>
      },
      {
        path: "/product",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Product />
          </div>
        </>
      },
      {
        path: "/product/add-product",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Add_product />
          </div>
        </>
      },
      {
        path: "/media-files",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <Media_files />
          </div>
        </>,
        children: [
          {
            path: 'add-photo',
            element: <Add_photo />
          }
        ]
      },
      {
        path: "/daily-sales-report",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <DailySalesReport />
          </div>
        </>
      },
      {
        path: "/monthly-sales-report",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <MonthlySalesRepot />
          </div>
        </>
      },
      {
        path: "/sales-by-date",
        element: <>
          <Nav />
          <div className="container">
            <Header />
            <ReportBydate />
          </div>
        </>,
      },
      {
        path: "/generate-report",
        element: <ShowReport />
      }
    ]
  },
  {
    path: '/unauthorized',
    element: <Unauthorize />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

function App() {

  return (
    <section className="mainSection">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </section>
  )
}

export default App
