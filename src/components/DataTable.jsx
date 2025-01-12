import { useState } from "react";
import Search from "./Search";

const DataTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((row) =>
    row.voter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <Search
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Voter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Unit
              </th>
              {Array.from({ length: 7 }, (_, i) => (
                <th
                  key={`name${i + 1}`}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Name {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {filteredData.map((row) => (
              <tr
                key={row.number}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                  {row.number}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                  {row.timestamp}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                  {row.voter}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                  {row.unit}
                </td>
                {Array.from({ length: 7 }, (_, i) => (
                  <td
                    key={`name${i + 1}`}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-300"
                  >
                    {row[`name${i + 1}`]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
