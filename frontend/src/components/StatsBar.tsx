import React from 'react';
import { RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
interface StatsBarProps {
  totalJobs: number;
  strongMatches: number;
  applied: number;
  lastRefreshed: string;
  onRefresh: () => void;
  isRefreshing: boolean;
}
const sparklineData1 = [
{
  value: 120
},
{
  value: 132
},
{
  value: 145
},
{
  value: 150
},
{
  value: 165
},
{
  value: 180
},
{
  value: 195
}];

const sparklineData2 = [
{
  value: 10
},
{
  value: 12
},
{
  value: 15
},
{
  value: 14
},
{
  value: 18
},
{
  value: 22
},
{
  value: 25
}];

const sparklineData3 = [
{
  value: 2
},
{
  value: 2
},
{
  value: 3
},
{
  value: 3
},
{
  value: 4
},
{
  value: 4
},
{
  value: 4
}];

export function StatsBar({
  totalJobs,
  strongMatches,
  applied,
  lastRefreshed,
  onRefresh,
  isRefreshing
}: StatsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">
            Total Jobs Found
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-900">{totalJobs}</h3>
            <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3 mr-1" />
              12%
            </div>
          </div>
        </div>
        <div className="h-10 mt-4 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData1}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#94A3B8"
                strokeWidth={2}
                dot={false} />
              
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">
            Strong Matches
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-emerald-600">
              {strongMatches}
            </h3>
            <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3 mr-1" />
              8%
            </div>
          </div>
        </div>
        <div className="h-10 mt-4 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData2}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                dot={false} />
              
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Applied</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-blue-600">{applied}</h3>
            <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              <Minus className="w-3 h-3 mr-1" />
              0%
            </div>
          </div>
        </div>
        <div className="h-10 mt-4 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData3}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false} />
              
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-shadow">
        <p className="text-sm font-medium text-slate-500 mb-1">
          Last Refreshed
        </p>
        <h3 className="text-lg font-semibold text-slate-900">
          {lastRefreshed}
        </h3>
        <p className="text-xs text-slate-400 mt-1">Auto-refreshes every hour</p>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all disabled:opacity-50 group-hover:scale-105">
          
          <RefreshCw
            className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
          
        </button>
      </div>
    </div>);

}