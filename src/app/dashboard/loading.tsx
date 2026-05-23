export default function DashboardLoading() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-pulse">
      <div className="h-8 w-48 bg-surface-200 rounded mb-1" />
      <div className="h-4 w-64 bg-surface-200 rounded mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-surface-200 rounded-2xl"
          />
        ))}
      </div>
      <div className="mt-8 h-64 bg-surface-200 rounded-2xl" />
    </div>
  );
}
