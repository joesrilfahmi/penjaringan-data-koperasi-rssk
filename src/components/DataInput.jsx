import { useState } from "react";
import Swal from "sweetalert2";
import { TableCellsIcon, TrashIcon } from "@heroicons/react/24/solid";

function DataInput({ setTableData, setStats, setNameFrequency }) {
  const [input, setInput] = useState("");

  const countNameFrequency = (rows) => {
    const frequency = {};
    rows.forEach((row) => {
      row.forEach((name) => {
        if (name && name.trim()) {
          frequency[name] = (frequency[name] || 0) + 1;
        }
      });
    });
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  };

  const generateTable = () => {
    const data = input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);

    if (data.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Please enter data!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const rows = [];
    for (let i = 0; i < data.length; i += 7) {
      rows.push(data.slice(i, i + 7));
    }

    setTableData(rows);
    setStats({
      totalEntries: data.length,
      totalRows: rows.length,
      filledData: Math.round(
        (data.filter((item) => item !== "").length / (rows.length * 7)) * 100
      ),
    });
    setNameFrequency(countNameFrequency(rows));
    setInput("");
  };

  const clearTable = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setTableData([]);
      setStats({
        totalEntries: 0,
        totalRows: 0,
        filledData: 0,
      });
      setNameFrequency({});
      setInput("");
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      generateTable();
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter data (separate with commas)"
          className="w-full rounded-lg border-2 border-slate-200 p-4 outline-none transition focus:border-blue-600 focus:shadow-blue-100"
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={generateTable}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <TableCellsIcon className="h-5 w-5" />
          Generate Table
        </button>
        <button
          onClick={clearTable}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-600"
        >
          <TrashIcon className="h-5 w-5" />
          Clear Data
        </button>
      </div>
    </div>
  );
}

export default DataInput;
