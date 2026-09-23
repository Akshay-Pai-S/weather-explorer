import { ApiError, storeWeatherData } from "../services/weatherApi";
import type {
  InputFieldConfig,
  WeatherFormData,
  WeatherFormProps,
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

export default function WeatherForm({ onStoreSuccess }: WeatherFormProps) {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof WeatherFormData, string>>
  >({});
  const [formError, setFormError] = useState("");
  const [storedFile, setStoredFile] = useState("");

  function handleChange(field: keyof WeatherFormData, value: string) {
    setFieldErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
    setFormError("");
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFieldErrors({});
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
      await onStoreSuccess();
    } catch (error) {
      if (error instanceof ApiError) {
        const errors: Partial<Record<keyof WeatherFormData, string>> = {};

        let generalError = "";

        for (const detail of error.details) {
          if (detail.field === "latitude") {
            errors.latitude = detail.message;
          } else if (detail.field === "longitude") {
            errors.longitude = detail.message;
          } else if (detail.field === "start_date") {
            errors.startDate = detail.message;
          } else if (detail.field === "end_date") {
            errors.endDate = detail.message;
          } else {
            generalError = detail.message;
          }
        }

        setFieldErrors(errors);
        setFormError(generalError);
      } else {
        setFormError(
          error instanceof Error
            ? error.message
            : "Failed to store weather data.",
        );
      }
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
              error={fieldErrors[input.field]}
              onChange={(value) => handleChange(input.field, value)}
            />
          ))}
          <button
            disabled={loading}
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Storing Data..." : "Fetch & Store data"}
          </button>
          {formError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {formError}
            </div>
          )}
          {storedFile && <p>Stored file : {storedFile}</p>}
        </div>
      </form>
    </section>
  );
}
