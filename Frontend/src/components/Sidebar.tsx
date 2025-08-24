import React, { useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const menuItems = [
  { name: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
  { name: "Spending", icon: <AttachMoneyIcon fontSize="small" /> },
  { name: "Budget", icon: <AccountBalanceWalletIcon fontSize="small" /> },
  { name: "Accounts", icon: <CreditCardIcon fontSize="small" /> },
  { name: "Transactions", icon: <ListAltIcon fontSize="small" /> },
  { name: "Recurring", icon: <AutorenewIcon fontSize="small" /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 m-2 rounded bg-gray-800 hover:bg-gray-700 flex justify-center items-center self-start"
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col mt-4 gap-1">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer w-max"
          >
            {item.icon}
            {!collapsed && (
              <span className="whitespace-nowrap">{item.name}</span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
