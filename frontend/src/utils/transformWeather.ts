import type { WeatherDay, WeatherFileContent } from "../types/weather";

export function transformWeatherData(
  weatherData: WeatherFileContent,
): WeatherDay[] {
  const { daily } = weatherData;
  return daily.time.map((date, index) => ({
    date,
    tempMax: daily.temperature_2m_max[index],
    tempMin: daily.temperature_2m_min[index],
    apparentTempMax: daily.apparent_temperature_max[index],
    apparentTempMin: daily.apparent_temperature_min[index],
  }));
}

export function isWeatherFileContent(
  data: unknown,
): data is WeatherFileContent {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const weatherData = data as Record<string, unknown>;
  const daily = weatherData.daily;

  if (typeof daily !== "object" || daily === null) {
    return false;
  }

  const dailyData = daily as Record<string, unknown>;

  return (
    Array.isArray(dailyData.time) &&
    Array.isArray(dailyData.temperature_2m_max) &&
    Array.isArray(dailyData.temperature_2m_min) &&
    Array.isArray(dailyData.apparent_temperature_max) &&
    Array.isArray(dailyData.apparent_temperature_min)
  );
}
