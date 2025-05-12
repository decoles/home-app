import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const items = [
    { name: 'Financial', icon: <AttachMoneyIcon fontSize="large" /> },
    { name: 'Lists', icon: <ListAltIcon fontSize="large" /> },
  ];

  return (
    <footer className="w-full h-24 bg-gray-800 border-t border-gray-700 flex justify-around items-center">
      {items.map(({ name, icon }) => (
        <div
          key={name}
          className="flex flex-col items-center text-gray-300 hover:text-green-400 cursor-pointer"
          onClick={() => onNavigate(name.toLowerCase())}
        >
          {icon}
          <span className="text-sm mt-1">{name}</span>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
