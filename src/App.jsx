import { CssBaseline, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Homepage from "./pages/Homepage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import Navbar from "./components/MainLayoutComponents/Navbar";
import Footer from "./components/MainLayoutComponents/Footer";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";

function AppContent() {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <>
      <CssBaseline />
      <Router>
        {/* FIXED NAVBAR ON ALL PAGES */}
        <Navbar />

        <Box 
          sx={{ pt: { xs: 10, md: 10 }, minHeight: "100vh" }} 
          className={darkMode ? 'dark bg-gray-900' : 'bg-white'}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:categorySlug/:productSlug" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Box>

        {/* optional: global footer */}
        <Footer />
      </Router>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <NotificationProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </NotificationProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
