import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { LanguageContext } from '../../../context/LanguageContext';
import { translations } from '../../../translations/translations';

const CategoryCard = ({ category, useNavigation, handleCategoryClick }) => {
  const isClickable = useNavigation || handleCategoryClick;
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].homepage;
  
  return (
    <div
      className="flex flex-col h-full"
      style={{
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transform: 'scale(1)',
        transition: 'all 0.3s',
        cursor: isClickable ? 'pointer' : 'default'
      }}
      onClick={isClickable ? () => handleCategoryClick && handleCategoryClick(category.slug) : undefined}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* Category Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-green-600 dark:bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {category.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 
          className="line-clamp-2 mb-2"
          style={{ 
            color: darkMode ? '#ffffff' : '#111827',
            minHeight: '3.75rem'
          }}
        >
          {category.name}
        </h3>
        <p 
          className="text-sm line-clamp-3 mb-4 flex-grow"
          style={{ 
            color: darkMode ? '#d1d5db' : '#4b5563', 
            minHeight: '4.125rem'
          }}
        >
          {category.description}
        </p>
        <div className="mt-auto">
          {isClickable ? (
            <div className="inline-block w-full text-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300">
              {t.explore} {category.name}
            </div>
          ) : (
            <a
              href={`#${category.slug}`}
              className="inline-block w-full text-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              {t.explore} {category.name}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

