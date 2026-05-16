"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Globe } from "lucide-react";

const PIE_COLORS = ["#09b29d", "#bd2387", "#f59e0b", "#3b82f6", "#8b5cf6", "#10b981", "#ef4444"];

export const RANGES = [
  { value: 7, label: "7 days" },
  { value: 30, label: "30 days" },
  { value: 90, label: "90 days" },
  { value: 180, label: "6 months" },
  { value: 365, label: "1 year" },
];

export function RangeSelector({ value, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
      {RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition ${
            value === r.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

function ChartCard({ title, subtitle, children, height = 280 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div style={{ width: "100%", height }}>{children}</div>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">
      No data available in this period
    </div>
  );
}

/**
 * Renders the suite of analytics charts.
 *
 * @param {object} props
 * @param {object} props.data - getAdminAnalytics() result
 * @param {"compact"|"full"} [props.layout="full"] - "compact" hides the by-status pie and the currency chart
 */
export default function AnalyticsCharts({ data, layout = "full" }) {
  if (!data) return null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartCard title="Revenue Over Time" subtitle="Daily totals of succeeded donations">
          {data.donationsByDay.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer>
              <AreaChart data={data.donationsByDay} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#09b29d" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#09b29d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  formatter={(v) => `$${Number(v).toLocaleString()}`}
                />
                <Area type="monotone" dataKey="total" stroke="#09b29d" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Donations Per Day" subtitle="Count of succeeded donations">
          {data.donationsByDay.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer>
              <BarChart data={data.donationsByDay} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" fill="#bd2387" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      <div className={`grid grid-cols-1 ${layout === "full" ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-4 mb-4`}>
        <ChartCard title="By Donation Type" subtitle="Share of revenue by category">
          {data.donationsByType.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data.donationsByType}
                  dataKey="total"
                  nameKey="type"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {data.donationsByType.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, _name, props) => [`$${Number(v).toLocaleString()}`, props.payload.type]}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {layout === "full" && (
          <ChartCard title="By Status" subtitle="All donations in window">
            {data.donationsByStatus.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.donationsByStatus}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {data.donationsByStatus.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[(i + 2) % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        )}

        <ChartCard
          title="Top Donor Countries"
          subtitle={
            <>
              <Globe size={10} className="inline -mt-0.5 mr-1" /> Top 8 countries
            </>
          }
        >
          {data.donorsByCountry.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={data.donorsByCountry}
                margin={{ top: 5, right: 10, bottom: 0, left: 10 }}
              >
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis type="category" dataKey="country" tick={{ fontSize: 11 }} width={70} stroke="#9ca3af" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {layout === "full" && (
        <ChartCard title="Revenue by Currency" subtitle="Succeeded donations in the period" height={220}>
          {data.revenueByCurrency.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer>
              <BarChart data={data.revenueByCurrency} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="currency" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  formatter={(v) => Number(v).toLocaleString()}
                />
                <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      )}
    </>
  );
}
