import React, { useEffect, useState } from 'react';
import axios from 'axios'; // If not installed: npm install axios

  const Financial: React.FC = () => {
const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const month = 'May'; // or dynamically get from a dropdown

  useEffect(() => {
    const fetchData = async () => {
      try {
      const res = await axios.get(`/api/financial/transaction-data?month=${month}`);
      const data = Array.isArray(res.data) ? res.data : [];
      console.log('Transaction data:', data);
      setTransactions(data);
      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch transaction data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  const popularItems = [
    'Kuji Podcast 33: Live',
    'Kuji Podcast 20: Live',
    'Kuji Podcast 24: Live',
  ];

  return (
    <main className="flex-1 p-6 bg-gray-900">
      {/* Stats Grid */}
      {/* <div className="grid grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-white">{stat.label}</h3>
            <p className="text-2xl text-green-400 mt-2">{stat.value}</p>
          </div>
        ))}
      </div> */}

      {/* Popular Items */}
      <div className="bg-gray-800 p-6 mt-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-white">Popular Episodes</h3>
        <ul className="space-y-3 mt-4">
          {popularItems.map((item) => (
            <li key={item} className="text-md text-gray-400">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Transaction Results */}
      <div className="bg-gray-800 p-6 mt-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-white">Transactions for {month}</h3>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
<ul className="space-y-2 mt-4 text-gray-300 text-sm">
  {transactions.map((tx, index) => (
    <li key={index}>
      <strong>{tx.date}</strong>: {tx.description} — ${tx.withdrawal || tx.deposit}
    </li>
  ))}
</ul>

        )}
      </div>
    </main>
  );
};



export default Financial;
