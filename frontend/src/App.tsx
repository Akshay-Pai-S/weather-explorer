import { useEffect, useState } from "react";
import WeatherForm from "./components/WeatherForm";
import type { StoredFile } from "./types/weather";
import { listWeatherFiles } from "./services/weatherApi";
import StoredFiles from "./components/StoredFiles";

function App() {
  const [files, setFiles] = useState<StoredFile[]>([]);

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
  return (
    <>
      <WeatherForm />
      <StoredFiles files={files} />
    </>
  );
}

export default App;
