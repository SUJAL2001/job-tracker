import React, { useEffect } from 'react';
import {
  X,
  MapPin,
  Briefcase,
  ExternalLink,
  BarChart3,
  Clock,
  DollarSign,
  Globe,
  Users } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '../data/mockData';
import { MatchScoreCircle } from './MatchScoreCircle';
import { SkillPill } from './SkillPill';
interface JobDetailPanelProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}
export function JobDetailPanel({ job, isOpen, onClose }: JobDetailPanelProps) {
  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && job &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" />
        

          {/* Panel */}
          <motion.div
          initial={{
            x: '100%'
          }}
          animate={{
            x: 0
          }}
          exit={{
            x: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200
          }}
          className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200">
          
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                style={{
                  backgroundColor: job.companyColor
                }}>
                
                  {job.companyName.charAt(0)}
                </div>
                <span className="font-medium text-slate-700">
                  {job.companyName}
                </span>
              </div>
              <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">
                  {job.matchScore}% Match
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {job.postedDate}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                {job.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium border border-slate-200">
                  <DollarSign className="w-4 h-4 text-slate-400" />$
                  {(job.salaryMin / 1000).toFixed(0)}k - $
                  {(job.salaryMax / 1000).toFixed(0)}k
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium border border-slate-200">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {job.experienceLevel}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium border border-slate-200">
                  {job.isRemote ?
                <Globe className="w-4 h-4 text-slate-400" /> :

                <MapPin className="w-4 h-4 text-slate-400" />
                }
                  {job.isRemote ? 'Remote' : job.location}
                </span>
              </div>

              <button className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-sm shadow-emerald-500/20 transition-colors flex items-center justify-center gap-2 mb-8 group">
                Apply Now{' '}
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Match Score Section */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-8">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  AI Match Analysis
                </h3>

                <div className="flex items-center gap-5 mb-5">
                  <MatchScoreCircle score={job.matchScore} size="lg" />
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {job.matchReason}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-2">
                      Skills You Have
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skillsMatched.map((skill) =>
                    <SkillPill key={skill} skill={skill} type="matched" />
                    )}
                    </div>
                  </div>

                  {job.skillsMissing.length > 0 &&
                <div>
                      <p className="text-xs font-medium text-slate-500 mb-2">
                        Skills to Develop
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skillsMissing.map((skill) =>
                    <SkillPill key={skill} skill={skill} type="develop" />
                    )}
                      </div>
                    </div>
                }
                </div>
              </div>

              {/* Compensation Placeholder */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.techStack.map((tech) =>
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200">
                  
                      {tech}
                    </span>
                )}
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Job Description
                </h3>
                <div className="prose prose-sm prose-slate max-w-none">
                  {job.description.split('\n').map((paragraph, idx) =>
                <p
                  key={idx}
                  className="mb-3 text-slate-600 leading-relaxed">
                  
                      {paragraph}
                    </p>
                )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 mt-auto">
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Matched on {new Date().toLocaleDateString()} • Posted{' '}
                {job.postedDate}
              </p>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}