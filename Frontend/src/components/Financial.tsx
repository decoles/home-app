import React from 'react';

const Financial: React.FC = () => {
  const stats = [
    { label: 'Total Subscribers', value: '5,097' },
    { label: 'Average Watch Time', value: '45.4 min' },
  ];

  const popularItems = [
    'Kuji Podcast 33: Live',
    'Kuji Podcast 20: Live',
    'Kuji Podcast 24: Live',
  ];

  return (
    <main className="flex-1 p-6 bg-gray-900">
      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-white">{stat.label}</h3>
            <p className="text-2xl text-green-400 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>+

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
    </main>
  );
};

export default Financial;
