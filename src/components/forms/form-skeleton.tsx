export const FormSkeleton = () => (
  <div className="mx-auto w-full p-8">
    <div className="mb-8">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
    </div>

    {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
      <div className="mb-6" key={index}>
        <div className="mb-3 h-5 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-14 animate-pulse rounded-lg bg-gray-200" />
      </div>
    ))}

    <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-300" />
  </div>
);
