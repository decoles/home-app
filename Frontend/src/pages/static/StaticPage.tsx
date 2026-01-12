import React, { useState } from "react";
import SearchBar from "../../components/global/SearchBar";
import SettingsIcon from "../../components/global/MonthSelectorWithSettings";
import Accounts from "../accounts/Accounts";

const StaticPage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("budget");

  const renderPage = () => {
    switch (activePage) {
      case "accounts":
        return <Accounts />;
      default:
        return <Accounts />;
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-900 text-white overflow-hidden flex">
      {/* <SideBar activePage={activePage} setActivePage={setActivePage} /> */}
      
      <div className="flex-1">
        <div className="ml-[5%] mt-[2%] mr-[5%] flex justify-between items-center">
          <SearchBar />
          <SettingsIcon />
        </div>
        
        <div className="ml-[5%] mt-[2%] mr-[5%]"> 
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default StaticPage;