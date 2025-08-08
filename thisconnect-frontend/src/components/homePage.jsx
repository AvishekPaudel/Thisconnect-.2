import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./navbar";
import PostCard from './postcard';
import Sidebar from './sidebar';
import FriendsList from './friends';

export default function SocialHomePage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [friends, setFriends] = useState([
    { name: 'Alice', avatar: 'https://via.placeholder.com/150', status: 'online' },
    { name: 'Bob', avatar: 'https://via.placeholder.com/150', status: 'away' },
    { name: 'Charlie', avatar: 'https://via.placeholder.com/150', status: 'offline' },
    {name: 'Subhramaniyam', avatar: 'https://via.placeholder.com/150', status: 'offline' },
  ]);

  const user = JSON.parse(localStorage.getItem('user'));

  const genres = [
    'All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 
    'Documentary', 'Biography', 'History', 'Music', 'Sports'
  ];

  const getGenreColor = (genre) => {
    const colors = {
      'Action': 'bg-red-500',
      'Adventure': 'bg-green-500',
      'Comedy': 'bg-yellow-500',
      'Drama': 'bg-purple-500',
      'Fantasy': 'bg-pink-500',
      'Horror': 'bg-gray-800',
      'Mystery': 'bg-indigo-500',
      'Romance': 'bg-rose-500',
      'Sci-Fi': 'bg-blue-500',
      'Thriller': 'bg-red-700',
      'Documentary': 'bg-teal-500',
      'Biography': 'bg-amber-500',
      'History': 'bg-brown-500',
      'Music': 'bg-violet-500',
      'Sports': 'bg-orange-500'
    };
    return colors[genre] || 'bg-gray-500';
  };

  // Fetch posts when selectedGenre changes
  useEffect(() => {
    const fetchPostsByGenre = async () => {
      setLoading(true);
      setError(null);

      try {
        const genreParam = selectedGenre.toLowerCase();
        const url = genreParam === 'all' 
          ? 'http://localhost:8000/api/posts' 
          : `http://localhost:8000/api/posts/genre/${selectedGenre}`;

        const response = await axios.get(url);
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByGenre();
  }, [selectedGenre]);

  // Filter posts client-side by search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <Sidebar
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />

          {/* Main Content */}
          <div className="flex-1 max-w-2xl space-y-6">
            {loading ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post._id} post={post} getGenreColor={getGenreColor} />
              ))
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}
          </div>
          
          {/* Friends List */}
          <FriendsList friends={friends} />

        </div>
      </div>
    </div>
  );
}
