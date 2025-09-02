import React from "react";
import AccountSummary from "../../components/accounts/AccountsSummary";
import AccountCard from "../../components/accounts/AccountCard";

const Accounts: React.FC = () => {
    return (
        <div className="w-screen h-screen bg-gray-900 text-white overflow-hidden ">
            <div className="flex justify-between items-center p-4">
            </div>

            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <h1 className="text-4xl font-sans font-medium">Accounts</h1>
            </div>

            {/* Account Values and Debt  */}
            <div className="flex mt-[2%]">
                <div className="mr-[12%]">
                    <p className="text-xl mb-2">Total Account Value</p>
                    <h1 className="text-4xl font-sans font-medium">$12,345.67</h1>
                </div>
                <div>
                    <p className="text-xl mb-2">Total Debt</p>
                    <h1 className="text-4xl font-sans font-medium">$-1,345.67</h1>
                </div>
            </div>
            <hr className="border-t border-gray-600 my-4" />
            <div className="flex justify-between mt-[2%]">
                {/* Account List */}
                {/* TODO: Make this into a config from backend. */}
                <div className="w-1/2">
                    <h2 className="text-base font-sans font-medium">Checking</h2>
                    <AccountCard
                        institution="Schwab"
                        accountName="Checking"
                        lastUpdated="2h ago"
                        balance={15234.45}
                    />

                    <h2 className="text-base font-sans font-medium">Savings</h2>
                    <AccountCard
                        institution="Bank of America"
                        accountName="Savings"
                        lastUpdated="1d ago"
                        balance={8450.99}
                    />

                    <h2 className="text-base font-sans font-medium">Emergency</h2>
                    <AccountCard
                        institution="Capital One"
                        accountName="Emergency Fund"
                        lastUpdated="3d ago"
                        balance={5000.0}
                    />

                    <h2 className="text-base font-sans font-medium">Credit Cards</h2>
                    <AccountCard
                        institution="Chase"
                        accountName="Credit Card"
                        lastUpdated="30m ago"
                        balance={-1234.56}
                    />

                    <h2 className="text-base font-sans font-medium">Investment</h2>
                    <AccountCard
                        institution="Fidelity"
                        accountName="Investment"
                        lastUpdated="1w ago"
                        balance={34250.77}
                    />

                    <h2 className="text-base font-sans font-medium">Retirement</h2>
                    <AccountCard
                        institution="Vanguard"
                        accountName="Retirement"
                        lastUpdated="2w ago"
                        balance={78500.12}
                    />

                </div>

                {/* Account Summary */}
                <div className="w-1/2">
                    <AccountSummary totalBudgeted={15000} totalSpent={13456} />
                </div>
            </div>


        </div>
    );
};

export default Accounts;
