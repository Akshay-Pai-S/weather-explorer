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
