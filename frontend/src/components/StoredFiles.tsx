import type { StoredFileProps } from "../types/weather";

export default function StoredFiles({ files }: StoredFileProps) {
  return (
    <section>
      <h2>Stored Files</h2>
      {files.length === 0 ? (
        <p>No weather files found</p>
      ) : (
        <div>
          {files.map((file) => (
            <div key={file.name}>
              <p>{file.name}</p>
              <p>{file.size}</p>
              <p>{file.created_at}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
