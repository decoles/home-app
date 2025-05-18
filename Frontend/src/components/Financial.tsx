import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Financial: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redSpending, setRedSpending] = useState(true);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  const month = 'May';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/financial/transaction-data?month=${month}`);
        const data = Array.isArray(res.data) ? res.data : [];
        console.log('Transaction data:', data);
        setTransactions(data);
        let deposits = 0;
        let withdrawals = 0;

        data.forEach((tx: any) => {
          const deposit = parseFloat(tx.deposit) || 0;
          const withdrawal = parseFloat(tx.withdrawal) || 0;

          deposits += deposit;
          withdrawals += withdrawal;
        });

        setTotalDeposits(deposits);
        setTotalWithdrawals(withdrawals);
        setRedSpending(withdrawals > deposits);

      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch transaction data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  return (
    <main className="flex flex-col overflow-hidden bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold m-4">Financial Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
        {/* Spending Summary */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold">Total Spending for {month}</h2>
          <p className={`text-lg mt-1 ${redSpending ? 'text-red-500' : 'text-green-400'}`}>
            Spent: ${totalWithdrawals.toFixed(2)}
          </p>
        </div>

        {/* Income Summary */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold">Total Income for {month}</h2>
          <p className="text-lg mt-1 text-green-400">
            Income: ${totalDeposits.toFixed(2)}
          </p>
        </div>

        {/* Transactions */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Transactions for {month}</h3>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Withdrawals */}
              <div className="max-h-[200px] overflow-y-auto">
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

              {/* Deposits */}
              <div className="max-h-[200px] overflow-y-auto">
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
    </main>
  );
};

export default Financial;
