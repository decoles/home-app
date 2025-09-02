import React from "react";

export interface CategoryData {
    category: string;
    budget: number;
    actual: number;
}

interface TableProps {
    data: CategoryData[];
}

const BudgetTable: React.FC<TableProps> = ({ data }) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="border-b border-gray-600">
                    <th className="text-left text-white text-l font-sans font-medium p-2">Category</th>
                    <th className="text-left text-white text-l font-sans font-medium">Progress</th>
                    <th className="text-right text-white text-l font-sans font-medium">Budget</th>
                    <th className="text-right text-white text-l font-sans font-medium">Actual</th>
                    <th className="text-right text-white text-l font-sans font-medium">Remaining</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => {
                    const remaining = row.budget - row.actual;
                    const progressPercent = Math.min((row.actual / row.budget) * 100, 100);

                    return (
                        <tr key={row.category}>
                            <td className="p-2">{row.category}</td>
                            <td className="p-2 w-1/3">
                                <div className="w-full bg-gray-700 h-2 rounded">
                                    <div
                                        className={`h-2 rounded bg-green-500`}
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                </div>
                            </td>
                            <td className="p-2 text-right">${row.budget.toFixed(2)}</td>
                            <td className="p-2 text-right">${row.actual.toFixed(2)}</td>
                            <td className="p-2 text-right">${remaining.toFixed(2)}</td>
                        </tr>
                    );
                })}
            </tbody>
                        Manage Categories
            <tr>
                <td colSpan={5}>
                    <div className="border-b border-gray-600"></div>
                </td>
            </tr>

        </table>
    );
};

export default BudgetTable
