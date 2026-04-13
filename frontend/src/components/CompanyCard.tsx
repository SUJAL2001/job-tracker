import React from 'react';
import {
  Building2,
  Users,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus } from
'lucide-react';
import { Company } from '../data/mockData';
interface CompanyCardProps {
  company: Company;
}
export function CompanyCard({ company }: CompanyCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  const renderTrend = () => {
    if (company.hiringTrend === 'up')
    return (
      <span className="flex items-center text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
          <TrendingUp className="w-3 h-3 mr-1" /> Hiring
        </span>);

    if (company.hiringTrend === 'down')
    return (
      <span className="flex items-center text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
          <TrendingDown className="w-3 h-3 mr-1" /> Slowed
        </span>);

    return (
      <span className="flex items-center text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
        <Minus className="w-3 h-3 mr-1" /> Stable
      </span>);

  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col h-full cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
            style={{
              backgroundColor: company.color
            }}>
            
            {company.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">
              {company.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{company.size}</span>
            </div>
          </div>
        </div>
        {renderTrend()}
      </div>

      <p className="text-sm text-slate-600 mb-5 line-clamp-2 flex-1">
        {company.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> Open Roles
          </p>
          <p className="font-bold text-slate-900">{company.openRoles}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Avg Match</p>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${getScoreColor(company.avgMatchScore)}`}>
            </div>
            <p className="font-bold text-slate-900">{company.avgMatchScore}%</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-medium text-slate-500 mb-1.5">
          Top Matching Role
        </p>
        <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2 rounded-md border border-slate-100 truncate">
          {company.topRole}
        </p>
      </div>

      <button className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:bg-emerald-50 mt-auto">
        View Company <ChevronRight className="w-4 h-4" />
      </button>
    </div>);

}