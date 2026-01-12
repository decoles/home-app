import React, { useEffect, useState } from "react";
import AccountCard from "../../components/accounts/AccountCard";

interface Account {
    nickName: string;
    accountValue: number;
    type: string;
}

interface RecurringPayment {
    name: string;
    amount: number;
    frequency: string;
    nextDue: string;
    category: string;
}

const mockRecurringPayments: RecurringPayment[] = [
    { name: "Spotify", amount: 12.99, frequency: "Monthly", nextDue: "Jan 15", category: "Entertainment" },
    { name: "Netflix", amount: 15.99, frequency: "Monthly", nextDue: "Jan 18", category: "Entertainment" },
    { name: "Rent", amount: 1200, frequency: "Monthly", nextDue: "Feb 1", category: "Housing" },
    { name: "Car Insurance", amount: 150, frequency: "Monthly", nextDue: "Jan 25", category: "Insurance" },
    { name: "Gym Membership", amount: 45, frequency: "Monthly", nextDue: "Jan 12", category: "Health" },
];

// Helper function to get icon and color based on account type
const getAccountStyle = (type: string) => {
    switch (type.toLowerCase()) {
        case "savings":
            return { icon: "💰", color: "bg-green-500" };
        case "emergency fund":
            return { icon: "🏦", color: "bg-purple-500" };
        case "investment":
            return { icon: "📈", color: "bg-indigo-500" };
        case "checking":
            return { icon: "💳", color: "bg-blue-500" };
        case "credit card":
            return { icon: "💳", color: "bg-red-500" };
        case "retirement":
            return { icon: "🏖️", color: "bg-orange-500" };
        default:
            return { icon: "💵", color: "bg-gray-500" };
    }
};

const Accounts: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch('/api/Financial/account-value-and-nickname');
                if (!response.ok) {
                    throw new Error('Failed to fetch accounts');
                }
                const data = await response.json();
                setAccounts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const totalValue = accounts.reduce((sum, acc) => sum + (acc.accountValue > 0 ? acc.accountValue : 0), 0);
    const totalDebt = accounts.reduce((sum, acc) => sum + (acc.accountValue < 0 ? acc.accountValue : 0), 0);

    // Group accounts by type
    const checkingAccounts = accounts.filter(acc => acc.type === "Checking");
    const savingsAccounts = accounts.filter(acc => acc.type === "Savings");
    const emergencyAccounts = accounts.filter(acc => acc.type === "Emergency Fund");
    const investmentAccounts = accounts.filter(acc => acc.type === "Investment");
    const creditCardAccounts = accounts.filter(acc => acc.type === "Credit Card");

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
                            {loading ? (
                                <h2 className="text-3xl font-medium">Loading...</h2>
                            ) : error ? (
                                <h2 className="text-3xl font-medium text-red-400">Error</h2>
                            ) : (
                                <h2 className="text-3xl font-medium">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                            )}
                        </div>
                    </div>
                    <hr className="border-t border-gray-700 my-4" />
                </div>

                {/* Account List - Grouped by Category */}
                <div className="px-4 pb-4">
                    {loading ? (
                        <div className="text-center py-8 text-gray-400">Loading accounts...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-400">{error}</div>
                    ) : (
                        <>
                            {checkingAccounts.length > 0 && (
                                <>
                                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Checking</h2>
                                    <div className="space-y-2 mb-6">
                                        {checkingAccounts.map((account, index) => {
                                            const style = getAccountStyle(account.type);
                                            return (
                                                <AccountCard
                                                    key={index}
                                                    institution="Bank Account"
                                                    accountName={account.nickName}
                                                    lastUpdated="Recently"
                                                    balance={account.accountValue}
                                                    icon={style.icon}
                                                    color={style.color}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {savingsAccounts.length > 0 && (
                                <>
                                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Savings</h2>
                                    <div className="space-y-2 mb-6">
                                        {savingsAccounts.map((account, index) => {
                                            const style = getAccountStyle(account.type);
                                            return (
                                                <AccountCard
                                                    key={index}
                                                    institution="Bank Account"
                                                    accountName={account.nickName}
                                                    lastUpdated="Recently"
                                                    balance={account.accountValue}
                                                    icon={style.icon}
                                                    color={style.color}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {emergencyAccounts.length > 0 && (
                                <>
                                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Emergency Fund</h2>
                                    <div className="space-y-2 mb-6">
                                        {emergencyAccounts.map((account, index) => {
                                            const style = getAccountStyle(account.type);
                                            return (
                                                <AccountCard
                                                    key={index}
                                                    institution="Emergency Fund"
                                                    accountName={account.nickName}
                                                    lastUpdated="Recently"
                                                    balance={account.accountValue}
                                                    icon={style.icon}
                                                    color={style.color}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {creditCardAccounts.length > 0 && (
                                <>
                                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Credit Cards</h2>
                                    <div className="space-y-2 mb-6">
                                        {creditCardAccounts.map((account, index) => {
                                            const style = getAccountStyle(account.type);
                                            return (
                                                <AccountCard
                                                    key={index}
                                                    institution="Credit Card"
                                                    accountName={account.nickName}
                                                    lastUpdated="Recently"
                                                    balance={account.accountValue}
                                                    icon={style.icon}
                                                    color={style.color}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {investmentAccounts.length > 0 && (
                                <>
                                    <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Investments</h2>
                                    <div className="space-y-2 mb-6">
                                        {investmentAccounts.map((account, index) => {
                                            const style = getAccountStyle(account.type);
                                            return (
                                                <AccountCard
                                                    key={index}
                                                    institution="Investment Account"
                                                    accountName={account.nickName}
                                                    lastUpdated="Recently"
                                                    balance={account.accountValue}
                                                    icon={style.icon}
                                                    color={style.color}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            
                        </>
                    )}

                    {/* Total Summary at Bottom */}
                    {!loading && !error && (
                        <div className="mt-6 pt-4 border-t border-gray-700">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Net Worth</span>
                                <span className="text-xl font-medium">${(totalValue + totalDebt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    )}
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