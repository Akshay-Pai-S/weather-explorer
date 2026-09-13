export type WeatherFormData = {
  latitude: string;
  longitude: string;
  startDate: string;
  endDate: string;
};

export type InputFieldConfig = {
  id: string;
  label: string;
  type: "number" | "date";
  field: keyof WeatherFormData;
};

export type WeatherRequest = {
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
};

export type StoreWeatherResponse = {
  status: string;
  file: string;
};

export type StoredFile = {
  name: string;
  size: number;
  created_at: string;
};

export type ListWeatherFilesResponse = {
  files: StoredFile[];
};

export type StoredFileProps = {
  files: StoredFile[];
};
