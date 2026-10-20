import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import HomePage from "./pages/client/HomePage";
import Navbar from "./components/common/Navbar";
import LoginPage from "./pages/client/LoginPage";
import RegisterPage from "./pages/client/RegisterPage";
import MyProfilePage from "./pages/client/MyProfilePage";
import ProductDetailsPage from "./pages/client/ProductDetailsPage";
import Footer from "./components/common/Footer";
import ProductsPage from "./pages/client/ProductsPage";
import CheckoutPage from "./pages/client/CheckoutPage";
import PaymentPage from "./pages/client/PaymentPage";
import CartPage from "./pages/client/CartPage";

const App = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div>
      <ToastContainer />
      <div className="fixed z-99 top-0 left-0 w-full">
        <Navbar />
      </div>

      <div className={` ${isHome ? "mt-0" : "mt-25"}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;