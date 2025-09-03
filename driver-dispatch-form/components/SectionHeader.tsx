
import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="bg-amber-400 text-black font-bold text-center p-2 border-t border-slate-300">
      {title}
    </div>
  );
};

export default SectionHeader;
