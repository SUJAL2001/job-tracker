import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  Loader2,
  Sparkles,
  Target,
  AlertTriangle,
  Lightbulb } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jobs } from '../data/mockData';
import { MatchScoreCircle } from '../components/MatchScoreCircle';
import { SkillPill } from '../components/SkillPill';
type UploadState = 'idle' | 'uploading' | 'analyzing' | 'complete';
export function ResumeMatch() {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [fileName, setFileName] = useState('');
  const handleSimulateUpload = () => {
    setFileName('alex_developer_resume_2026.pdf');
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('analyzing');
      setTimeout(() => {
        setUploadState('complete');
      }, 2500);
    }, 1000);
  };
  // Sort jobs by match score for the results
  const sortedJobs = [...jobs].
  sort((a, b) => b.matchScore - a.matchScore).
  slice(0, 5);
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          AI Resume Match
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Upload your latest resume and our AI will analyze your skills against
          thousands of open roles to find your perfect match.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {uploadState === 'idle' &&
        <motion.div
          key="upload"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors cursor-pointer group"
          onClick={handleSimulateUpload}>
          
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Drop your resume PDF here
            </h3>
            <p className="text-slate-500 mb-6">or click to browse your files</p>
            <button className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors">
              Select File
            </button>
            <p className="text-xs text-slate-400 mt-4">
              Supported formats: PDF, DOCX (Max 5MB)
            </p>
          </motion.div>
        }

        {(uploadState === 'uploading' || uploadState === 'analyzing') &&
        <motion.div
          key="processing"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
          
            <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-6 border border-slate-200">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <p className="font-medium text-slate-900 mb-6">{fileName}</p>

            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              <p className="text-emerald-600 font-medium animate-pulse">
                {uploadState === 'uploading' ?
              'Uploading document...' :
              'AI is analyzing your skills...'}
              </p>
            </div>
          </motion.div>
        }

        {uploadState === 'complete' &&
        <motion.div
          key="results"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="space-y-8">
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 text-lg">
                      Resume Analyzed Successfully
                    </h3>
                    <p className="text-emerald-700 text-sm">
                      Parsed {fileName} • Found{' '}
                      {jobs.filter((j) => j.matchScore >= 80).length} strong
                      matches.
                    </p>
                  </div>
                </div>
                <button
                onClick={() => setUploadState('idle')}
                className="self-start px-4 py-2 bg-white text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
                
                  Upload New Resume
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> ATS Readability
                </p>
                <div className="text-4xl font-bold text-slate-900 mb-1">
                  94<span className="text-xl text-slate-400">/100</span>
                </div>
                <p className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">
                  Excellent formatting
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Identified Skill Gaps
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <p>
                      Missing{' '}
                      <span className="font-semibold text-slate-900">
                        Cloud Architecture (AWS/GCP)
                      </span>{' '}
                      keywords, which appear in 45% of your target roles.
                    </p>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <p>
                      System Design experience is implied but not explicitly
                      stated with metrics.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  AI Suggestions
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <p>
                      Quantify your impact in the "Senior Developer" role (e.g.,
                      "Improved performance by X%").
                    </p>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <p>
                      Move the "Skills" section to the top to improve ATS
                      parsing for technical roles.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Top Matches Ranked
              </h2>

              <div className="space-y-4">
                {sortedJobs.map((job, index) =>
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:border-emerald-300 transition-colors">
                
                    <div className="flex flex-col items-center justify-center md:w-32 shrink-0 border-r border-slate-100 pr-6">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Rank #{index + 1}
                      </span>
                      <MatchScoreCircle score={job.matchScore} size="lg" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {job.title}
                          </h3>
                          <p className="text-slate-500 text-sm">
                            {job.companyName} • {job.location}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                          Apply
                        </button>
                      </div>

                      <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700">
                          AI Note:
                        </span>{' '}
                        {job.matchReason}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {job.skillsMatched.map((skill) =>
                    <SkillPill key={skill} skill={skill} type="matched" />
                    )}
                        {job.skillsMissing.map((skill) =>
                    <SkillPill key={skill} skill={skill} type="missing" />
                    )}
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}