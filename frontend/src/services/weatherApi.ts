import type {
  WeatherRequest,
  StoreWeatherResponse,
  ListWeatherFilesResponse,
  WeatherFileContent,
} from "../types/weather";
import { isWeatherFileContent } from "../utils/transformWeather";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL)

export class ApiError extends Error {
  details: {
    field: string;
    message: string;
  }[];

  constructor(
    message: string,
    details: {
      field: string;
      message: string;
    }[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.details = details;
  }
}

function handleNetworkError(error: unknown): never {
  if (error instanceof TypeError) {
    throw new Error("Unable to connect to backend");
  }
  throw error;
}

export async function storeWeatherData(
  data: WeatherRequest,
): Promise<StoreWeatherResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/store-weather-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new ApiError(
        responseData.message ?? "Failed to store weather data",
        responseData.details ?? [],
      );
    }

    return responseData;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function listWeatherFiles(): Promise<ListWeatherFilesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/list-weather-files`);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message ?? "Failed to get weather files");
    }

    return responseData;
  } catch (error) {
    handleNetworkError(error);
  }
}

export async function getWeatherFileContent(
  fileName: string,
): Promise<WeatherFileContent> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather-file-content/${encodeURIComponent(fileName)}`,
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message ?? "Failed to get weather file");
    }

    if (!isWeatherFileContent(responseData)) {
      throw new Error("The selected file does not contain valid weather data.");
    }

    return responseData;
  } catch (error) {
    handleNetworkError(error);
  }
}
