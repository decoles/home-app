import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetTable, { CategoryData } from "../../components/budget/BudgetTable";
import SummaryOverview, { SummaryProps } from '../../components/budget/SummaryElement';

const Financial: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redSpending, setRedSpending] = useState(true);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, number>>({});
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const res = await axios.get(`/api/financial/transaction-data?month=${currentMonth}`);
        const res = await axios.get(`/api/financial/transaction-data?month=may`);

        if (res.status !== 200) {
          throw new Error('Failed to fetch transaction data');
        }
        // const schwabData = await axios.get(`/api/Financial/transaction-data`);
        // if (schwabData.status !== 200) {
        //   throw new Error('Failed to fetch Schwab data');
        // }

        // console.log('Schwab data:', schwabData.data);
        const data = Array.isArray(res.data) ? res.data : [];
        console.log('Transaction data:', data);
        setTransactions(data);

        let deposits = 0;
        let withdrawals = 0;
        const categoryTotals: Record<string, number> = {};
        const recurring: any[] = [];

        data.forEach((tx: any) => {
          const deposit = parseFloat(tx.deposit) || 0;
          const withdrawal = parseFloat(tx.withdrawal) || 0;

          deposits += deposit;
          withdrawals += withdrawal;

          if (tx.category && withdrawal) {
            categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + withdrawal;
          }

          if (tx.description?.toLowerCase().includes('netflix') || tx.description?.toLowerCase().includes('spotify')) {
            recurring.push(tx);
          }
        });

        setTotalDeposits(deposits);
        setTotalWithdrawals(withdrawals);
        setRedSpending(withdrawals > deposits);
        setCategoriesMap(categoryTotals);
        setSubscriptions(recurring);

      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch transaction data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },); //Fetch data when current month changes.

  const exampleData: CategoryData[] = [
    { category: "Needs", budget: 1000, actual: 750 },
    { category: "Wants", budget: 500, actual: 400 },
    { category: "Savings", budget: 300, actual: 150 },
    { category: "long ", budget: 1000, actual: 750 },
    { category: "Wants", budget: 500, actual: 400 },
    { category: "Savings", budget: 300, actual: 150 },
  ];

return (
  <div className="bg-gray-900 flex h-screen">

    {/* Main content on the right */}
    <div className="flex-1 text-white text-l font-sans font-medium">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl font-sans font-medium">Budget</h1>
      </div>

      {/* Budget Table & Summary */}
      <div className="flex justify-between items-center w-full mt-[2%]">
        <BudgetTable data={exampleData} />
        <SummaryOverview totalBudgeted={1951} totalSpent={1946} />
      </div>
    </div>
  </div>
);
};

export default Financial;
