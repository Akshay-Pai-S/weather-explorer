import type {
  WeatherRequest,
  StoreWeatherResponse,
  ListWeatherFilesResponse,
  WeatherFileContent,
} from "../types/weather";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function storeWeatherData(
  data: WeatherRequest,
): Promise<StoreWeatherResponse> {
  const response = await fetch(`${API_BASE_URL}/store-weather-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.details?.[0]?.message ??
        responseData.message ??
        "Failed to store weather data",
    );
  }

  return responseData;
}

export async function listWeatherFiles(): Promise<ListWeatherFilesResponse> {
  const response = await fetch(`${API_BASE_URL}/list-weather-files`);

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message ?? "Failed to get weather files");
  }

  return responseData;
}

export async function getWeatherFileContent(
  fileName: string,
): Promise<WeatherFileContent> {
  const response = await fetch(
    `${API_BASE_URL}/weather-file-content/${encodeURIComponent(fileName)}`,
  );
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message ?? "Failed to get weather file");
  }
  return responseData;
}
