import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000/api';

function LegoExplorer() {
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

  // Fetch sets with filters
  useEffect(() => {
    setLoading(true);
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

    fetch(`${API_BASE_URL}/sets?${params}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSets(data.data);
          setPagination(data.pagination);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sets:', err);
        setLoading(false);
      });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-100 to-red-100 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <img 
              src="/Logo.png" 
              alt="LEGO Logo" 
              className="h-32 w-32 object-contain flex-shrink-0"
            />
            <div>
              <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-3">
                LEGO Set Explorer
              </h1>
              <p className="text-gray-700 mt-3 text-lg">
                Discover, Search, and Explore LEGO Sets from Around the World
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      {stats && (
        <div className="bg-white shadow-md border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{stats.total_sets?.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Total Sets</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{stats.total_themes}</div>
                <div className="text-sm text-gray-600 mt-1">Themes</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{stats.total_unique_parts?.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Unique Parts</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{stats.avg_parts_per_set?.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Avg Parts per Set</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">{stats.earliest_year} - {stats.latest_year}</div>
                <div className="text-sm text-gray-600 mt-1">Year Range</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">🔍 Search & Filter Options</h2>
            <span className="text-sm text-gray-500">
              {pagination && `${pagination.total} sets found`}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔎 Search by Name
              </label>
              <input
                type="text"
                placeholder="e.g., Millennium Falcon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🎨 Theme Category
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Year From
              </label>
              <input
                type="number"
                placeholder="e.g., 2020"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Year To
              </label>
              <input
                type="number"
                placeholder="e.g., 2024"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🧩 Min. Parts
              </label>
              <input
                type="number"
                placeholder="e.g., 100"
                value={minParts}
                onChange={(e) => setMinParts(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🧩 Max. Parts
              </label>
              <input
                type="number"
                placeholder="e.g., 5000"
                value={maxParts}
                onChange={(e) => setMaxParts(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="year">Year</option>
                <option value="name">Name</option>
                <option value="num_parts">Number of Parts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ↕️ Sort Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="DESC">Newest First</option>
                <option value="ASC">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-3 items-center">
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition font-medium"
            >
              🔄 Reset Filters
            </button>
            <div className="text-sm text-gray-500 italic">
              Tip: Try searching for "star" or filter by "Star Wars" theme
            </div>
          </div>
        </div>

        {/* Sets Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading LEGO sets from database...</p>
            <p className="mt-2 text-gray-500 text-sm">Executing optimized SQL queries with indexes</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sets.map(set => (
                <div
                  key={set.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                  onClick={() => fetchSetDetails(set.set_num)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                    {set.img_url ? (
                      <img
                        src={set.img_url}
                        alt={set.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300?text=LEGO';
                        }}
                      />
                    ) : (
                      <div className="text-6xl">🧱</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1 font-mono">#{set.set_num}</div>
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 h-12">{set.name}</h3>
                    <div className="flex justify-between items-center text-sm mt-3">
                      <span className="text-blue-600 font-medium">📅 {set.year}</span>
                      <span className="text-gray-600">🧩 {set.num_parts} parts</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-medium">
                        {set.theme_name}
                      </span>
                      <span className="text-xs text-gray-500">Click for details</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * 20) + 1} - {Math.min(currentPage * 20, pagination.total)} of {pagination.total} sets
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    ← Previous
                  </button>
                  <div className="flex items-center px-6 bg-red-600 text-white rounded-md font-medium">
                    Page {currentPage} of {pagination.totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                    disabled={currentPage === pagination.totalPages}
                    className="px-6 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
                      <div className="font-semibold text-lg">📅 {selectedSet.year}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="text-gray-600 text-sm">Theme:</span>
                      <div className="font-semibold text-lg">🎨 {selectedSet.theme_name}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <span className="text-gray-600 text-sm">Total Parts Count:</span>
                      <div className="font-bold text-2xl text-red-600">🧩 {selectedSet.num_parts?.toLocaleString()}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <span className="text-gray-600 text-sm">Unique Parts Types:</span>
                      <div className="font-semibold text-lg">📦 {selectedSet.parts_count}</div>
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
                  💡 This data demonstrates SQL JOINs across multiple tables (sets → inventories → inventory_parts → parts → colors)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LegoExplorer;
