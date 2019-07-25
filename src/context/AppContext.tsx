import * as React from 'react';
import uuid from 'uuid';

type Props = {
  children: React.ReactNode;
};
export interface IAppContext {
  resetId: string;
  skillCount: number;
  selectedSkillCount: number;
  decrementSelectedSkillCount: VoidFunction;
  resetSkills: VoidFunction;
  incrementSelectedSkillCount: (number: number) => void;
  addToSkillCount: (number: number) => void;
}

const AppContext = React.createContext<IAppContext>({
  resetId: '',
  skillCount: 0,
  selectedSkillCount: 0,
  incrementSelectedSkillCount: () => undefined,
  decrementSelectedSkillCount: () => undefined,
  addToSkillCount: () => undefined,
  resetSkills: () => undefined,
});

export function SkillProvider({ children }: Props) {
  const [resetId, setResetId] = React.useState('');
  const [skillCount, setSkillCount] = React.useState(0);
  const [selectedSkillCount, setSelectedSkillCount] = React.useState(0);

  function addToSkillCount(number: number): void {
    return setSkillCount(prev => prev + number);
  }

  function incrementSelectedSkillCount(number: number = 1): void {
    return setSelectedSkillCount(prev => prev + number);
  }

  function decrementSelectedSkillCount(): void {
    return setSelectedSkillCount(prev => prev - 1);
  }

  function resetSkills() {
    setSelectedSkillCount(0);
    setResetId(uuid());

    return;
  }

  return (
    <AppContext.Provider
      value={{
        addToSkillCount: addToSkillCount,
        skillCount: skillCount,
        incrementSelectedSkillCount: incrementSelectedSkillCount,
        decrementSelectedSkillCount: decrementSelectedSkillCount,
        selectedSkillCount: selectedSkillCount,
        resetSkills: resetSkills,
        resetId: resetId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
