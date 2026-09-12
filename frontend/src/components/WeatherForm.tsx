import InputField from "./InputField";
import React, { useState } from "react";

type WeatherFormData = {
  latitude: string;
  longitude: string;
  startDate: string;
  endDate: string;
};
type InputFieldConfig = {
  id: string;
  label: string;
  type: "number" | "date";
  field: keyof WeatherFormData;
};

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

  function handleChange(feild: keyof WeatherFormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [feild]: value,
    }));
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
    event.preventDefault()
    console.log(formData)
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
        <button type="submit">Store data</button>
      </form>
    </section>
  );
}
