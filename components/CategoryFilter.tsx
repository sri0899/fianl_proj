
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
  label: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onSelect, label }) => {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected === category
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
