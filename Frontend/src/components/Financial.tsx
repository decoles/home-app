import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

const Financial: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redSpending, setRedSpending] = useState(true);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, number>>({});
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const month = 'May';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/financial/transaction-data?month=${month}`);
        if (res.status !== 200) {
          throw new Error('Failed to fetch transaction data');
        }
        const schwabData = await axios.get(`/api/Financial/transaction-data`);
        if (schwabData.status !== 200) {
          throw new Error('Failed to fetch Schwab data');
        }

        console.log('Schwab data:', schwabData.data);
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
  }, [month]);

  const pieData = [
    { id: 0, value: totalWithdrawals * 0.5, label: 'Needs' },
    { id: 1, value: totalWithdrawals * 0.3, label: 'Wants' },
    { id: 2, value: totalWithdrawals * 0.2, label: 'Savings' },
  ];

  return (
    <main className="h-screen bg-gray-900 text-white overflow-hidden flex flex-col">
      <h1 className="text-2xl font-bold m-4">Financial Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] gap-4 px-4 flex-1 overflow-hidden">
        {/* Spending */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm self-start">
          <h2 className="font-semibold">Total Spending for {month}</h2>
          <p className={`text-lg mt-1 ${redSpending ? 'text-red-500' : 'text-green-400'}`}>
            Spent: ${totalWithdrawals.toFixed(2)}
          </p>
        </div>

        {/* Income */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm self-start">
          <h2 className="font-semibold">Total Income for {month}</h2>
          <p className="text-lg mt-1 text-green-400">
            Income: ${totalDeposits.toFixed(2)}
          </p>
        </div>

        {/* Transactions */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Transactions for {month}</h3>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-400">
  {typeof error === 'string' ? error : 'An unexpected error occurred.'}
</p>
          ) : (
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                <h4 className="text-md font-semibold mb-2">Withdrawals</h4>
                <table className="w-full table-auto text-left text-sm">
                  <thead className="bg-gray-700 text-gray-300 sticky top-0">
                    <tr>
                      <th className="p-2">Date</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.filter(tx => tx.withdrawal).map((tx, index) => (
                      <tr key={`withdrawal-${index}`} className="border-b border-gray-700 text-gray-300">
                        <td className="p-2">{tx.date}</td>
                        <td className="p-2">{tx.description}</td>
                        <td className="p-2 text-red-400">{tx.withdrawal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex-1 overflow-y-auto">
                <h4 className="text-md font-semibold mb-2">Deposits</h4>
                <table className="w-full table-auto text-left text-sm">
                  <thead className="bg-gray-700 text-gray-300 sticky top-0">
                    <tr>
                      <th className="p-2">Date</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.filter(tx => tx.deposit).map((tx, index) => (
                      <tr key={`deposit-${index}`} className="border-b border-gray-700 text-gray-300">
                        <td className="p-2">{tx.date}</td>
                        <td className="p-2">{tx.description}</td>
                        <td className="p-2 text-green-400">{tx.deposit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-4 mb-6">
        {/* Spending Categories */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Spending Categories</h2>
          <ul className="text-sm text-gray-300">
            {Object.entries(categoriesMap).map(([cat, amount], i) => (
              <li key={i} className="mb-1">
                <span className="capitalize">{cat}</span>: ${amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        {/* Recurring Subscriptions */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Recurring Subscriptions</h2>
          {subscriptions.length > 0 ? (
            <ul className="text-sm text-gray-300">
              {subscriptions.map((tx, i) => (
                <li key={i}>
                  {tx.date} — {tx.description}: <span className="text-red-400">${tx.withdrawal}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">No subscriptions found.</p>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Wants / Needs / Savings</h2>
          <PieChart
            series={[{ data: pieData }]}
            width={300}
            height={200}
            colors={['#34d399', '#fbbf24', '#60a5fa']}
          />
        </div>
      </div>
    </main>
  );
};

export default Financial;
