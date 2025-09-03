
import React from 'react';
import SectionHeader from './SectionHeader';

interface TextAreaSectionProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

const TextAreaSection: React.FC<TextAreaSectionProps> = ({ title, value, onChange, rows = 3 }) => {
  return (
    <div className="border-t border-slate-300">
      <SectionHeader title={title} />
      <div className="p-1">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full p-2 text-gray-800 bg-transparent outline-none focus:bg-blue-50 transition-colors resize-y"
        />
      </div>
    </div>
  );
};

export default TextAreaSection;
