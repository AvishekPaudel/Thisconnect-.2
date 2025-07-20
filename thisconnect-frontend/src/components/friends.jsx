import React from 'react';

export default function FriendsList({ friends }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 w-64 h-95">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Friends</h3>
      <div className="space-y-3">
        {friends.map((friend, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <div className="relative">
              <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full" />
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                friend.status === 'online' ? 'bg-green-500' :
                friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{friend.name}</p>
              <p className="text-xs text-gray-500 capitalize">{friend.status}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
        See all friends
      </button>
    </div>
  );
}
