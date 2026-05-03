import React from 'react';
import { Biodata } from '../../types';

interface Props {
  children: React.ReactNode;
  className?: string;
  isPrint?: boolean;
}

/**
 * A4Page Component
 * Strictly maintains A4 aspect ratio (210mm x 297mm)
 * On screen it scales gracefully, on print it forces exact dimensions
 */
export function A4Page({ children, className = '', isPrint = false }: Props) {
  return (
    <div 
      style={{ backgroundColor: '#ffffff' }}
      className={`
      relative 
      ${isPrint ? '' : 'shadow-[0_20px_50px_rgba(0,0,0,0.1)]'}
      mx-auto 
      ${isPrint ? '' : 'overflow-y-auto custom-scrollbar'}
      print:shadow-none 
      print:m-0 
      print:max-h-none
      ${isPrint ? 'w-[210mm] h-[297mm]' : 'w-full max-w-[210mm] aspect-[1/1.4142]'}
      ${className}
    `}>
      {children}
    </div>
  );
}
