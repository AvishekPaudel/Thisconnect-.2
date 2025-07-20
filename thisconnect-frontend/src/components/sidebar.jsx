import React from 'react';

export default function Sidebar({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Genres</h3>
      <div className="space-y-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedGenre === genre
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
