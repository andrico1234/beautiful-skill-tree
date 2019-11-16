import React from 'react';
import { AppProvider } from '../context/AppContext';
import { FilterProvider } from '../context/FilterContext';

interface Props {
  children: React.ReactNode;
}

function SkillProvider({ children }: Props) {
  return (
    <AppProvider>
      <FilterProvider>{children}</FilterProvider>
    </AppProvider>
  );
}

export default SkillProvider;
