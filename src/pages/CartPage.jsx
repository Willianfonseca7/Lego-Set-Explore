import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { useCart } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const CartPage = () => {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].cartPage;

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 0', backgroundColor: darkMode ? '#111827' : '#ffffff' }}>
      <Container maxWidth="lg">
        <h1 style={{ color: darkMode ? '#ffffff' : '#111827' }}>{t.title}</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="subtitle" style={{ color: darkMode ? '#d1d5db' : '#4b5563', marginBottom: '1.5rem' }}>{t.empty}</p>
            <Link to="/products" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', textDecoration: 'none' }}>{t.continueShopping}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <aside style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
              <h2 style={{ marginBottom: '1rem', color: darkMode ? '#ffffff' : '#111827' }}>{t.orderSummary}</h2>
              <div className="flex justify-between mb-2">
                <span style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>{t.items}</span>
                <span style={{ fontWeight: '500', color: darkMode ? '#ffffff' : '#111827' }}>{cartCount}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>{t.subtotal}</span>
                <span style={{ fontWeight: 'bold', color: darkMode ? '#ffffff' : '#111827' }}>€{cartTotal.toFixed(2)}</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#16a34a', color: '#ffffff', padding: '0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', marginBottom: '0.75rem' }}>{t.checkout}</button>
              <button onClick={clearCart} style={{ width: '100%', border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem', borderRadius: '0.375rem', color: darkMode ? '#d1d5db' : '#374151', backgroundColor: 'transparent', cursor: 'pointer' }}>{t.clearCart}</button>
            </aside>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
