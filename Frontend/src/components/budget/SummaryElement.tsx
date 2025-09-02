import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DragHandleIcon from "@mui/icons-material/DragHandle";

export interface SummaryProps {
  totalBudgeted: number;
  totalSpent: number;
}

const SummaryOverview: React.FC<SummaryProps> = ({ totalBudgeted, totalSpent }) => {
  const remaining = totalBudgeted - totalSpent;
  const spentPercent = Math.min((totalSpent / totalBudgeted) * 100, 100);

  return (
    <div className="ml-[3%] relative w-full max-w-sm rounded-lg text-white">
      {/* Glowing background behind the box */}
      <div className="absolute -inset-1 bg-white opacity-10 rounded-lg blur-md"></div>

      <div className="relative z-10 p-4 rounded-lg bg-gray-900 min-h-[300px] flex flex-col justify-between">
        <h2 className="text-lg font-semibold mb-12">Summary</h2>

        {/* progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-1">
            <span>${totalSpent.toLocaleString()} spent</span>
            <span>{Math.round(spentPercent)}% of budget</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div
              className="h-2 rounded bg-blue-500"
              style={{ width: `${spentPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Budget */}
        <span className="mb-2 text-gray-400">Budget</span>

        <div className="space-y-4 text-sm mt-auto">
          {/* Budgeted */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <AddIcon className="text-green-400" fontSize="small" />
              <h2 className="text-lg font-semibold">Budgeted</h2>
            </div>
            <span>${totalBudgeted.toLocaleString()}</span>
          </div>

          {/* Actual Spend */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <RemoveIcon className="text-red-400" fontSize="small" />
              <h2 className="text-lg font-semibold">Actual Spend</h2>
            </div>
            <span>${totalSpent.toLocaleString()}</span>
          </div>

          <hr className="border-t border-gray-600 my-4" />

          {/* Remaining */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <DragHandleIcon className="text-gray-400" fontSize="small" />
              <h2 className="text-lg font-semibold">Remaining</h2>
            </div>
            <span>${remaining.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryOverview;
