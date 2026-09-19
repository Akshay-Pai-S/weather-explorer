import { useEffect, useState } from "react";
import WeatherForm from "./components/WeatherForm";
import type { StoredFile, WeatherFileContent } from "./types/weather";
import { getWeatherFileContent, listWeatherFiles } from "./services/weatherApi";
import StoredFiles from "./components/StoredFiles";
import { transformWeatherData } from "./utils/transformWeather";
import WeatherTable from "./components/WeatherTable";
import WeatherChart from "./components/WeatherChart";

function App() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [selectedWeather, setSelectWeather] =
    useState<WeatherFileContent | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await listWeatherFiles();
        setFiles(response.files);
      } catch (error) {
        console.error(error);
      }
    };
    loadFiles();
  }, []);

  async function handleFileSelect(fileName: string) {
    try {
      const data = await getWeatherFileContent(fileName);
      setSelectWeather(data);
    } catch (error) {
      console.log(error);
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
          <WeatherForm />
          <StoredFiles files={files} onFileSelect={handleFileSelect} />
          <WeatherChart data={weatherDay} />
          <WeatherTable data={weatherDay} />
        </div>
      </div>
    </main>
  );
}

export default App;
