import React, { useState } from 'react';
import { DriverData, EscortData, FormData } from '../types';
import DriverRow from '../components/DriverRow';
import SectionHeader from '../components/SectionHeader';
import EscortRow from '../components/EscortRow';
import TextAreaSection from '../components/TextAreaSection';
import { saveSubmission } from '../services/formService';
import { getCurrentUser } from '../services/authService';

// FIX: Added driverNames constant. This is a required prop for the DriverRow component.
const driverNames = [
  'AEWE.A', 'ANDERSON J', 'ANDREW BOROK', 'ANDREW DEPKIN', 'ANDREW PEPENA', 'ANDY JOHN', 
  'ANTON KAIA', 'ANTON PAI', 'BOB PITO', 'BON YOBON', 'BRUCE NOEL', 'CHARLES PUPU', 
  'CHARLIE POPHIAN', 'DANIEL NANI', 'DAVID FENAM', 'DAVID KIAP', 'DAVID PAKAT', 'DAVIS D', 
  'DUSTON', 'EDDIE DIAU', 'EDWARD G', 'EDWIN YAMAN', 'EVELYN ASEKIM', 'FELIX AKA', 
  'FELIX DOMINICUS', 'FELIX M', 'GEORGE KANDON', 'GINSA GEHMAT', 'GREANP', 'HENRY HEREBE', 
  'HENRY SAPIEN', 'HEWE', 'IAN WALO', 'ILA MAPE', 'JACKIE GRAKOI', 'JAMES MAMEA', 'JAMES WORIN', 
  'JESS M', 'JOE KOROPON', 'JOHN NAKDAUN', 'JOHN PASKA', 'JOHN SINON', 'JOHN TONDOPAN', 
  'JUNIOR STANDLY', 'KENEDY J', 'KEVIN AIHI', 'KII IKI', 'LEMANG KANAWI', 'LEMECK', 
  'LINUS NINESIENG', 'LUKIE LAKAPIN', 'MAILY BILL', 'MARE RUACH', 'MARK KILIPSEP', 
  'MARTIN NIMOL', 'MARTIN P', 'MARTIN SAIPO', 'MARTIN T', 'MATHEW JOHN', 'MATUS DAUYAI', 
  'MILOK L', 'NIXON KOROKA', 'PETER BUSINA', 'PHILIP KATALLY', 'PIUS KEYIKEN', 
  'RAISA SAMBATH', 'RODNEY', 'RODY NAROK', 'ROGER KRELO', 'RUBEN.M', 'SAMOA SIMOI', 
  'SAMSON PUAKA', 'SELSON IRAP', 'SEM', 'SIRIEL D', 'SIRIEL MEMBA', 'STANLEY BISAKIM', 
  'TAU RENAGI', 'THURSTON', 'TIPEY HAWAN', 'TURUQ TETAC', 'VINCENT SAPARIT', 'WAKS', 
  'WILLIAM ROMRUNDI', 'WILLIE JOE', 'WINGELA'
];

const initialDrivers1 = [
  'B010', 'B011', 'B012', 'B013', 'B014', 'B015', 'B016', 'B017', 'B018', 
  'B019', 'B020', 'B021', 'B022', 'B023', 'B024', 'B025', 'B026'
].map(busNo => ({ id: busNo, driverName: '', busNo, headCountMillMineUp: '', headCountMillMineDown: '', othersUp: '', othersDown: '', destination: '', comments: '' }));

const initialDrivers2 = [
  'MSL194', 'MSL195', 'MSL196', 'MSL200', 'L1825', 'L1826', 'L1891', 'L1844'
].map(busNo => ({ id: busNo, driverName: '', busNo, headCountMillMineUp: '', headCountMillMineDown: '', othersUp: '', othersDown: '', destination: '', comments: '' }));

const initialEscorts = ['L1828', 'L1884', 'MSL117'].map(id => ({ key: id, id, value: '' }));

const getInitialState = (): FormData => ({
    drivers1: initialDrivers1,
    drivers2: initialDrivers2,
    escorts: initialEscorts,
    comments: '',
    rdo: '',
    spareDriver: '',
    sickAbsent: '',
});

