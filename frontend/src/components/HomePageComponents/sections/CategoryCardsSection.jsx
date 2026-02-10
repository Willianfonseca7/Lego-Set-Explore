import categoryDataBilingual from '../../../data/categoryData.json';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CategoryCard from './CategoryCard';
import { ThemeContext } from '../../../context/ThemeContext';
import { LanguageContext } from '../../../context/LanguageContext';
import { translations } from '../../../translations/translations';

const CategoryCards = ({ showHeader = true, useNavigation = false, onCategoryClick }) => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  
  const categoryData = categoryDataBilingual[language];

  const handleCategoryClick = (categorySlug) => {
    if (onCategoryClick) {
      onCategoryClick(categorySlug);
    } else if (useNavigation) {
      navigate(`/products?category=${categorySlug}`);
    }
  };

  return (
    <section 
      style={showHeader ? {
        padding: '4rem 1rem',
        backgroundColor: darkMode ? '#1f2937' : '#f9fafb'
      } : {}}
    >
      <div className="max-w-7xl mx-auto">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="section-title" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
              {translations[language].homepage.shopByCategory}
            </h2>
            <p className="subtitle" style={{ color: darkMode ? '#d1d5db' : '#4b5563', maxWidth: '42rem', margin: '0 auto' }}>
              {translations[language].homepage.shopByCategoryDescription}
            </p>
          </div>
        )}

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {categoryData.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              useNavigation={useNavigation}
              handleCategoryClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
