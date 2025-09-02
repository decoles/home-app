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
        <div className="w-full h-full bg-gray-900 text-white overflow-auto">
            {/* Header */}
            <div className="flex justify-between items-center w-full mb-4">
                <h1 className="text-4xl font-sans font-medium">Transactions</h1>
            </div>
            
            <div className="w-full overflow-x-auto">
                <TransactionsTable transactions={mockTransactions} />
            </div>
        </div>
    );
};

export default Transactions;
