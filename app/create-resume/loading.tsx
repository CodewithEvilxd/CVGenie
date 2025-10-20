export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-700">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500/50 border-solid mb-4"></div>
      <p className="text-lg font-semibold tracking-wide">Loading, please wait...</p>
    </div>
  );
}
