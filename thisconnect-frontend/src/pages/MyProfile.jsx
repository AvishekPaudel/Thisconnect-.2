import { useState, useEffect } from 'react';
import axios from 'axios';
import UserPost from '../components/userPost';
import PostModal from '../components/postModal';
import PostsModal from '../components/postModal';
import { NavLink } from "react-router";
import Navbar from '../components/navbar';
import UserSidebar from '../components/userSidebar';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(UserContext)

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

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handlePlusClick = () => {
    // Add your functionality here (e.g., add story, upload photo, etc.)
    console.log('Plus icon clicked!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
        <div className="flex">
          <UserSidebar userProfile={userProfile} />
          <div className="flex-1 ml-64">
        </div>
    </div>
      {/* Profile Header */}
      <div className="px-4 py-8">
        <div className="flex items-center gap-8 mb-6">
          {/* Profile Picture with Ring and Plus Icon */}
          <div className="flex-shrink-0 relative">
            {/* Avatar with gradient ring */}
            <div className="w-36 h-36 rounded-full bg-gray-100 p-1">
              <img 
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      class="w-full h-full rounded-full object-cover border-2 border-gray-100"
                      alt="User avatar"
                    />
            </div>
            
            {/* Plus Icon */}
            <NavLink
              to="/CreatePost"
              className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 border-4 border-gray-100"
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
                <span className="block text-xl font-semibold">{user.followers?.length}</span>
                <span className="text-gray-500 text-sm">followers</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-semibold">{user.following?.length }</span>
                <span className="text-gray-500 text-sm">following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-10">
        {posts.map((post) => (
          <div 
            key={post._id} 
            className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            {post.image?.url && (
              <img
                src={post.image.url}
                alt={post.title}
                className="w-full h-75 object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Post Modal */}
      <PostsModal 
        post={selectedPost} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default UserProfile;