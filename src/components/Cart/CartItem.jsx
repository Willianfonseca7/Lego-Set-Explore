import React, { useContext } from 'react';
import { useCart } from '../../context/CartContext';
import { LanguageContext } from '../../context/LanguageContext';
import { ThemeContext } from '../../context/ThemeContext';
import { translations } from '../../translations/translations';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { language } = useContext(LanguageContext);
  const { darkMode } = useContext(ThemeContext);
  const t = translations[language].cartPage;
  
  const maxQuantity = item.stock || 0;
  const currentQuantity = item.quantity || 1;

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      updateQuantity(item.id, currentQuantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleIncrement = () => {
    if (currentQuantity < maxQuantity) {
      updateQuantity(item.id, currentQuantity + 1);
    }
  };

  return (
    <div className={`flex gap-4 items-center p-4 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <img
        src={item.image || 'https://via.placeholder.com/200x160?text=Toy'}
        alt={item.name}
        className="w-28 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
        <div className="mt-2 flex items-center gap-4">
          <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>€{(item.price || 0).toFixed(2)}</div>
          <div className="flex items-center gap-2">
            <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.quantity}:</label>
            <div className={`flex items-center border rounded-md ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <button
                onClick={handleDecrement}
                disabled={currentQuantity <= 1}
                className={`px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={language === 'de' ? 'Menge verringern' : 'Decrease quantity'}
              >
                −
              </button>
              <span className={`px-4 py-1 min-w-12 text-center font-semibold border-x ${
                darkMode 
                  ? 'text-white border-gray-600' 
                  : 'text-gray-900 border-gray-300'
              }`}>
                {currentQuantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={currentQuantity >= maxQuantity}
                className={`px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={language === 'de' ? 'Menge erhöhen' : 'Increase quantity'}
              >
                +
              </button>
            </div>
            {maxQuantity < 999 && (
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'de' ? `(max. ${maxQuantity} auf Lager)` : `(max. ${maxQuantity} in stock)`}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>€{((item.price || 0) * currentQuantity).toFixed(2)}</div>
        <button
          onClick={() => removeItem(item.id)}
          className="mt-2 text-sm text-red-600 hover:text-red-700 hover:underline"
        >
          {t.removeItem}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
