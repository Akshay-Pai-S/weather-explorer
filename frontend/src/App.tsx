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
    <>
      <WeatherForm />
      <StoredFiles files={files} onFileSelect={handleFileSelect} />
      <WeatherChart data={weatherDay} />
      <WeatherTable data={weatherDay} />
    </>
  );
}

export default App;
