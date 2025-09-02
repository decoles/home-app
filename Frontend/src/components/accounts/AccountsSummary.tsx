export interface SummaryProps {
    totalBudgeted: number;
    totalSpent: number;
}

const AccountSummary: React.FC<SummaryProps> = ({ totalBudgeted, totalSpent }) => {
    const remaining = totalBudgeted - totalSpent;
    const spentPercent = Math.min((totalSpent / totalBudgeted) * 100, 100);

    return (
        <div className="ml-[3%] relative w-full max-w-sm rounded-lg text-white">
            {/* Glowing background behind the box */}
            <div className="absolute -inset-1 bg-white opacity-10 rounded-lg blur-md"></div>
            <div className="relative z-10 p-4 rounded-lg bg-gray-900 min-h-[300px] flex flex-col">
                <p className="mb-3">Allocation</p>
                <h2 className="text-lg font-semibold">Assets</h2>


            </div>
        </div>
    );
};

export default AccountSummary;
