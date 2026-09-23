import { useCallback, useEffect, useState } from "react";
import WeatherForm from "./components/WeatherForm";
import type { StoredFile, WeatherFileContent } from "./types/weather";
import { getWeatherFileContent, listWeatherFiles } from "./services/weatherApi";
import StoredFiles from "./components/StoredFiles";
import { transformWeatherData } from "./utils/transformWeather";
import WeatherTable from "./components/WeatherTable";
import WeatherChart from "./components/WeatherChart";

function App() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [selectedWeather, setSelectedWeather] =
    useState<WeatherFileContent | null>(null);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState("");
  const [selectedWeatherError, setSelectedWeatherError] = useState("");
  const [selectedWeatherLoading, setSelectedWeatherLoading] = useState(false);

  const loadFiles = useCallback(async () => {
    try {
      setFilesLoading(true);
      setFilesError("");
      const response = await listWeatherFiles();
      setFiles(response.files);
    } catch (error) {
      setFilesError(
        error instanceof Error
          ? error.message
          : "Failed to load stored weather files",
      );
      console.log(error);
    } finally {
      setFilesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  async function handleFileSelect(fileName: string) {
    try {
      setSelectedWeatherLoading(true);
      setSelectedWeatherError("");
      setSelectedWeather(null);

      const data = await getWeatherFileContent(fileName);
      setSelectedWeather(data);
    } catch (error) {
      setSelectedWeatherError(
        error instanceof Error
          ? error.message
          : "Failed to load the selected weather file",
      );
    } finally {
      setSelectedWeatherLoading(false);
    }
  }

  const weatherDay = selectedWeather
    ? transformWeatherData(selectedWeather)
    : [];

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Weather Explorer</h1>
          <p className="mt-2 text-gray-600">
            Fetch, Store and Visualize historical weather data.
          </p>
        </header>
        <div className="space-y-6">
          <WeatherForm onStoreSuccess={loadFiles} />
          <StoredFiles
            files={files}
            onFileSelect={handleFileSelect}
            loading={filesLoading}
            error={filesError}
          />
          {selectedWeatherLoading ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Loading weather data...</p>
            </div>
          ) : selectedWeatherError ? (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {selectedWeatherError}
            </div>
          ) : (
            <>
              <WeatherChart data={weatherDay} />
              <WeatherTable data={weatherDay} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
