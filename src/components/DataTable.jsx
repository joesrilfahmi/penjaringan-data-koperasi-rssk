// src/components/DataTable.jsx
import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function DataTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const columns = [
    { key: "number", label: "No." },
    { key: "timestamp", label: "Timestamp" },
    { key: "voter", label: "Voter" },
    { key: "unit", label: "Unit" },
    { key: "name1", label: "Name 1" },
    { key: "name2", label: "Name 2" },
    { key: "name3", label: "Name 3" },
    { key: "name4", label: "Name 4" },
    { key: "name5", label: "Name 5" },
    { key: "name6", label: "Name 6" },
    { key: "name7", label: "Name 7" },
  ];

  if (!data.length) return null;

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search in table..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentItems.map((row) => (
              <tr key={row.number} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="whitespace-nowrap px-6 py-4">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <nav className="flex items-center space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`rounded px-3 py-1 text-sm ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {number}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default DataTable;
