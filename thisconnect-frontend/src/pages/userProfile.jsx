import { useState, useEffect } from 'react';
import axios from 'axios';
import UserPost from '../components/userPost';
import { NavLink } from "react-router";


const UserProfile = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/profile', { withCredentials: true });
        setUserProfile(response.data.user);
        const postsResponse = await axios.get('http://localhost:8000/api/posts/profile/posts', { withCredentials: true });
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    getProfile();
  }, []);

  const getGenreColor = (genre) => {
    const colors = {
      'Travel': 'bg-blue-500',
      'Nature': 'bg-green-500',
      'Adventure': 'bg-orange-500',
      'Photography': 'bg-purple-500',
      'Paradise': 'bg-pink-500'
    };
    return colors[genre] || 'bg-gray-500';
  };

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handlePlusClick = () => {
    // Add your functionality here (e.g., add story, upload photo, etc.)
    console.log('Plus icon clicked!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Profile Header */}
      <div className="px-4 text-left">
        <div className="flex items-center gap-8 mb-6">
          {/* Profile Picture with Ring and Plus Icon */}
          <div className="flex-shrink-0 relative">
            {/* Avatar with gradient ring */}
            <div className="w-36 h-36 rounded-full bg-gray-100 p-1">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            
            {/* Plus Icon */}
            <NavLink
              to="/feed"
              className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 border-4 border-white"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4v16m8-8H4" 
                />
              </svg>
            </NavLink>
          </div>

          {/* Profile Info */}
          <div>
            <h1 className="text-2xl mb-9">
              {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Loading...'}
            </h1>
            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-xl font-semibold">{posts.length}</span>
                <span className="text-gray-500 text-sm">posts</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-semibold">12.5k</span>
                <span className="text-gray-500 text-sm">followers</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-semibold">1,284</span>
                <span className="text-gray-500 text-sm">following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-4 pb-10">
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            {post.image?.url && (
              <img
                src={post.image.url}
                alt={post.title}
                className="w-full h-75 object-cover"
              />
            )}
            {/* <div className="p-4">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.subtitle}</p>
              {post.genre && (
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-medium text-white rounded-full ${getGenreColor(post.genre)}`}
                >
                  {post.genre}
                </span>
              )}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;