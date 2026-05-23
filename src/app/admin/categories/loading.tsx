export default function CategoriesLoading() {
  return (
    <div className="p-6 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-40 bg-surface-200 rounded" />
        <div className="h-10 w-32 bg-surface-200 rounded" />
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-14 bg-surface-200 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
