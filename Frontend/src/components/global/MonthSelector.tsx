import React, { useState } from "react";

const MonthSelector: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    console.log("Selected month:", e.target.value); // This is your "selected month" function
  };

  return (
    <div className="relative max-w-3xs">
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="flex items-center bg-gray-800 rounded-md px-4 py-2 w-full shadow-sm border border-white text-white cursor-pointer appearance-none"
      >
        <option value="" disabled>Select a month</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
