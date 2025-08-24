import React from "react";
import SearchBar from "../components/global/SearchBar";
import MonthSelector from "../components/global/MonthSelector";

const StaticPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 text-white overflow-hidden">
        <div className="ml-[2%] mt-[2%] flex justify-between items-center p-4">
            <SearchBar />
            <MonthSelector />
        </div>
    </div>
  );
};

export default StaticPage;
