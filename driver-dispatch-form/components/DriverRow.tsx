import React from 'react';
import { DriverData } from '../types';

interface DriverRowProps {
  data: DriverData;
  onChange: (id: string, field: keyof Omit<DriverData, 'id'>, value: string) => void;
  driverNames: string[];
}

const InputCell: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; className?: string}> = 
({ value, onChange, type = "text", className = "" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`w-full h-full p-2 text-center bg-transparent outline-none focus:bg-blue-50 transition-colors ${className}`}
  />
);

const LabeledInput: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({label, children, className}) => (
    <div className={className}>
        <label className="md:hidden text-sm font-semibold text-gray-600 px-2 pt-2">{label}</label>
        {children}
    </div>
);


const DriverRow: React.FC<DriverRowProps> = ({ data, onChange, driverNames }) => {
  const handleChange = (field: keyof Omit<DriverData, 'id'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(data.id, field, e.target.value);
  };

  return (
    <div className="block md:flex border-t border-slate-300 text-gray-800">
      <div className="md:w-40 border-b md:border-b-0 md:border-r border-slate-300 font-medium bg-slate-50">
        <LabeledInput label="Driver">
            <select
              value={data.driverName}
              onChange={(e) => onChange(data.id, 'driverName', e.target.value)}
              className="w-full h-full p-2 text-left md:text-center bg-transparent outline-none focus:bg-blue-50 transition-colors"
            >
              <option value="">Select Driver</option>
              {driverNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
        </LabeledInput>
      </div>
      <div className="md:w-24 border-b md:border-b-0 md:border-r border-slate-300 font-medium bg-slate-50">
         <LabeledInput label="Bus No">
            <InputCell value={data.busNo} onChange={handleChange('busNo')} />
         </LabeledInput>
      </div>

      <div className="md:w-48 border-b md:border-b-0 md:border-r border-slate-300">
        <div className="md:hidden text-sm font-semibold text-gray-600 px-2 pt-2 text-center bg-gray-50 border-b border-slate-200">Head Count (Mill/Mine)</div>
        <div className="flex">
            <div className="w-1/2 md:border-r border-slate-300">
                 <LabeledInput label="Up">
                    <InputCell value={data.headCountMillMineUp} onChange={handleChange('headCountMillMineUp')} type="number" />
                 </LabeledInput>
            </div>
            <div className="w-1/2">
                <LabeledInput label="Down">
                    <InputCell value={data.headCountMillMineDown} onChange={handleChange('headCountMillMineDown')} type="number" />
                </LabeledInput>
            </div>
        </div>
      </div>

      <div className="md:w-48 border-b md:border-b-0 md:border-r border-slate-300">
        <div className="md:hidden text-sm font-semibold text-gray-600 px-2 pt-2 text-center bg-gray-50 border-b border-slate-200">Others (Ladies/L-Fill)</div>
        <div className="flex">
            <div className="w-1/2 md:border-r border-slate-300">
                <LabeledInput label="Up">
                    <InputCell value={data.othersUp} onChange={handleChange('othersUp')} type="number" />
                </LabeledInput>
            </div>
            <div className="w-1/2">
                <LabeledInput label="Down">
                    <InputCell value={data.othersDown} onChange={handleChange('othersDown')} type="number" />
                </LabeledInput>
            </div>
        </div>
      </div>

      <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-300">
        <LabeledInput label="Destination">
            <InputCell value={data.destination} onChange={handleChange('destination')} className="text-left md:text-center" />
        </LabeledInput>
      </div>
      <div className="flex-1">
        <LabeledInput label="Comments">
            <InputCell value={data.comments} onChange={handleChange('comments')} className="text-left md:text-center"/>
        </LabeledInput>
      </div>
    </div>
  );
};

export default DriverRow;
