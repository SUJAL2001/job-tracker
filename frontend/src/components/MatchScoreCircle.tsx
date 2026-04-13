import React from 'react';
interface MatchScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}
export function MatchScoreCircle({
  score,
  size = 'md'
}: MatchScoreCircleProps) {
  let colorClass = 'text-red-500';
  let bgClass = 'bg-red-50';
  let strokeClass = 'stroke-red-500';
  if (score >= 80) {
    colorClass = 'text-emerald-500';
    bgClass = 'bg-emerald-50';
    strokeClass = 'stroke-emerald-500';
  } else if (score >= 60) {
    colorClass = 'text-amber-500';
    bgClass = 'bg-amber-50';
    strokeClass = 'stroke-amber-500';
  } else if (score >= 40) {
    colorClass = 'text-orange-500';
    bgClass = 'bg-orange-50';
    strokeClass = 'stroke-orange-500';
  }
  const dimensions = {
    sm: {
      wrapper: 'w-10 h-10',
      text: 'text-xs',
      radius: 16,
      stroke: 3
    },
    md: {
      wrapper: 'w-12 h-12',
      text: 'text-sm',
      radius: 20,
      stroke: 4
    },
    lg: {
      wrapper: 'w-24 h-24',
      text: 'text-2xl',
      radius: 44,
      stroke: 8
    }
  };
  const { wrapper, text, radius, stroke } = dimensions[size];
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - score / 100 * circumference;
  return (
    <div
      className={`relative flex items-center justify-center rounded-full ${bgClass} ${wrapper}`}>
      
      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-slate-200" />
        
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${strokeClass} transition-all duration-1000 ease-out`} />
        
      </svg>
      <span className={`font-bold ${colorClass} ${text}`}>{score}%</span>
    </div>);

}