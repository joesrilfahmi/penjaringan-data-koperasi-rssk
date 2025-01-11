// src/components/FileUpload.jsx
import { useRef } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

function FileUpload({ setProcessedData, setStats, setNameFrequency }) {
  const fileInputRef = useRef();

  const processExcelData = (data) => {
    try {
      // Skip header row by starting from index 1
      const processedRows = data.slice(1).map((row, index) => {
        const timestamp = row[0]; // Column A
        const voter = row[1]; // Column B
        const unit = row[2]; // Column C
        const namesString = row[3] || ""; // Column D
        const names = namesString.split(",").map((name) => name.trim());

        // Ensure we always have 7 names, fill empty slots with ''
        const [name1, name2, name3, name4, name5, name6, name7] = [
          ...names,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ].slice(0, 7);

        return {
          number: index + 1,
          timestamp: timestamp
            ? format(new Date(timestamp), "dd/MM/yyyy HH:mm:ss")
            : "",
          voter: voter || "",
          unit: unit || "",
          name1,
          name2,
          name3,
          name4,
          name5,
          name6,
          name7,
        };
      });

      // Calculate statistics
      const uniqueVoters = new Set(processedRows.map((row) => row.voter)).size;
      const uniqueUnits = new Set(processedRows.map((row) => row.unit)).size;

      // Calculate name frequency
      const frequency = {};
      processedRows.forEach((row) => {
        [
          row.name1,
          row.name2,
          row.name3,
          row.name4,
          row.name5,
          row.name6,
          row.name7,
        ]
          .filter((name) => name)
          .forEach((name) => {
            frequency[name] = (frequency[name] || 0) + 1;
          });
      });

      setProcessedData(processedRows);
      setStats({
        totalEntries: processedRows.length,
        uniqueVoters,
        uniqueUnits,
      });
      setNameFrequency(frequency);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "File processed successfully",
      });
    } catch (error) {
      console.error("Error processing file:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to process file. Please check the file format.",
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        processExcelData(data);
      } catch (error) {
        console.error("Error reading file:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to read file. Please make sure it's a valid Excel file.",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <label className="flex min-h-[160px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ArrowUpTrayIcon className="mb-3 h-10 w-10 text-slate-400" />
              <p className="mb-2 text-sm text-slate-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-slate-500">Excel files only</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
