import React from "react";
import TransactionsTable, { Transaction } from "../../components/transactions/TransactionTable";

const mockTransactions: Transaction[] = [
    { date: "2025-09-01", name: "Spotify", amount: 12.99, category: "Entertainment", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-30", name: "Paycheck", amount: 2500, category: "Income", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-29", name: "Starbucks", amount: 5.75, category: "Food & Drink", recurring: false, included: true, type: "Withdrawl" },
    { date: "2025-08-28", name: "Rent", amount: 1200, category: "Housing", recurring: true, included: true, type: "Deposit" },
    { date: "2025-09-01", name: "Spotify", amount: 12.99, category: "Entertainment", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-30", name: "Paycheck", amount: 2500, category: "Income", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-29", name: "Starbucks", amount: 5.75, category: "Food & Drink", recurring: false, included: true, type: "Withdrawl" },
    { date: "2025-08-28", name: "Rent", amount: 1200, category: "Housing", recurring: true, included: true, type: "Deposit" },
    { date: "2025-09-01", name: "Spotify", amount: 12.99, category: "Entertainment", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-30", name: "Paycheck", amount: 2500, category: "Income", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-29", name: "Starbucks", amount: 5.75, category: "Food & Drink", recurring: false, included: true, type: "Withdrawl" },
    { date: "2025-08-28", name: "Rent", amount: 1200, category: "Housing", recurring: true, included: true, type: "Deposit" },
    { date: "2025-09-01", name: "Spotify", amount: 12.99, category: "Entertainment", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-30", name: "Paycheck", amount: 2500, category: "Income", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-29", name: "Starbucks", amount: 5.75, category: "Food & Drink", recurring: false, included: true, type: "Withdrawl" },
    { date: "2025-08-28", name: "Rent", amount: 1200, category: "Housing", recurring: true, included: true, type: "Deposit" },
    { date: "2025-09-01", name: "Spotify", amount: 12.99, category: "Entertainment", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-30", name: "Paycheck", amount: 2500, category: "Income", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-29", name: "Starbucks", amount: 5.75, category: "Food & Drink", recurring: false, included: true, type: "Withdrawl" },
    { date: "2025-08-28", name: "Rent", amount: 1200, category: "Housing", recurring: true, included: true, type: "Deposit" },
    { date: "2025-09-01", name: "Spotify", amount: 12.99, category: "Entertainment", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-30", name: "Paycheck", amount: 2500, category: "Income", recurring: true, included: true, type: "Withdrawl" },
    { date: "2025-08-29", name: "Starbucks", amount: 5.75, category: "Food & Drink", recurring: false, included: true, type: "Withdrawl" },
    { date: "2025-08-28", name: "Rent", amount: 1200, category: "Housing", recurring: true, included: true, type: "Deposit" },

];

const Transactions: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-120px)] gap-4">
      {/* Left side: Scrollable Transactions Table */}
      <div className="flex-1 overflow-y-auto  rounded-lg">
        <div className="sticky top-0 bg-gray-900 z-10 px-4 py-2 border-b border-gray-600">
          <h1 className="text-2xl font-medium">Transactions</h1>
        </div>
        <TransactionsTable transactions={mockTransactions} />
      </div>

      {/* Right side: Summary / Placeholder */}
      <div className="w-1/3 p-4">
        <h2 className="text-lg font-semibold">Summary / Other Content</h2>
        <p className="text-sm text-gray-400">This section stays fixed, while the table scrolls independently.</p>
      </div>
    </div>
  );
};

export default Transactions;