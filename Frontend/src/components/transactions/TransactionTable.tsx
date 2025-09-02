import React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export interface Transaction {
  date: string;
  name: string;
  amount: number;
  category: string;
  recurring: boolean;
  included: boolean;
  type: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="w-full min-w-full bg-gray-900 text-white">
        <thead>
          <tr className="text-left border-b border-gray-600">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Recurring</th>
            <th className="px-4 py-2">Included</th>
            <th className="px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="px-4 py-2">{tx.date}</td>
              <td className="px-4 py-2 flex items-center">
                <AccountBalanceWalletIcon className="mr-2 text-blue-400" fontSize="small" />
                {tx.name}
              </td>
              <td className="px-4 py-2">${tx.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{tx.category}</td>
              <td className="px-4 py-2">{tx.recurring ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{tx.included ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{tx.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
