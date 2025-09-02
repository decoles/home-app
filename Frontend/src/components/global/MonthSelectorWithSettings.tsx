import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";

const MonthSelectorWithSettings: React.FC = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentMonthIndex = new Date().getMonth();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentMonthIndex);
  
  //   try {
  //     await axios.post('/api/Upload/json', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     alert('Upload successful!');
  //   } catch (err) {
  //     alert('Upload failed.');
  //     console.error(err);
  //   } finally {
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = ''; // Clear file input
  //     }
  //   }
  // };

  const handlePrev = () => {
    setSelectedMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNext = () => {
    setSelectedMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  useEffect(() => {
    console.log("Selected month:", months[selectedMonthIndex]);
  }, [selectedMonthIndex]);

  return (
    <div className="flex items-center justify-between rounded-md text-white">
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

      {/* Settings Icon */}
      <button className="p-2 hover:bg-gray-700 rounded-full">
        <SettingsIcon fontSize="medium" />
      </button>
    </div>
  );
};

export default MonthSelectorWithSettings;
