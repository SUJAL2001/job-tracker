import React from 'react';
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Globe,
  Users } from
'lucide-react';
import { Job } from '../data/mockData';
import { MatchScoreCircle } from './MatchScoreCircle';
import { SkillPill } from './SkillPill';
interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}
export function JobCard({ job, onViewDetails }: JobCardProps) {
  const formatSalary = (amount: number) => {
    return `$${(amount / 1000).toFixed(0)}k`;
  };
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col h-full group cursor-pointer"
      onClick={() => onViewDetails(job)}>
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
            style={{
              backgroundColor: job.companyColor
            }}>
            
            {job.companyName.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-emerald-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-slate-500">{job.companyName}</p>
          </div>
        </div>
        <div className="relative group/tooltip">
          <MatchScoreCircle score={job.matchScore} size="sm" />
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
            {job.matchReason}
            <div className="absolute top-full right-4 border-4 border-transparent border-t-slate-800"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100">
          <DollarSign className="w-3 h-3 text-slate-400" />
          {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100">
          <Briefcase className="w-3 h-3 text-slate-400" />
          {job.experienceLevel}
        </span>
        {job.isRemote &&
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100">
            <Globe className="w-3 h-3" />
            Remote
          </span>
        }
        {!job.isRemote &&
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100">
            <MapPin className="w-3 h-3 text-slate-400" />
            {job.location.split(',')[0]}
          </span>
        }
      </div>

      <div className="mb-5 flex-1">
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
          Tech Stack Match
        </p>
        <div className="flex flex-wrap gap-1.5">
          {job.skillsMatched.slice(0, 3).map((skill) =>
          <SkillPill key={skill} skill={skill} type="matched" />
          )}
          {job.skillsMissing.slice(0, 2).map((skill) =>
          <SkillPill key={skill} skill={skill} type="missing" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {job.postedDate}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" /> {job.applicants}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(job);
            }}
            className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
            
            Details
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors shadow-sm shadow-emerald-500/20">
            
            Apply
          </button>
        </div>
      </div>
    </div>);

}