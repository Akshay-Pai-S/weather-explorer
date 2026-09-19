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
    <section>
      <h2>Teperature</h2>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="tempMax"
              name="Max Temperature"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="tempMin"
              name="Min Temperature"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
