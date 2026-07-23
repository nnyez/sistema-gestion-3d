export default function Loading({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div className="flex-1 flex items-center justify-center py-16 bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 mx-auto" />
        <p className="text-gray-500 mt-4">{text}</p>
      </div>
    </div>
  );
}
