import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
interface SkillPillProps {
  skill: string;
  type: 'matched' | 'missing' | 'develop';
}
export function SkillPill({ skill, type }: SkillPillProps) {
  if (type === 'matched') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
        <Check className="w-3 h-3" />
        {skill}
      </span>);

  }
  if (type === 'missing') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-600 text-xs font-medium border border-red-100 opacity-80">
        <X className="w-3 h-3" />
        {skill}
      </span>);

  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
      <AlertCircle className="w-3 h-3" />
      {skill}
    </span>);

}