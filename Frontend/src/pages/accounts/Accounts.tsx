import React from "react";

interface Account {
    id: string;
    name: string;
    institution: string;
    balance: number;
    lastUpdated: string;
    icon: string;
    color: string;
}

interface RecurringPayment {
    name: string;
    amount: number;
    frequency: string;
    nextDue: string;
    category: string;
}

const mockAccounts: Account[] = [
    { id: "1", name: "Checking", institution: "Schwab", balance: 15234.45, lastUpdated: "2h ago", icon: "💳", color: "bg-blue-500" },
    { id: "2", name: "Savings", institution: "Bank of America", balance: 8450.99, lastUpdated: "1d ago", icon: "💰", color: "bg-green-500" },
    { id: "3", name: "Emergency Fund", institution: "Capital One", balance: 5000.0, lastUpdated: "3d ago", icon: "🏦", color: "bg-purple-500" },
    { id: "4", name: "Credit Card", institution: "Chase", balance: -1234.56, lastUpdated: "30m ago", icon: "💳", color: "bg-red-500" },
    { id: "5", name: "Investment", institution: "Fidelity", balance: 34250.77, lastUpdated: "1w ago", icon: "📈", color: "bg-indigo-500" },
    { id: "6", name: "Retirement", institution: "Vanguard", balance: 78500.12, lastUpdated: "2w ago", icon: "🏖️", color: "bg-orange-500" },
];

const mockRecurringPayments: RecurringPayment[] = [
    { name: "Spotify", amount: 12.99, frequency: "Monthly", nextDue: "Jan 15", category: "Entertainment" },
    { name: "Netflix", amount: 15.99, frequency: "Monthly", nextDue: "Jan 18", category: "Entertainment" },
    { name: "Rent", amount: 1200, frequency: "Monthly", nextDue: "Feb 1", category: "Housing" },
    { name: "Car Insurance", amount: 150, frequency: "Monthly", nextDue: "Jan 25", category: "Insurance" },
    { name: "Gym Membership", amount: 45, frequency: "Monthly", nextDue: "Jan 12", category: "Health" },
];

const Accounts: React.FC = () => {
    const totalValue = mockAccounts.reduce((sum, acc) => sum + (acc.balance > 0 ? acc.balance : 0), 0);
    const totalDebt = mockAccounts.reduce((sum, acc) => sum + (acc.balance < 0 ? acc.balance : 0), 0);

    return (
        <div className="flex h-[calc(100vh-120px)] gap-6">
            {/* Left Side - Accounts Section */}
            <div className="flex-1 overflow-y-auto rounded-lg">
                <div className="sticky top-0 bg-gray-900 z-10 px-4 py-2 border-b border-gray-600">
                    <h1 className="text-2xl font-medium">Accounts</h1>
                </div>
                
                {/* Account Values and Debt */}
                <div className="px-4 py-4">
                    <div className="flex gap-16">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Account Value</p>
                            <h2 className="text-3xl font-medium">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Debt</p>
                            <h2 className="text-3xl font-medium text-red-400">${totalDebt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        </div>
                    </div>
                    <hr className="border-t border-gray-700 my-4" />
                </div>

                {/* Account List - Grouped by Category */}
                <div className="px-4 pb-4">
                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Cash</h2>
                    <div className="space-y-2 mb-6">
                        {mockAccounts.slice(0, 3).map((account) => (
                            <div 
                                key={account.id}
                                className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center text-lg`}>
                                            {account.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm">{account.name}</h3>
                                            <p className="text-xs text-gray-400">{account.institution}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p className="text-xs text-gray-400">{account.lastUpdated}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Credit Cards</h2>
                    <div className="space-y-2 mb-6">
                        {mockAccounts.slice(3, 4).map((account) => (
                            <div 
                                key={account.id}
                                className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center text-lg`}>
                                            {account.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm">{account.name}</h3>
                                            <p className="text-xs text-gray-400">{account.institution}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-red-400">${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p className="text-xs text-gray-400">{account.lastUpdated}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Investments</h2>
                    <div className="space-y-2 mb-6">
                        {mockAccounts.slice(4).map((account) => (
                            <div 
                                key={account.id}
                                className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center text-lg`}>
                                            {account.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm">{account.name}</h3>
                                            <p className="text-xs text-gray-400">{account.institution}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p className="text-xs text-gray-400">{account.lastUpdated}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Summary at Bottom */}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Net Worth</span>
                            <span className="text-xl font-medium">${(totalValue + totalDebt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Recurring Payments Section */}
            <div className="w-96 overflow-y-auto rounded-lg">
                <div className="sticky top-0 bg-gray-900 z-10 px-4 py-2 border-b border-gray-600">
                    <h1 className="text-2xl font-medium">Recurring Payments</h1>
                </div>

                <div className="px-4 py-4">
                    {/* Summary Stats */}
                    <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Monthly Total</p>
                        <h2 className="text-2xl font-medium">
                            ${mockRecurringPayments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                        </h2>
                    </div>

                    {/* Recurring Payments List */}
                    <div className="space-y-2">
                        {mockRecurringPayments.map((payment, index) => (
                            <div 
                                key={index}
                                className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-sm">{payment.name}</h3>
                                        <p className="text-xs text-gray-400 mt-0.5">{payment.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${payment.amount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-400 pt-2 border-t border-gray-700">
                                    <span>{payment.frequency}</span>
                                    <span>Due: {payment.nextDue}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;