export interface SummaryProps {
  totalBudgeted: number;
  totalSpent: number;
}

const SummaryOverview: React.FC<SummaryProps> = ({ totalBudgeted, totalSpent }) => {
  const remaining = totalBudgeted - totalSpent;
  const spentPercent = Math.min((totalSpent / totalBudgeted) * 100, 100);

  return (
    <div className="ml-[5%] relative w-full max-w-sm rounded-lg text-white">
      {/* Glowing background behind the box */}
      <div className="absolute -inset-1 bg-white opacity-10 rounded-lg blur-md"></div>

      <div className="relative z-10 p-4 rounded-lg bg-gray-900">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>

        {/* progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>${totalSpent.toLocaleString()} spent</span>
            <span>{Math.round(spentPercent)}% of budget</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div
              className={`h-2 rounded bg-blue-500`}
              style={{ width: `${spentPercent}%` }}
            ></div>
          </div>

        </div>

        {/* Budget */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Budgeted</span>
            <span>${totalBudgeted.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Actual Spend</span>
            <span>${totalSpent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Remaining</span>
            <span>${remaining.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryOverview;
