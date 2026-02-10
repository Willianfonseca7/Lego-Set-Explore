import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Container } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import categoryDataBilingual from '../data/categoryData.json';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import { translations } from '../translations/translations';

export default function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showNotification } = useNotification();
  const { language } = useContext(LanguageContext);
  const { darkMode } = useContext(ThemeContext);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const categoryData = categoryDataBilingual[language];
  const t = translations[language];
  const tNav = t.nav;
  const tProductDetail = t.productDetail;

  useEffect(() => {
    // Decode URL parameters
    const decodedCategorySlug = decodeURIComponent(categorySlug);
    const decodedProductSlug = decodeURIComponent(productSlug);
    
    // Find category
    const foundCategory = categoryData.find(cat => cat.slug === decodedCategorySlug);
    if (foundCategory) {
      setCategory(foundCategory);
      // Find product in category
      const foundProduct = foundCategory.products?.find(
        p => {
          // Try to match by slug first
          if (p.slug && p.slug === decodedProductSlug) return true;
          // Then try by index
          if (p.index !== undefined && p.index.toString() === decodedProductSlug) return true;
          // Fallback: try slug or index as string
          const pSlug = p.slug || p.index?.toString();
          return pSlug === decodedProductSlug;
        }
      );
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [categorySlug, productSlug, categoryData]);

  if (!product || !category) {
    return (
      <div className={`min-h-screen py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Container maxWidth="lg">
          <div className="text-center py-20">
            <h1 className={darkMode ? 'text-white' : 'text-gray-900'}>{t.productsPage.productNotFound}</h1>
            <Link to="/products" className="text-green-600 hover:text-green-700">
              {t.productsPage.backToProducts}
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Helper function to get category folder name
  const getCategoryFolderName = (slug) => {
    const folderMap = {
      'books': 'Books',
      'lego': 'Lego',
      'hot-wheels': 'Hotwheels',
      'puzzles': 'Puzzles'
    };
    return folderMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const categoryFolder = getCategoryFolderName(categorySlug);
  const productImages = Array.isArray(product.image) ? product.image : [product.image];
  
  const getImagePath = (imageName) => {
    return `/src/assets/images/Category-Images/${categoryFolder}/${imageName}`;
  };

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.slug || product.index || `${categorySlug}-${product.name}`,
      name: product.name,
      price: product.price,
      image: getImagePath(productImages[0]),
      stock: product.stock,
      Altersempfehlung: product.Altersempfehlung
    };
    addItem(cartProduct, 1);
    showNotification(t.cartPage.itemAdded, 'success');
  };

  return (
    <div className={`min-h-screen py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Link to="/" className="hover:text-green-600">{tNav.home}</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-green-600">{tNav.products}</Link>
            <span>/</span>
            <Link to={`/products?category=${categorySlug}`} className="hover:text-green-600">
              {category.name}
            </Link>
            <span>/</span>
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>{product.name}</span>
          </div>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
        >
          {tProductDetail.back}
        </button>

        {/* Product Details */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Images Section */}
            <div>
              {/* Main Image */}
              <div className="mb-4">
                <img
                  src={getImagePath(productImages[selectedImageIndex])}
                  alt={product.name}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-green-600 ring-2 ring-green-200'
                          : darkMode 
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={getImagePath(img)}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col">
              <h1 className={darkMode ? 'text-white' : 'text-gray-900'}>
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-green-600">
                  €{product.price?.toFixed(2) || '0.00'}
                </span>
              </div>

              {/* Age Recommendation */}
              {product.Altersempfehlung !== undefined && (
                <div className="mb-4">
                  <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {tProductDetail.ageRecommendation} {product.Altersempfehlung} {t.homepage.years}
                  </span>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 
                    ? `✓ ${tProductDetail.stockAvailable}: ${product.stock} ${tProductDetail.piecesAvailable}`
                    : `✗ ${tProductDetail.stockUnavailable}`
                  }
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h2 className={darkMode ? 'text-white' : 'text-gray-900'}>{t.productsPage.description}</h2>
                  <p className={`leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {product.description}
                  </p>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full px-6 py-4 font-semibold text-lg rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
                    product.stock === 0
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {tProductDetail.addToCart}
                </button>
              </div>

              {/* Category Link */}
              <div className="mt-4">
                <Link
                  to={`/products?category=${categorySlug}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {tProductDetail.backToCategory} {category.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

