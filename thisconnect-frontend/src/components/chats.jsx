import React from 'react';

export default function RecentChats({ friends }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Chats</h3>
      <div className="space-y-3">
        {friends.slice(0, 3).map((friend, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{friend.name}</p>
              <p className="text-xs text-gray-500 truncate">Hey, how's it going?</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
        Open messenger
      </button>
    </div>
  );
}
