// src/components/Search.jsx
import { Search as SearchIcon } from "lucide-react";

const Search = ({ value, onChange }) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search voters..."
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

export default Search;
