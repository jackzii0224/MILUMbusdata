
const DRIVERS_KEY = 'dispatch_drivers';

const initialDrivers = [
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

const initializeDrivers = () => {
  const driversJson = localStorage.getItem(DRIVERS_KEY);
  if (!driversJson) {
    localStorage.setItem(DRIVERS_KEY, JSON.stringify(initialDrivers.sort((a, b) => a.localeCompare(b))));
  }
};

initializeDrivers();

export const getDrivers = (): string[] => {
  const driversJson = localStorage.getItem(DRIVERS_KEY);
  return driversJson ? JSON.parse(driversJson) : [];
};

const saveDrivers = (drivers: string[]): void => {
  localStorage.setItem(DRIVERS_KEY, JSON.stringify(drivers));
};

export const addDriver = (name: string): string[] => {
  if (!name || name.trim() === '') {
    throw new Error("Driver name cannot be empty.");
  }
  const drivers = getDrivers();
  const trimmedName = name.trim();
  if (drivers.some(d => d.toLowerCase() === trimmedName.toLowerCase())) {
    throw new Error("Driver already exists.");
  }
  const newDrivers = [...drivers, trimmedName].sort((a, b) => a.localeCompare(b));
  saveDrivers(newDrivers);
  return newDrivers;
};

export const deleteDriver = (nameToDelete: string): string[] => {
  const drivers = getDrivers();
  const newDrivers = drivers.filter(d => d !== nameToDelete);
  saveDrivers(newDrivers);
  return newDrivers;
};
