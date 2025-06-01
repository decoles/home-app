import React, { useRef, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

const Header: React.FC<{ username: string }> = ({ username }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
    setMenuOpen(false); // Close menu after selection
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/Upload/json', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Upload successful!');
    } catch (err) {
      alert('Upload failed.');
      console.error(err);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
      }
    }
  };

  return (
    <header className="w-full flex justify-between items-center bg-gray-800 h-12 px-4 border-b border-gray-700 relative">
      <div className="text-white text-sm">
        Hello, <span className="font-medium">{username}</span>
      </div>

      <div className="flex items-center space-x-4 text-gray-300 relative">
        {/* Settings Icon with Dropdown */}
        <div className="relative">
          <SettingsIcon
            className="hover:text-green-400 cursor-pointer"
            fontSize="small"
            onClick={toggleMenu}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-700 border border-gray-600 rounded shadow-lg z-50">
              <button
                onClick={handleUploadClick}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
              >
                Upload File
              </button>
            <button
              onClick={() => setTagModalOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tag Transactions
            </button>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <LockIcon className="hover:text-green-400 cursor-pointer" fontSize="small" />
      </div>
    </header>

    
  );
};

export default Header;
