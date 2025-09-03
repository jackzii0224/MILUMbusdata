import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
          <div className="text-lg text-gray-700 text-center sm:text-left">
            Welcome, <span className="font-semibold block sm:inline break-all">{user.username}</span>
          </div>
          <button
            onClick={onLogout}
            className="w-full sm:w-auto px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
