import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useMemo, useContext, useRef, useEffect } from 'react';
import { Container } from '@mui/material';
import CategoryCards from '../components/HomePageComponents/sections/CategoryCardsSection.jsx';
import ProductItemCard from '../components/ProductPageComponents/ProductItemCard.jsx';
import categoryDataBilingual from '../data/categoryData.json';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations/translations';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].productsPage;

  const categoryData = categoryDataBilingual[language];
  const categorySlug = searchParams.get('category');
  const minAge = searchParams.get('minAge') ? parseInt(searchParams.get('minAge')) : null;
  const maxAge = searchParams.get('maxAge') ? parseInt(searchParams.get('maxAge')) : null;
  const itemsPerPage = 8;
  
  const prevCategorySlugRef = useRef(categorySlug);
  
  useEffect(() => {
    if (prevCategorySlugRef.current !== categorySlug) {
      setCurrentPage(1);
      prevCategorySlugRef.current = categorySlug;
    }
  }, [categorySlug]);

  const navigate = useNavigate();

  // Get products filtered by age (when minAge/maxAge params are set)
  const getProductsByAge = useMemo(() => {
    if (minAge === null || maxAge === null) return [];
    
    const allProducts = [];
    categoryData.forEach(category => {
      if (category.products && Array.isArray(category.products)) {
        category.products.forEach(product => {
          if (product.name && product.name.trim() !== '') {
            const productAge = product.Altersempfehlung;
            if (productAge >= minAge && productAge <= maxAge) {
              allProducts.push({
                ...product,
                categorySlug: category.slug
              });
            }
          }
        });
      }
    });
    return allProducts;
  }, [categoryData, minAge, maxAge]);

  // Get age range label for display
  const getAgeRangeLabel = () => {
    if (minAge === 0 && maxAge === 2) return 'Babys (0-2 Jahre)';
    if (minAge === 3 && maxAge === 5) return 'Kleinkinder (3-5 Jahre)';
    if (minAge === 6 && maxAge === 8) return 'Kinder (6-8 Jahre)';
    if (minAge === 9 && maxAge === 12) return 'Schulkinder (9-12 Jahre)';
    if (minAge === 13 && maxAge === 99) return 'Teenager (13+ Jahre)';
    return `${minAge} - ${maxAge} Jahre`;
  };

  const selectedCategory = useMemo(() => {
    if (categorySlug) {
      return categoryData.find(cat => cat.slug === categorySlug);
    }
    return null;
  }, [categorySlug, categoryData]);

  const handleBackToCategories = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  // Function to get featured products from different categories
  const randomProducts = useMemo(() => {
    const allProducts = [];
    
    // Collect all products from all categories with their category slug
    categoryData.forEach(category => {
      if (category.products && Array.isArray(category.products)) {
        category.products.forEach(product => {
          if (product.name && product.name.trim() !== '') {
            // Filter by age if minAge/maxAge params exist
            if (minAge !== null && maxAge !== null) {
              const productAge = product.Altersempfehlung;
              if (productAge >= minAge && productAge <= maxAge) {
                allProducts.push({
                  ...product,
                  categorySlug: category.slug
                });
              }
            } else {
              allProducts.push({
                ...product,
                categorySlug: category.slug
              });
            }
          }
        });
      }
    });

    // Get first 8 products as featured
    return allProducts.slice(0, 8);
  }, [categoryData, minAge, maxAge]);

  // Pagination logic for category products
  const getPaginatedProducts = useMemo(() => {
    if (!selectedCategory || !selectedCategory.products) return [];
    
    const validProducts = selectedCategory.products.filter(
      product => product.name && product.name.trim() !== ''
    );
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return validProducts.slice(startIndex, endIndex);
  }, [selectedCategory, currentPage, itemsPerPage]);

  const totalPages = selectedCategory && selectedCategory.products
    ? Math.ceil(
        selectedCategory.products.filter(
          product => product.name && product.name.trim() !== ''
        ).length / itemsPerPage
      )
    : 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Container maxWidth="lg">
        {/* Top Section: Categories (always visible unless age filter) */}
        {minAge === null && maxAge === null && (
          <div className="mb-12">
            {selectedCategory ? (
              <>
                <button
                  onClick={handleBackToCategories}
                  className="mb-4 text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
                  {t.backButton}
                </button>
                <h1 className={darkMode ? 'text-white' : 'text-gray-900'}>{t.allProducts}</h1>
              </>
            ) : (
              <>
                <h1 className={darkMode ? 'text-white' : 'text-gray-900'}>{t.title}</h1>
                <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.filterByCategory}
                </p>
              </>
            )}
            <CategoryCards showHeader={false} useNavigation={true} />
          </div>
        )}

        {/* Age Filter Section Header */}
        {minAge !== null && maxAge !== null && (
          <div className="mb-12">
            <button
              onClick={() => {
                // Navigate back to homepage and scroll to the age-cards section
                navigate('/#age-cards');
              }}
              className="mb-4 text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
              ← {t.backButton}
            </button>
            <h1 className={darkMode ? 'text-white' : 'text-gray-900'}>
              {getAgeRangeLabel()}
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {getProductsByAge.length} Produkte verfügbar
            </p>
          </div>
        )}

        {/* Bottom Section: Products */}
        {selectedCategory || (minAge !== null && maxAge !== null) ? (
          <>
            <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {selectedCategory && (
                <>
                  <h2 className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {selectedCategory.name}
                  </h2>
                  <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedCategory.description}
                  </p>
                </>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {selectedCategory ? (
                  getPaginatedProducts.length > 0 ? (
                    getPaginatedProducts.map((product) => (
                      <ProductItemCard
                        key={product.slug || product.index}
                        product={product}
                        categorySlug={selectedCategory.slug}/>
                    ))
                  ) : (
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.noProductsAvailable}</p>
                  )
                ) : (
                  // Display age-filtered products
                  getProductsByAge.length > 0 ? (
                    getProductsByAge.map((product) => (
                      <ProductItemCard
                        key={`${product.categorySlug}-${product.slug}`}
                        product={product}
                        categorySlug={product.categorySlug}/>
                    ))
                  ) : (
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.noProductsAvailable}</p>
                  )
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 mt-8">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t.backButton}
                    </button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show all pages if 10 or less, otherwise show smart pagination
                        if (totalPages <= 10) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-4 py-2 border rounded-md transition-colors ${
                                currentPage === page
                                  ? 'bg-green-600 text-white border-green-600'
                                  : darkMode
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else {
                          // Smart pagination for many pages
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 border rounded-md transition-colors ${
                                  currentPage === page
                                    ? 'bg-green-600 text-white border-green-600'
                                    : darkMode
                                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return (
                              <span key={page} className={`px-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                ...
                              </span>
                            );
                          }
                          return null;
                        }
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t.next}
                    </button>
                  </div>
                  
                  {/* Page info */}
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.page} {currentPage} {t.of} {totalPages}
                  </p>
                </div>
              )}

            </div>
          </>
        ) : (
          <>
            {/* Bottom Section: Random Products */}
            <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={darkMode ? 'text-white' : 'text-gray-900'}>{t.recommendedProducts}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {randomProducts.map((product, index) => (
                  <ProductItemCard
                    key={`random-${product.slug || product.index || index}`}
                    product={product}
                    categorySlug={product.categorySlug}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

