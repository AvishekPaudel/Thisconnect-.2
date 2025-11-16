import { Search, MessageCircle, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const { user } = useContext(UserContext);
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TK</span>
            </div>
            <NavLink to="/foryou" 
              className="ml-2 text-xl font-bold text-gray-900 hover:underline">
              ThisKonnect
            </NavLink>

          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts, users, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink to="/messages" className="text-sm font-medium text-gray-700">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </button>
            </NavLink>

            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                class="w-10 h-10 rounded-full"
                alt="User avatar"
              />
                <NavLink to="/profile" 
                className="text-sm font-medium text-gray-700">
                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
            </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
