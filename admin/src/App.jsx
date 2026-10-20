import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/admin-board/AdminLayout";
import Dashboard from "./pages/admin-board/Dashboard";
import Users from "./pages/admin-board/Users";
import Products from "./pages/admin-board/Products";
import Orders from "./pages/admin-board/Orders";
import Settings from "./pages/admin-board/Settings";
import AddProduct from "./pages/admin-board/AddProduct";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        <Route path="/" element={<AdminLayout />}>

          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add-new-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
