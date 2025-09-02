import React from "react";
import SearchBar from "../../components/global/SearchBar";
import SettingsIcon from "../../components/global/MonthSelectorWithSettings";
import Financial from "../budget/Budget";
import Accounts from "../accounts/Accounts";
import Transactions from "../transactions/Transactions";

const StaticPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 text-white overflow-hidden">
      <div className="ml-[5%] mt-[2%] mr-[5%] flex justify-between items-center">
        <SearchBar />
        <SettingsIcon />
      </div>
      
      {/* Put the changing pages here. */}
      <div className="ml-[5%] mt-[2%] mr-[5%]"> 
        <Transactions />
      </div>

    </div>
  );
};

export default StaticPage;
