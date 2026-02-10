import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import heroImage from '../../../assets/images/Category-Images/GalleryHero/category-landing-mattel-xmas-2025-hot-wheels-0c99d6-DESKTOP.jpg';
import categoryDataBilingual from '../../../data/categoryData.json';
import { ThemeContext } from '../../../context/ThemeContext';
import { LanguageContext } from '../../../context/LanguageContext';
import { translations } from '../../../translations/translations';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const categoryData = categoryDataBilingual[language];
  const t = translations[language].homepage;

  // Helper function to map category slug to folder name
  const getCategoryFolderName = (slug) => {
    const folderMap = {
      'books': 'Books',
      'lego': 'Lego',
      'hot-wheels': 'Hotwheels',
      'puzzles': 'Puzzles'
    };
    return folderMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  // Collect all products from all categories
  const allProducts = categoryData.flatMap(category => 
    category.products.map(product => ({
      ...product,
      categorySlug: category.slug,
      categoryName: category.name
    }))
  );

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allProducts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allProducts.length]);

  const getProductImage = (product) => {
    const imageName = Array.isArray(product.image) ? product.image[0] : product.image;
    const categoryFolder = getCategoryFolderName(product.categorySlug);
    return `/src/assets/images/Category-Images/${categoryFolder}/${imageName}`;
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allProducts.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allProducts.length) % allProducts.length);
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-width Background Image - Hidden on mobile */}
      <div className="hidden md:block relative w-full overflow-hidden" style={{ 
        height: '180px',
        maxHeight: '180px'
      }}>
        <img 
          src={heroImage} 
          alt="Hot Wheels Collection" 
          className="w-full h-full object-cover object-center"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
        />
      </div>
      
      {/* Product Carousel */}
      <div 
        style={{
          background: darkMode 
            ? 'linear-gradient(to bottom right, #1f2937, #111827)' 
            : 'linear-gradient(to bottom right, #eff6ff, #faf5ff)',
          padding: '1.5rem 0',
          position: 'relative'
        }}
        className="px-2 sm:px-4 md:px-0"
      >
        <Container maxWidth="lg">
          <div className="relative" style={{ position: 'relative' }}>
            {/* Previous Button */}
            <button
              onClick={goToPrevSlide}
              className="hidden md:block"
              style={{
                position: 'absolute',
                left: '-1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                backgroundColor: '#0ea5e9',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0284c7';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0ea5e9';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              aria-label="Previous slide"
            >
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={goToNextSlide}
              className="hidden md:block"
              style={{
                position: 'absolute',
                right: '-1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                backgroundColor: '#0ea5e9',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0284c7';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0ea5e9';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              aria-label="Next slide"
            >
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Track */}
            <div 
              style={{ 
                overflow: 'hidden',
                width: '100%'
              }}
            >
              <div
                style={{ 
                  display: 'flex',
                  transition: 'transform 0.5s ease-in-out',
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
              {allProducts.map((product) => (
                <div 
                  key={`${product.categorySlug}-${product.index}`}
                  style={{ width: '100%', flexShrink: 0, padding: '0 1rem' }}
                >
                  <div 
                    style={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      borderRadius: '0.75rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      maxWidth: '56rem',
                      margin: '0 auto'
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-center">
                      {/* Product Image */}
                      <div className="w-full md:w-1/2 p-3 sm:p-4 md:p-6">
                        <img 
                          src={getProductImage(product)}
                          alt={product.name}
                          className="w-full h-48 sm:h-56 md:h-64 object-contain rounded-lg"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="w-full md:w-1/2 p-3 sm:p-4 md:p-6">
                        <span 
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            backgroundColor: darkMode ? '#1e3a8a' : '#dbeafe',
                            color: darkMode ? '#93c5fd' : '#1e40af',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            borderRadius: '9999px',
                            marginBottom: '0.75rem'
                          }}
                        >
                          {product.categoryName}
                        </span>
                        <h3 style={{ 
                          color: darkMode ? '#ffffff' : '#111827', 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {product.name}
                        </h3>
                        <p className="text-sm hidden md:block" style={{ 
                          color: darkMode ? '#d1d5db' : '#4b5563', 
                          marginBottom: '1rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: darkMode ? '#4ade80' : '#16a34a' }}>
                            €{product.price.toFixed(2)}
                          </span>
                          {product.Altersempfehlung > 0 && (
                            <span style={{ fontSize: '0.875rem', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                              {t.age} {product.Altersempfehlung}+
                            </span>
                          )}
                        </div>
                        <Link
                          to={`/products/${product.categorySlug}/${product.slug}`}
                          className="block w-full px-6 py-3 bg-blue-600 text-white font-bold text-center rounded-lg no-underline shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {t.viewProduct}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {allProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-600 dark:bg-sky-500 w-8' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default HeroSection;