const UserDashboard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(getInitialState());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleDriverChange = (
    id: string,
    field: keyof Omit<DriverData, 'id'>,
    value: string
  ) => {
    const updateDrivers = (drivers: DriverData[]) =>
      drivers.map(d => d.id === id ? { ...d, [field]: value } : d);

    setFormData(prev => ({
      ...prev,
      drivers1: updateDrivers(prev.drivers1),
      drivers2: updateDrivers(prev.drivers2),
    }));
  };
  
  const handleEscortChange = (key: string, field: keyof Omit<EscortData, 'key'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      escorts: prev.escorts.map(e => (e.key === key ? { ...e, [field]: value } : e)),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = getCurrentUser();
    if (!currentUser) {
        setSubmitMessage("Error: You are not logged in.");
        return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
        saveSubmission(formData, currentUser);
        setSubmitMessage('Form submitted successfully!');
        setFormData(getInitialState()); // Reset form
    } catch (error) {
        setSubmitMessage('An error occurred during submission.');
    } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitMessage(''), 3000); // Message disappears after 3 seconds
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <div className="min-w-full md:min-w-[1200px]">
              {/* Header - Hidden on mobile, visible on medium screens and up */}
              <div className="hidden md:flex bg-amber-400 text-black font-bold text-sm">
                <div className="w-40 p-2 text-center border-r border-slate-300">DRIVER</div>
                <div className="w-24 p-2 text-center border-r border-slate-300">Bus No</div>
                <div className="w-48 border-r border-slate-300">
                  <div className="text-center p-1 border-b border-slate-300">HEAD COUNT</div>
                  <div className="flex">
                    <div className="w-1/2 text-center p-1 border-r border-slate-300">Mill/Mine</div>
                    <div className="w-1/2 text-center p-1">Up / Down</div>
                  </div>
                </div>
                <div className="w-48 border-r border-slate-300">
                  <div className="text-center p-1 border-b border-slate-300">Others</div>
                  <div className="flex">
                    <div className="w-1/2 text-center p-1 border-r border-slate-300">Ladies/L-Fill</div>
                    <div className="w-1/2 text-center p-1">Up / Down</div>
                  </div>
                </div>
                <div className="flex-1 p-2 text-center border-r border-slate-300">Destination</div>
                <div className="flex-1 p-2 text-center">Comments</div>
              </div>
              
              {/* Driver Rows */}
              {formData.drivers1.map(driver => (
                // FIX: Pass driverNames prop to fix missing property error.
                <DriverRow key={driver.id} data={driver} onChange={handleDriverChange} driverNames={driverNames} />
              ))}
              
              <SectionHeader title="" />
              
              {formData.drivers2.map(driver => (
                // FIX: Pass driverNames prop to fix missing property error.
                <DriverRow key={driver.id} data={driver} onChange={handleDriverChange} driverNames={driverNames} />
              ))}

              <SectionHeader title="ESCORTS" />

              {formData.escorts.map(escort => (
                <EscortRow key={escort.key} data={escort} onChange={handleEscortChange} />
              ))}
            </div>
          </div>
          
          {/* Bottom Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2">
             <TextAreaSection 
                title="COMMENTS" 
                value={formData.comments} 
                onChange={(value) => setFormData(p => ({...p, comments: value}))}
                rows={5}
             />
             <div className="flex flex-col">
                <TextAreaSection 
                  title="RDO" 
                  value={formData.rdo} 
                  onChange={(value) => setFormData(p => ({...p, rdo: value}))}
                  rows={1}
                />
                <TextAreaSection 
                  title="SPARE DRIVER" 
                  value={formData.spareDriver} 
                  onChange={(value) => setFormData(p => ({...p, spareDriver: value}))}
                  rows={1}
                />
                <TextAreaSection 
                  title="SICK/ABSENT" 
                  value={formData.sickAbsent} 
                  onChange={(value) => setFormData(p => ({...p, sickAbsent: value}))}
                  rows={1}
                />
             </div>
          </div>
          
          <div className="p-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            {submitMessage && (
              <span className="text-green-600 font-semibold text-center sm:text-left">{submitMessage}</span>
            )}
            <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors disabled:bg-blue-400"
                disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;