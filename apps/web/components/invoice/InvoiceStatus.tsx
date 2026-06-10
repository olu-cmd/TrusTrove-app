import React from 'react';
import { InvoiceStatus as StatusType } from '@/types';

interface InvoiceStatusProps {
  status: StatusType;
}

export function InvoiceStatus({ status }: InvoiceStatusProps) {
  const getStyles = (status: StatusType) => {
    switch (status) {
      case 'Created':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Listed':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Funded':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Confirmed':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'Repaid':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Defaulted':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStyles(status)}`}>
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  );
}
