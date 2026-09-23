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

export type InputFieldProps = {
  id: string;
  label: string;
  type: "number" | "date";
  value: string;
  onChange: (value: string) => void;
  error?: string;
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
  onFileSelect: (fileName: string) => void;
  loading: boolean;
  error: string;
};

export type WeatherFileContent = {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
  };
};

export type WeatherDay = {
  date: string;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
};

export type WeatherTableProps = {
  data: WeatherDay[];
};

export type WeatherChartProps = {
  data: WeatherDay[];
};

export type WeatherFormProps = {
  onStoreSuccess: () => Promise<void>;
};

export type ValidationErrorDetail = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  status: string;
  message: string;
  details?: ValidationErrorDetail[];
};
