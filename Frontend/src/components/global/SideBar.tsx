import React from "react";

interface SideBarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: "budget", label: "Budget" },
    { id: "accounts", label: "Accounts" },
    { id: "transactions", label: "Transactions" },
    { id: "recurring", label: "Recurring" },
  ];

  return (
    <div className="w-64 bg-gray-800 rounded-lg p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;