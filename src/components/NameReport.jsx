// src/components/NameReport.jsx
function NameReport({ frequency }) {
  const sortedFrequency = Object.entries(frequency).sort(
    ([nameA, countA], [nameB, countB]) => {
      // Urutkan berdasarkan jumlah votes terlebih dahulu
      if (countB !== countA) {
        return countB - countA;
      }
      // Jika jumlah votes sama, urutkan berdasarkan nama secara alfabet
      return nameA.localeCompare(nameB);
    }
  );

  if (!sortedFrequency.length) return null;

  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <h2 className="mb-6 border-b border-blue-600 pb-3 text-xl font-bold text-blue-600">
        Name Frequency Report
      </h2>
      <div className="flex flex-col gap-3">
        {sortedFrequency.map(([name, count], index) => (
          <div
            key={name}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:translate-x-1 hover:shadow"
          >
            <span className="min-w-[2rem] font-bold text-slate-500">
              {index + 1}.
            </span>
            <span className="flex-1 font-medium">{name}</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-600">
              {count} votes
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NameReport;
