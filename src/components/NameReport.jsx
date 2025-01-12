// NameReport.jsx
import { useState } from "react";
import { X } from "lucide-react";
import Badge from "./Badge";
import Search from "./Search";

// VoterDetailsModal Component
function VoterDetailsModal({ isOpen, onClose, selectedName, voters }) {
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleModalClick}
    >
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between border-b pb-3 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Voters who selected: {selectedName}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  No.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Voter Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Unit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {voters.map((voter, index) => (
                <tr
                  key={`${voter.voter}-${index}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    {voter.voter}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    {voter.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Main NameReport Component
function NameReport({ frequency, processedData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedVoters, setSelectedVoters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedFrequency = Object.entries(frequency)
    .sort(([nameA, countA], [nameB, countB]) => {
      if (countB !== countA) {
        return countB - countA;
      }
      return nameA.localeCompare(nameB);
    })
    .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleNameClick = (name) => {
    const voters = processedData.filter((row) =>
      [
        row.name1,
        row.name2,
        row.name3,
        row.name4,
        row.name5,
        row.name6,
        row.name7,
      ].includes(name)
    );

    setSelectedName(name);
    setSelectedVoters(voters);
    setIsModalOpen(true);
  };

  if (!Object.keys(frequency).length) return null;

  return (
    <>
      <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-800">
        <h2 className="mb-6 border-b border-blue-600 pb-3 text-xl font-bold text-blue-600 dark:border-blue-500 dark:text-blue-500">
          Name Frequency Report
        </h2>

        <div className="mb-6">
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          {sortedFrequency.map(([name, count], index) => (
            <button
              key={name}
              onClick={() => handleNameClick(name)}
              className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left transition hover:translate-x-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 dark:hover:bg-slate-700"
            >
              <span className="min-w-[2rem] font-bold text-slate-500 dark:text-slate-400">
                {index + 1}.
              </span>
              <span className="flex-1 font-medium dark:text-white">{name}</span>
              <Badge variant="primary">{count} votes</Badge>
            </button>
          ))}
        </div>
      </div>

      <VoterDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedName={selectedName}
        voters={selectedVoters}
      />
    </>
  );
}

export default NameReport;
