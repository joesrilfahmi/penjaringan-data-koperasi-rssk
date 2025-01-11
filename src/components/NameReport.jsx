// src/components/NameReport.jsx
function NameReport({ frequency }) {
  const sortedFrequency = Object.entries(frequency).sort(
    ([, a], [, b]) => b - a
  );

  if (!sortedFrequency.length) return null;

  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <h2 className="mb-6 border-b border-blue-600 pb-3 text-xl font-bold text-blue-600">
        Name Frequency Report
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedFrequency.map(([name, count], index) => (
          <div
            key={name}
            className="flex justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:translate-x-1 hover:shadow"
          >
            <span className="font-medium">{name}</span>
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
