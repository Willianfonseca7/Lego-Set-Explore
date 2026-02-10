import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

const API_BASE_URL = 'http://localhost:3000/api';

function LegoExplorer() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
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
        console.log('API Response:', data); // Debug log
        
        if (isMounted && data.success) {
          console.log('Setting sets:', data.data); // Debug log
          setSets(data.data);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error('Error fetching sets:', err);
      } finally {
        if (isMounted) {
          console.log('Setting loading to false'); // Debug log
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
      {/* Header with white background */}
      <header className="bg-white shadow-lg border-b-4 border-blue-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-white p-3 rounded-2xl">
                <img 
                  src="/Logo.png" 
                  alt="LEGO Logo" 
                  className="h-40 w-40 object-contain"
                />
              </div>
              <div className="text-gray-800">
                <h1 className="text-5xl font-bold flex items-center gap-3">
                  LEGO Set Explorer
                </h1>
                <p className="text-gray-700 mt-3 text-lg font-medium">
                  Discover, Search, and Explore LEGO Sets from Around the World
                </p>
              </div>
            </div>
            
            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-700">Welcome back!</p>
                    <p className="text-lg font-bold text-blue-600">{user.username}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Stats Banner with consistent blue theme */}
      {stats && (
        <div className="bg-white shadow-lg border-b-4 border-blue-100">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-blue-200">
                <div className="text-3xl font-extrabold text-blue-600 mb-1">{stats.total_sets?.toLocaleString()}</div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Total Sets</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-blue-200">
                <div className="text-3xl font-extrabold text-blue-600 mb-1">{stats.total_themes}</div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Themes</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-blue-200">
                <div className="text-3xl font-extrabold text-blue-600 mb-1">{stats.total_unique_parts?.toLocaleString()}</div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Unique Parts</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-blue-200">
                <div className="text-3xl font-extrabold text-blue-600 mb-1">{stats.avg_parts_per_set?.toLocaleString()}</div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Avg Parts/Set</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-blue-200">
                <div className="text-3xl font-extrabold text-blue-600 mb-1">{stats.earliest_year} - {stats.latest_year}</div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Year Range</div>
              </div>
            </div>
          </div>
        </div>
      )}

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

            {/* Pagination with enhanced styling */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-5">
                <div className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-blue-200">
                  <span className="text-sm font-bold text-gray-700">
                    Showing <span className="text-blue-600">{((currentPage - 1) * 20) + 1}</span> - <span className="text-blue-600">{Math.min(currentPage * 20, pagination.total)}</span> of <span className="text-blue-600">{pagination.total}</span> sets
                  </span>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all duration-200 shadow-md hover:shadow-lg disabled:hover:shadow-md"
                  >
                    ← Previous
                  </button>
                  <div className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg">
                    Page {currentPage} of {pagination.totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                    disabled={currentPage === pagination.totalPages}
                    className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all duration-200 shadow-md hover:shadow-lg disabled:hover:shadow-md"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
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

              {/* Parts List */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  📦 Complete Parts List 
                  <span className="text-sm font-normal text-gray-500">({selectedSet.parts?.length} unique parts)</span>
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-200">
                      <tr className="text-left border-b-2 border-gray-300">
                        <th className="py-3 px-3 font-semibold">Part #</th>
                        <th className="py-3 px-3 font-semibold">Part Name</th>
                        <th className="py-3 px-3 font-semibold">Color</th>
                        <th className="py-3 px-3 text-right font-semibold">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSet.parts?.map((part, idx) => (
                        <tr key={idx} className="border-b hover:bg-white transition">
                          <td className="py-3 px-3 font-mono text-xs text-blue-600">{part.part_num}</td>
                          <td className="py-3 px-3 font-medium">{part.part_name}</td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-5 h-5 rounded border-2 border-gray-400 shadow-sm"
                                style={{ backgroundColor: `#${part.rgb}` }}
                                title={`RGB: #${part.rgb}`}
                              ></div>
                              <span className="text-sm">{part.color_name}</span>
                              {part.is_trans && <span className="text-xs text-purple-600">(transparent)</span>}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className="font-bold text-lg">{part.quantity}×</span>
                            {part.is_spare && <span className="text-xs text-green-600 ml-2">(spare)</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-xs text-gray-500 text-center">
                  This data demonstrates SQL JOINs across multiple tables (sets → inventories → inventory_parts → parts → colors)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t-4 border-blue-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/Logo.png" 
                alt="LEGO Logo" 
                className="h-12 w-12 object-contain"
              />
              <h3 className="text-2xl font-bold text-gray-800">LEGO Set Explorer</h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              Discover, Search, and Explore LEGO Sets from Around the World
            </p>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} LEGO Set Explorer. Built with React, Node.js, PostgreSQL & Docker.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LegoExplorer;
