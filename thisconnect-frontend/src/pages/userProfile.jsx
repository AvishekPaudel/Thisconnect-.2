import { Heart, MessageSquare } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [userProfile, setUserProfile] = useState(null);
  
    useEffect(() => {
      const getProfile = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/posts/profile', { withCredentials: true });
          setUserProfile(response.data.user);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
  
      getProfile();
    }, []);

  const posts = [
    { 
      id: 6, 
      image: { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop' },
      title: 'Tropical Beach',
      subtitle: 'Paradise found on this pristine tropical beach with crystal clear waters',
      genre: 'Paradise',
      user: { firstName: 'Alex', lastName: 'Johnson' },
      likes: 201,
      comments: 11,
      timeAgo: '4d'
    }
  ];

  const user = {
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    name: 'Alex Johnson'
  };

  const truncateWords = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

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

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Profile Header */}
      <div className="px-4 py-8">
        <div className="flex items-center gap-8 mb-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-light ">
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

      {/* Posts Grid */}
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="flex justify-center">
              <div
                className="rounded-xl shadow bg-white p-4 flex flex-col"
                style={{ width: 400, height: 500 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h2 className="font-semibold">{post.user.firstName} {post.user.lastName}</h2>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-left">{post.title}</h3>
                <p className="text-gray-600 flex-grow text-left">{truncateWords(post.subtitle, 10)}</p>

                {post.image && post.image.url && (
                  <img
                    src={post.image.url}
                    alt={post.title}
                    className="w-full h-60 object-cover rounded-lg" 
                  />
                )}

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-white ${getGenreColor(post.genre)}`}>
                      {post.genre}
                    </span>
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                        likedPosts.has(post.id) 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart 
                        size={16} 
                        className={likedPosts.has(post.id) ? 'fill-current' : ''} 
                      />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <MessageSquare size={16} />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <span className="text-gray-500">{post.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;