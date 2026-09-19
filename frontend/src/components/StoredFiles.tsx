import type { StoredFileProps } from "../types/weather";

export default function StoredFiles({ files, onFileSelect }: StoredFileProps) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Stored Files</h2>
        <p className="mt-1 text-sm text-gray-500">
          Select a stored weather dataset to view it's details
        </p>
      </div>
      {files.length === 0 ? (
        <p className="text-sm text-gray-500">No weather files found</p>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <button
              key={file.name}
              type="button"
              onClick={() => onFileSelect(file.name)}
              className="w-full rounded-lg border border-gray-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="wrap-break-word text-sm font-medium text-gray-900">
                {file.name}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
                <span>Size: {file.size} bytes</span>
                <span>
                  Created: {new Date(file.created_at).toLocaleDateString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
