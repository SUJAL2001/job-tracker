import React from 'react';
import { CompanyCard } from '../components/CompanyCard';
import { companies } from '../data/mockData';
export function Companies() {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Companies</h1>
        <p className="text-slate-500 text-sm mt-1">
          Explore companies hiring for your skill set.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) =>
        <CompanyCard key={company.id} company={company} />
        )}
      </div>
    </div>);

}