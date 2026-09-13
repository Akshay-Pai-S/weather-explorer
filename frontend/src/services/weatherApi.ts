import type { WeatherRequest, StoreWeatherResponce } from "../types/weather";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function storeWeatherData(
  data: WeatherRequest,
): Promise<StoreWeatherResponce> {
  const responce = await fetch(`${API_BASE_URL}/store-weather-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responceData = await responce.json();

  if (!responce.ok) {
    throw new Error(
      responceData.details?.[0]?.message ??
        responceData.message ??
        "Failed to store weather data",
    );
  }

  return responceData;
}
