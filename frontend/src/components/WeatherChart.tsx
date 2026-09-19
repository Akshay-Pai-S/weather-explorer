import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { WeatherChartProps } from "../types/weather";

export default function WeatherChart({ data }: WeatherChartProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Teperature</h2>
        <p className="mt-1 text-sm text-gray-500">
          Daily Maximum and Minimum temperature
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} unit="°C" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="tempMax"
              name="Max Temperature"
              dot={false}
              unit="°C"
            />
            <Line
              type="monotone"
              dataKey="tempMin"
              name="Min Temperature"
              dot={false}
              unit="°C"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
