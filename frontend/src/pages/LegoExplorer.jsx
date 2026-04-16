import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import StatsBanner from '../components/StatsBanner';
import SetPartsList from '../components/SetPartsList';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

// Em dev usa proxy do Vite (/api). Em producao usa VITE_API_URL (ex: https://backend.railway.app/api)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

function LegoExplorer() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [sets, setSets] = useState([]);
  const [themes, setThemes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSet, setSelectedSet] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [minParts, setMinParts] = useState('');
  const [maxParts, setMaxParts] = useState('');
  const [sortBy, setSortBy] = useState('year');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // Fetch themes
  useEffect(() => {
    fetch(`${API_BASE_URL}/themes`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setThemes(data.data);
        }
      })
      .catch(err => console.error('Error fetching themes:', err));
  }, []);

  // Fetch stats
  useEffect(() => {
    fetch(`${API_BASE_URL}/stats/overview`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  // Fetch sets with filters - Fixed to avoid setState in effect warning
  useEffect(() => {
    let isMounted = true;
    
    const fetchSets = async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        sort_by: sortBy,
        sort_order: sortOrder,
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedTheme) params.append('theme_id', selectedTheme);
      if (yearFrom) params.append('year_from', yearFrom);
      if (yearTo) params.append('year_to', yearTo);
      if (minParts) params.append('min_parts', minParts);
      if (maxParts) params.append('max_parts', maxParts);

      try {
        const res = await fetch(`${API_BASE_URL}/sets?${params}`);
        const data = await res.json();

        if (isMounted && data.success) {
          setSets(data.data);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error('Error fetching sets:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSets();
    
    return () => {
      isMounted = false;
    };
  }, [searchTerm, selectedTheme, yearFrom, yearTo, minParts, maxParts, sortBy, sortOrder, currentPage]);

  // Fetch set details
  const fetchSetDetails = (setNum) => {
    fetch(`${API_BASE_URL}/sets/${setNum}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSelectedSet(data.data);
        }
      })
      .catch(err => console.error('Error fetching set details:', err));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTheme('');
    setYearFrom('');
    setYearTo('');
    setMinParts('');
    setMaxParts('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header
        user={user}
        onLogout={logout}
        onSignIn={() => {
          setShowAuthModal(true);
          setAuthModalMode('login');
        }}
        onSignUp={() => {
          setShowAuthModal(true);
          setAuthModalMode('signup');
        }}
      />
      <HeroSection />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode={authModalMode}
      />

      <StatsBanner stats={stats} />

      <div className="container mx-auto px-4 py-10">
        {/* Filters with enhanced styling */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              Search & Filter Options
            </h2>
            <div className="bg-blue-50 px-4 py-2 rounded-full border-2 border-blue-200">
              <span className="text-sm font-bold text-blue-700">
                {pagination ? `${pagination.total} sets found` : 'Loading...'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <span className="text-lg">🔎</span> Search by Name
              </label>
              <input
                type="text"
                placeholder="e.g., Millennium Falcon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                Theme Category
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">All Themes</option>
                {themes.map(theme => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name} ({theme.set_count} sets)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                Year From
              </label>
              <input
                type="number"
                placeholder="e.g., 2020"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                Year To
              </label>
              <input
                type="number"
                placeholder="e.g., 2024"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                Min. Parts
              </label>
              <input
                type="number"
                placeholder="e.g., 100"
                value={minParts}
                onChange={(e) => setMinParts(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                Max. Parts
              </label>
              <input
                type="number"
                placeholder="e.g., 5000"
                value={maxParts}
                onChange={(e) => setMaxParts(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="year">Year</option>
                <option value="name">Name</option>
                <option value="num_parts">Number of Parts</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                Sort Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="DESC">Newest First</option>
                <option value="ASC">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={resetFilters}
              className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Reset All Filters
            </button>
            <div className="flex-1 bg-blue-50 px-4 py-3 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                <strong>Tip:</strong> Try searching for "star" or filter by "Star Wars" theme to see results!
              </p>
            </div>
          </div>
        </div>

        {/* Sets Grid with enhanced cards */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-red-500 border-t-transparent"></div>
            <p className="mt-6 text-gray-700 text-xl font-bold">Loading LEGO sets from database...</p>
            <p className="mt-2 text-gray-500 text-sm">Executing optimized SQL queries with indexes ⚡</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sets.map(set => (
                <div
                  key={set.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-2 border border-gray-100"
                  onClick={() => fetchSetDetails(set.set_num)}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden relative">
                    {set.img_url ? (
                      <img
                        src={set.img_url}
                        alt={set.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300?text=LEGO+Set';
                        }}
                      />
                    ) : (
                      <div className="text-7xl group-hover:scale-110 transition-transform duration-300">🧱</div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <span className="text-xs font-bold text-gray-700">#{set.set_num}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 h-12 text-lg group-hover:text-blue-600 transition-colors">{set.name}</h3>
                    <div className="flex justify-between items-center text-sm mt-4 mb-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">{set.year}</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">{set.num_parts}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full font-bold">
                        {set.theme_name}
                      </span>
                      <span className="text-xs text-gray-500 font-medium group-hover:text-blue-600 transition-colors">View Details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              pagination={pagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={20}
              itemLabel="sets"
            />
          </>
        )}
      </div>

      {/* Set Detail Modal */}
      {selectedSet && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSet(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{selectedSet.name}</h2>
              <button
                onClick={() => setSelectedSet(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <img
                    src={selectedSet.img_url || 'https://via.placeholder.com/400x400?text=LEGO+Set'}
                    alt={selectedSet.name}
                    className="w-full rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=LEGO+Set&fontSize=20';
                    }}
                  />
                  <div className="text-xs text-gray-500 italic text-center bg-blue-50 p-2 rounded">
                    📷 Image source: <a href="https://brickset.com" target="_blank" rel="noopener noreferrer" className="underline">Brickset.com</a>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="text-gray-600 text-sm">Set Number:</span>
                      <div className="font-semibold text-lg font-mono">{selectedSet.set_num}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="text-gray-600 text-sm">Release Year:</span>
                      <div className="font-semibold text-lg">{selectedSet.year}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="text-gray-600 text-sm">Theme:</span>
                      <div className="font-semibold text-lg">{selectedSet.theme_name}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <span className="text-gray-600 text-sm">Total Parts Count:</span>
                      <div className="font-bold text-2xl text-red-600">{selectedSet.num_parts?.toLocaleString()}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <span className="text-gray-600 text-sm">Unique Parts Types:</span>
                      <div className="font-semibold text-lg">{selectedSet.parts_count}</div>
                    </div>
                  </div>
                </div>
              </div>

              <SetPartsList parts={selectedSet.parts} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default LegoExplorer;
