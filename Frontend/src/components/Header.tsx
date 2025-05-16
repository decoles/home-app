import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';

const Header: React.FC<{ username: string }> = ({ username }) => {
  return (
    <header className="w-full flex justify-between items-center bg-gray-800 h-12 px-4 border-b border-gray-700">
      <div className="text-white text-sm">
        Hello, <span className="font-medium">{username}</span>
      </div>
      <div className="flex items-center space-x-4 text-gray-300">
        <SettingsIcon className="hover:text-green-400 cursor-pointer" fontSize="small" />
        <LockIcon className="hover:text-green-400 cursor-pointer" fontSize="small" />
      </div>
    </header>
  );
};

export default Header;
