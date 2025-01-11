// src/components/StatsContainer.jsx
function StatsContainer({ stats }) {
  const statItems = [
    { label: "Total Entries", value: stats.totalEntries },
    { label: "Unique Voters", value: stats.uniqueVoters },
    { label: "Unique Units", value: stats.uniqueUnits },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-600">
            {item.label}
          </h3>
          <p className="text-2xl font-bold text-blue-600">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsContainer;
