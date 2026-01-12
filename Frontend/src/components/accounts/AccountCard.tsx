import React from "react";

export interface AccountCardProps {
  institution: string;
  accountName: string;
  lastUpdated: string;
  balance: number;
  icon?: string;
  color?: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  institution,
  accountName,
  lastUpdated,
  balance,
  icon = "💳",
  color = "bg-blue-500",
}) => {
  const isNegative = balance < 0;
  const displayBalance = Math.abs(balance);

  return (
    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-lg`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{accountName}</h3>
            <p className="text-xs text-gray-400">{institution}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-medium ${isNegative ? 'text-red-400' : ''}`}>
            ${displayBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400">{lastUpdated}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;