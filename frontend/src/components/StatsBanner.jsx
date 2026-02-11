import React from 'react';

const cardClass = 'bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-red-200';
const labelClass = 'text-xs font-semibold text-gray-700 uppercase tracking-wide';
const valueClass = 'text-2xl font-bold text-red-600 mb-1';

function StatsBanner({ stats }) {
  if (!stats) return null;

  return (
    <div className="bg-white shadow-lg border-b-4 border-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className={cardClass}>
            <div className={valueClass}>{stats.total_sets?.toLocaleString()}</div>
            <div className={labelClass}>Total Sets</div>
          </div>
          <div className={cardClass}>
            <div className={valueClass}>{stats.total_themes}</div>
            <div className={labelClass}>Themes</div>
          </div>
          <div className={cardClass}>
            <div className={valueClass}>{stats.total_unique_parts?.toLocaleString()}</div>
            <div className={labelClass}>Unique Parts</div>
          </div>
          <div className={cardClass}>
            <div className={valueClass}>{stats.avg_parts_per_set?.toLocaleString()}</div>
            <div className={labelClass}>Avg Parts/Set</div>
          </div>
          <div className={cardClass}>
            <div className={valueClass}>{stats.earliest_year} - {stats.latest_year}</div>
            <div className={labelClass}>Year Range</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsBanner;
