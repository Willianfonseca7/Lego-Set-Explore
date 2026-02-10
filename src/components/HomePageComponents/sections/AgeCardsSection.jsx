import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import categoryDataBilingual from '../../../data/categoryData.json';
import ProductItemCard from '../../ProductPageComponents/ProductItemCard';
import { LanguageContext } from '../../../context/LanguageContext';
import { ThemeContext } from '../../../context/ThemeContext';

const AgeCardsSection = () => {
  const { language } = useContext(LanguageContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  // Get the correct language data
  const categoryData = categoryDataBilingual[language];

  // Age Categories Definition
  const ageCategories = [
    {
      id: 1,
      name: 'Babys (0-2 Jahre)',
      ageRange: '0-2 Jahre',
      description: 'Sichere, sensomotorische Spielzeuge für die Entwicklung',
      color: 'from-pink-100 to-rose-100',
      borderColor: 'border-pink-300',
      minAge: 0,
      maxAge: 2,
    },
    {
      id: 2,
      name: 'Kleinkinder (3-5 Jahre)',
      ageRange: '3-5 Jahre',
      description: 'Farbenfrohe Spielzeuge zur Kreativitätsentwicklung',
      color: 'from-blue-100 to-cyan-100',
      borderColor: 'border-blue-300',
      minAge: 3,
      maxAge: 5,
    },
    {
      id: 3,
      name: 'Kinder (6-8 Jahre)',
      ageRange: '6-8 Jahre',
      description: 'Lernspiele und Bauspielzeuge für Geschicklichkeit',
      color: 'from-purple-100 to-violet-100',
      borderColor: 'border-purple-300',
      minAge: 6,
      maxAge: 8,
    },
    {
      id: 4,
      name: 'Schulkinder (9-12 Jahre)',
      ageRange: '9-12 Jahre',
      description: 'Herausfordernde Spiele und komplexe Konstruktionen',
      color: 'from-green-100 to-emerald-100',
      borderColor: 'border-green-300',
      minAge: 9,
      maxAge: 12,
    },
    {
      id: 5,
      name: 'Teenager (13+ Jahre)',
      ageRange: '13+ Jahre',
      description: 'Anspruchsvolle Hobbys und Sammlerartikel',
      color: 'from-orange-100 to-amber-100',
      borderColor: 'border-orange-300',
      minAge: 13,
      maxAge: 99,
    },
  ];

  // Count products in each age category from categoryData
  const countProductsByAge = (minAge, maxAge) => {
    let count = 0;
    categoryData.forEach((category) => {
      if (category.products) {
        category.products.forEach((product) => {
          const age = product.Altersempfehlung;
          if (age >= minAge && age <= maxAge) {
            count++;
          }
        });
      }
    });
    return count;
  };

  // Get all products for a specific age group
  const handleAgeClick = (ageGroup) => {
    // Navigate to products page with age filter
    navigate(`/products?minAge=${ageGroup.minAge}&maxAge=${ageGroup.maxAge}`);
  };

  return (
  <section
    id="age-cards"
    className="py-16 px-4 sm:px-6 lg:px-8"
    style={{
      backgroundColor: darkMode ? '#1f2937' : '#f9fafb',
    }}
  >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title" style={{ color: darkMode ? '#f9fafb' : '#111827' }}>
            Spielzeug nach Alter
          </h2>
          <p className="subtitle max-w-2xl mx-auto" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
            Finde das perfekte Spielzeug für jedes Alter
          </p>
        </div>

        {/* Age Cards Grid */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {ageCategories.map((ageCategory) => {
            const productCount = countProductsByAge(ageCategory.minAge, ageCategory.maxAge);
            return (
              <button
                key={ageCategory.id}
                onClick={() =>
                  handleAgeClick(ageCategory)
                }
                className={`group bg-linear-to-br ${ageCategory.color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${ageCategory.borderColor} cursor-pointer text-left`}
              >
                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {ageCategory.icon}
                </div>

                {/* Title */}
                <h3 className="text-gray-900 mb-1">
                  {ageCategory.name}
                </h3>

                {/* Age Range */}
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  {ageCategory.ageRange}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {ageCategory.description}
                </p>

                {/* Product Count Badge */}
                <div className="mb-4 inline-block bg-white bg-opacity-60 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-gray-800">
                    {productCount} Produkt{productCount !== 1 ? 'e' : ''}
                  </span>
                </div>

                {/* Arrow */}
                <div className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 mt-2">
                  Entdecken
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgeCardsSection;
