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
    <section>
      <h2>Weather Data</h2>
      <form onSubmit={handleSubmit}>
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
        {error && (<p role="alert">{error}</p>)}
        <button disabled={loading} type="submit"> {loading ? 'Storing Data...' : 'Store data'}</button>
        {storedFile && (<p>Stored file : {storedFile}</p>)}
      </form>
    </section>
  );
}
