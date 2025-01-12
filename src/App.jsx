// App.jsx
import { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToTop from "./components/ScrollToTop";
import ViewToggle from "./components/ViewToggle";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";
import NameReport from "./components/NameReport";

const App = () => {
  const [processedData, setProcessedData] = useState([]);
  const [stats, setStats] = useState({
    totalEntries: 0,
    uniqueUnits: 0,
    totalNameVotes: 0,
  });
  const [nameFrequency, setNameFrequency] = useState({});
  const [view, setView] = useState("table");

  return (
    <div className="min-h-screen bg-slate-50 p-6 transition dark:bg-gray-900">
      <ThemeToggle />
      <ScrollToTop />

      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-white p-8 shadow-lg transition dark:bg-gray-800">
          <h1 className="mb-8 text-center text-3xl font-bold text-blue-600 dark:text-blue-400">
            Excel Data Processing System
          </h1>

          <FileUpload
            setProcessedData={setProcessedData}
            setStats={setStats}
            setNameFrequency={setNameFrequency}
          />

          {processedData.length > 0 && (
            <>
              <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h2 className="mb-2 text-lg font-semibold text-blue-700 dark:text-blue-400">
                  Statistics
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Entries
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.totalEntries}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Units
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.uniqueUnits}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Name Votes
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.totalNameVotes}
                    </p>
                  </div>
                </div>
              </div>

              <ViewToggle view={view} onViewChange={setView} />

              {view === "table" && <DataTable data={processedData} />}
              {view === "report" && (
                <NameReport
                  frequency={nameFrequency}
                  processedData={processedData}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
