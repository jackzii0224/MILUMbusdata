import React from 'react';
import { EscortData } from '../types';

interface EscortRowProps {
  data: EscortData;
  onChange: (key: string, field: keyof Omit<EscortData, 'key'>, value: string) => void;
}

const LabeledInput: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({label, children, className}) => (
    <div className={className}>
        <label className="md:hidden text-sm font-semibold text-gray-600 px-2 pt-2">{label}</label>
        {children}
    </div>
);

const EscortRow: React.FC<EscortRowProps> = ({ data, onChange }) => {
  return (
    <div className="block md:flex border-t border-slate-300 text-gray-800">
      <div className="md:w-[calc(10rem+6rem)] border-b md:border-b-0 md:border-r border-slate-300 font-medium bg-slate-50">
        <LabeledInput label="Escort">
            <input
            type="text"
            value={data.id}
            onChange={(e) => onChange(data.key, 'id', e.target.value)}
            className="w-full h-full p-2 text-left md:text-center bg-transparent outline-none focus:bg-blue-50 transition-colors"
            />
        </LabeledInput>
      </div>
      <div className="flex-1">
        <LabeledInput label="Details">
            <input
            type="text"
            value={data.value}
            onChange={(e) => onChange(data.key, 'value', e.target.value)}
            className="w-full h-full p-2 text-left bg-transparent outline-none focus:bg-blue-50 transition-colors"
            />
        </LabeledInput>
      </div>
    </div>
  );
};

export default EscortRow;