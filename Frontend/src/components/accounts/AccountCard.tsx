import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Example icon

export interface AccountCardProps {
  institution: string;
  accountName: string;
  lastUpdated: string;
  balance: number;
}

const AccountCard: React.FC<AccountCardProps> = ({
  institution,
  accountName,
  lastUpdated,
  balance,
}) => {
  return (
    <div className="flex items-center justify-between text-white rounded-xl p-4 mb-4 mr-10">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {/* Round icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700">
          <AccountBalanceIcon fontSize="medium" />
        </div>

        {/* Institution + account details */}
        <div>
          <h3 className="text-lg font-semibold">{institution}</h3>
          <p className="text-sm text-gray-400">
            {accountName} <span className="mx-1">•</span> {lastUpdated}
          </p>
        </div>
      </div>

      {/* Right side: Balance */}
      <h2 className="text-2xl font-bold">${balance.toLocaleString()}</h2>
    </div>
  );
};

export default AccountCard;
