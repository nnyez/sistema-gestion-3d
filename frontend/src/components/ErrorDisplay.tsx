export default function ErrorDisplay({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
      <p className="text-red-700 text-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 text-red-700 font-medium text-sm hover:underline">
          Reintentar
        </button>
      )}
    </div>
  );
}
