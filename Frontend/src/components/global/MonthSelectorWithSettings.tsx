import React, { useState, useEffect, useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";

const MonthSelectorWithSettings: React.FC = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentMonthIndex = new Date().getMonth();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentMonthIndex);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePrev = () => {
    setSelectedMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNext = () => {
    setSelectedMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/Upload/json", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful!");
    } catch (err) {
      alert("Upload failed.");
      console.error(err);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // reset file input
      }
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    console.log("Selected month:", months[selectedMonthIndex]);
  }, [selectedMonthIndex]);

  return (
    <div className="flex items-center justify-between rounded-md text-white relative">
      {/* Month Selector */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrev}
          className="p-1 hover:bg-gray-700 rounded-full"
        >
          <ChevronLeftIcon fontSize="medium" />
        </button>

        <span className="text-lg font-medium">{months[selectedMonthIndex]}</span>

        <button
          onClick={handleNext}
          className="p-1 hover:bg-gray-700 rounded-full"
        >
          <ChevronRightIcon fontSize="medium" />
        </button>
      </div>

      {/* Settings w/ dropdown */}
      <div className="relative">
        <button
          className="p-2 hover:bg-gray-700 rounded-full"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <SettingsIcon fontSize="medium" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
            <button
              onClick={triggerUpload}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
            >
              Upload Transactions
            </button>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".json,.csv"
      />
    </div>
  );
};

export default MonthSelectorWithSettings;
