export default function UsersLoading() {
  return (
    <div className="p-6 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-surface-200 rounded" />
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-surface-200 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
