import { storeWeatherData } from "../services/weatherApi";
import type {
  InputFieldConfig,
  WeatherFormData,
  WeatherRequest,
} from "../types/weather";
import InputField from "./InputField";
import React, { useState } from "react";

const inputField: InputFieldConfig[] = [
  {
    id: "latitude",
    label: "Latitude",
    type: "number",
    field: "latitude",
  },
  {
    id: "langitude",
    label: "Longitude",
    type: "number",
    field: "longitude",
  },
  {
    id: "start_date",
    label: "Start Date",
    type: "date",
    field: "startDate",
  },
  {
    id: "end_date",
    label: "End Date",
    type: "date",
    field: "endDate",
  },
];

export default function WeatherForm() {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storedFile, setStoredFile] = useState("");

  function handleChange(feild: keyof WeatherFormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [feild]: value,
    }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setStoredFile("");

    const requestData: WeatherRequest = {
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      start_date: formData.startDate,
      end_date: formData.endDate,
    };
    try {
      setLoading(true);
      const response = await storeWeatherData(requestData);
      setStoredFile(response.file);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to store weather data",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Weather Data</h2>
      <p className="mt-1 text-sm text-gray-500">
        Choose a location and date range to fetch the weather data
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {inputField.map((input) => (
            <InputField
              key={input.id}
              id={input.id}
              label={input.label}
              type={input.type}
              value={formData[input.field]}
              onChange={(value) => handleChange(input.field, value)}
            />
          ))}
          {error && <p role="alert">{error}</p>}
          <button
            disabled={loading}
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {" "}
            {loading ? "Storing Data..." : "Fetch & Store data"}
          </button>
          {storedFile && <p>Stored file : {storedFile}</p>}
        </div>
      </form>
    </section>
  );
}
