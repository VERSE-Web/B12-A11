import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Wedding', 'Birthday', 'Corporate', 'Festival', 'Housewarming', 'Luxury Gala'];

export const FilterPanel = ({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onPriceChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="bg-white dark:bg-[#1E293B] p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Filter className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          Filter Services
        </h3>
        <span className="text-xs text-slate-400">Refine Search</span>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Max Budget
          </label>
          <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
            ${maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="300"
          max="4000"
          step="100"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-violet-600 bg-slate-200 dark:bg-slate-700 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>$300</span>
          <span>$4,000</span>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Sort Results
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="popularity">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest Additions</option>
        </select>
      </div>
    </div>
  );
};
