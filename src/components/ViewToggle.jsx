// src/components/ViewToggle.jsx
import { Table2, BarChart3 } from "lucide-react";

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="mb-4 flex gap-2">
      <button
        onClick={() => onViewChange("table")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
          view === "table"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        <Table2 size={20} />
        Table
      </button>
      <button
        onClick={() => onViewChange("report")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
          view === "report"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        <BarChart3 size={20} />
        Report
      </button>
    </div>
  );
};

export default ViewToggle;
