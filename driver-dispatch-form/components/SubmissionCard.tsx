import React, { useState } from 'react';
import { Submission, DriverData, EscortData } from '../types';
import SectionHeader from './SectionHeader';

interface SubmissionCardProps {
  submission: Submission;
}

const ReadOnlyDriverRow: React.FC<{ driver: DriverData }> = ({ driver }) => (
    <div className="block md:flex border-t text-sm text-gray-800">
        <div className="p-2 md:w-32 md:border-r bg-slate-50 font-medium break-words"><span className="md:hidden font-semibold">Driver: </span>{driver.driverName || '-'}</div>
        <div className="p-2 md:w-24 md:border-r bg-slate-50"><span className="md:hidden font-semibold">Bus No: </span>{driver.busNo}</div>
        <div className="md:w-48 md:flex md:border-r">
            <div className="flex justify-between p-2 md:w-1/2 md:border-r"><span className="font-semibold">Head Count (Up):</span><span>{driver.headCountMillMineUp || '-'}</span></div>
            <div className="flex justify-between p-2 md:w-1/2"><span className="font-semibold">Head Count (Down):</span><span>{driver.headCountMillMineDown || '-'}</span></div>
        </div>
        <div className="md:w-48 md:flex md:border-r">
            <div className="flex justify-between p-2 md:w-1/2 md:border-r"><span className="font-semibold">Others (Up):</span><span>{driver.othersUp || '-'}</span></div>
            <div className="flex justify-between p-2 md:w-1/2"><span className="font-semibold">Others (Down):</span><span>{driver.othersDown || '-'}</span></div>
        </div>
        <div className="p-2 md:flex-1 md:border-r break-words"><span className="md:hidden font-semibold">Destination: </span>{driver.destination || '-'}</div>
        <div className="p-2 md:flex-1 break-words"><span className="md:hidden font-semibold">Comments: </span>{driver.comments || '-'}</div>
    </div>
);


const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { username, submittedAt, formData } = submission;

  const submittedDate = new Date(submittedAt);

  return (
    <div className="border border-slate-300 rounded-lg bg-white shadow-sm overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 hover:bg-slate-50 focus:outline-none"
      >
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="mb-2 sm:mb-0">
            <p className="font-semibold text-blue-700 break-all">{username}</p>
            <p className="text-sm text-gray-500">
              {submittedDate.toLocaleDateString()} at {submittedDate.toLocaleTimeString()}
            </p>
          </div>
          <svg
            className={`w-6 h-6 text-gray-600 transform transition-transform self-end sm:self-center ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-300 p-2 sm:p-4 bg-gray-50">
           <div className="overflow-x-auto">
            <div className="min-w-full md:min-w-[1000px]">
              {/* Header */}
              <div className="hidden md:flex bg-amber-400 text-black font-bold text-xs">
                <div className="w-32 p-2 text-center border-r">DRIVER</div>
                <div className="w-24 p-2 text-center border-r">Bus No</div>
                <div className="w-48 text-center border-r">
                    <div className="p-1 border-b">HEAD COUNT (Mill/Mine)</div>
                    <div className="flex"><div className="w-1/2 p-1 border-r">Up</div><div className="w-1/2 p-1">Down</div></div>
                </div>
                <div className="w-48 text-center border-r">
                    <div className="p-1 border-b">OTHERS (Ladies/L-Fill)</div>
                    <div className="flex"><div className="w-1/2 p-1 border-r">Up</div><div className="w-1/2 p-1">Down</div></div>
                </div>
                <div className="flex-1 p-2 text-center border-r">Destination</div>
                <div className="flex-1 p-2 text-center">Comments</div>
              </div>
              
              <div className="md:border-t-0 border-t border-slate-300">
                 {[...formData.drivers1, ...formData.drivers2].map((driver, index) => (
                    <ReadOnlyDriverRow key={index} driver={driver} />
                 ))}
              </div>


              <SectionHeader title="ESCORTS" />

              {formData.escorts.map((escort, index) => (
                 <div key={index} className="block md:flex border-t text-sm">
                    <div className="md:w-[calc(8rem+6rem)] p-2 md:border-r bg-slate-50 font-medium"><span className="md:hidden font-semibold">Escort: </span>{escort.id}</div>
                    <div className="flex-1 p-2"><span className="md:hidden font-semibold">Details: </span>{escort.value}</div>
                 </div>
              ))}
            </div>
           </div>
           
           <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
                    <SectionHeader title="COMMENTS" />
                    <p className="p-3 text-gray-700 min-h-[6rem] break-words">{formData.comments || 'No comments.'}</p>
                </div>
                <div className="space-y-2">
                    <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
                        <SectionHeader title="RDO" />
                        <p className="p-2 text-gray-700 break-words">{formData.rdo || '-'}</p>
                    </div>
                    <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
                        <SectionHeader title="SPARE DRIVER" />
                        <p className="p-2 text-gray-700 break-words">{formData.spareDriver || '-'}</p>
                    </div>
                    <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
                        <SectionHeader title="SICK/ABSENT" />
                        <p className="p-2 text-gray-700 break-words">{formData.sickAbsent || '-'}</p>
                    </div>
                </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionCard;
