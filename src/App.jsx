// src/App.jsx
import { useState } from "react";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";
import StatsContainer from "./components/StatsContainer";
import NameReport from "./components/NameReport";

function App() {
  const [processedData, setProcessedData] = useState([]);
  const [stats, setStats] = useState({
    totalEntries: 0,
    uniqueVoters: 0,
    uniqueUnits: 0,
  });
  const [nameFrequency, setNameFrequency] = useState({});

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-center text-3xl font-bold text-blue-600">
            Excel Data Processing System
          </h1>
          <FileUpload
            setProcessedData={setProcessedData}
            setStats={setStats}
            setNameFrequency={setNameFrequency}
          />
          <StatsContainer stats={stats} />
          <DataTable data={processedData} />
          <NameReport frequency={nameFrequency} />
        </div>
      </div>
    </div>
  );
}

export default App;
