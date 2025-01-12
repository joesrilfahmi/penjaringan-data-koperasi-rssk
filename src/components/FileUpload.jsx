// components/FileUpload.jsx
import { useRef } from "react";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { Upload } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";

function FileUpload({ setProcessedData, setStats, setNameFrequency }) {
  const fileInputRef = useRef();

  const validateHeaders = (data) => {
    if (!data || !data.length || !data[0] || data[0].length < 2) {
      return {
        isValid: false,
        message:
          "Invalid file format. Please ensure your file has the required columns.",
      };
    }

    const headers = data[0];
    const firstHeader = headers[0]?.toString().trim().toLowerCase();
    const secondHeader = headers[1]?.toString().trim().toLowerCase();

    if (firstHeader !== "timestamp") {
      return {
        isValid: false,
        message: "Column A1 must be 'Timestamp'",
      };
    }

    if (secondHeader !== "nama") {
      return {
        isValid: false,
        message: "Column B1 must be 'NAMA'",
      };
    }

    return { isValid: true };
  };

  const convertExcelDate = (excelDate) => {
    if (!excelDate) return "";
    try {
      let date;
      if (typeof excelDate === "number") {
        date = new Date((excelDate - 25569) * 86400 * 1000);
      } else {
        date = new Date(excelDate);
      }
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return formatInTimeZone(date, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      console.error("Error converting date:", error);
      return excelDate.toString();
    }
  };

  const processExcelData = (data) => {
    try {
      const validationResult = validateHeaders(data);
      if (!validationResult.isValid) {
        Swal.fire({
          icon: "error",
          title: "Invalid Headers!",
          text: validationResult.message,
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      const processedRows = data.slice(1).map((row, index) => {
        const timestamp = convertExcelDate(row[0]);
        const voter = row[1] || "";
        const unit = row[2] || "";
        const namesString = row[3] || "";
        const names = namesString.split(",").map((name) => name.trim());

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
          timestamp,
          voter,
          unit,
          name1,
          name2,
          name3,
          name4,
          name5,
          name6,
          name7,
        };
      });

      // Calculate updated statistics
      const uniqueUnits = new Set(processedRows.map((row) => row.unit)).size;

      // Calculate name frequency and total votes
      const frequency = {};
      let totalNameVotes = 0;
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
            totalNameVotes++;
          });
      });

      // Update state with processed data
      setProcessedData(processedRows);
      setStats({
        totalEntries: processedRows.length,
        uniqueUnits,
        totalVotes: Object.values(frequency).reduce((a, b) => a + b, 0),
        totalNameVotes,
      });
      setNameFrequency(frequency);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "File processed successfully",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error processing file:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to process file. Please check the file format.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    event.target.value = "";

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
          confirmButtonColor: "#3085d6",
        });
      }
    };
    reader.onerror = () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error reading the file. Please try again.",
        confirmButtonColor: "#3085d6",
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <label className="flex min-h-[160px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="mb-3 h-10 w-10 text-slate-400" />
              <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Excel files only
              </p>
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
