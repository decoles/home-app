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
    <div className="w-full overflow-x-auto mt-4 max-h-[calc(100vh-200px)] overflow-y-auto rounded-lg">
      <table className="w-full min-w-full bg-gray-900 text-white border-collapse">
        <thead className="bg-gray-900">
          <tr className="text-left border-b border-gray-600">
            <th className="sticky top-0 px-4 py-2 bg-gray-900 z-10">Date</th>
            <th className="sticky top-0 px-4 py-2 bg-gray-900 z-10">Name</th>
            <th className="sticky top-0 px-4 py-2 bg-gray-900 z-10">Amount</th>
            <th className="sticky top-0 px-4 py-2 bg-gray-900 z-10">Category</th>
            <th className="sticky top-0 px-4 py-2 bg-gray-900 z-10">Recurring</th>
            <th className="sticky top-0 px-4 py-2 bg-gray-900 z-10">Included</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr
              key={index}
              className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
              onClick={() => alert(`Clicked on ${tx.name}`)}
            >
              <td className="px-4 py-2">{tx.date}</td>
              <td className="px-4 py-2 flex items-center">
                <AccountBalanceWalletIcon className="mr-2 text-blue-400" fontSize="small" />
                {tx.name}
              </td>
              <td className="px-4 py-2">${tx.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{tx.category}</td>
              <td className="px-4 py-2">{tx.recurring ? "Yes" : "No"}</td>
              <td className="px-4 py-2">{tx.included ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
