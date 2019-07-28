import * as React from 'react';
import uuid from 'uuid';
import { SkillCount } from '../models';

type Props = {
  children: React.ReactNode;
};
export interface IAppContext {
  skillCount: SkillCount;
  addToSkillCount: (skilCount: SkillCount) => void;
  selectedSkillCount: SkillCount;
  incrementSelectedCount: (optional?: boolean) => void;
  decrementSelectedCount: (optional?: boolean) => void;
  resetId: string;
  resetSkills: VoidFunction;
}

const AppContext = React.createContext<IAppContext>({
  skillCount: {
    required: 0,
    optional: 0,
  },
  addToSkillCount: () => undefined,
  selectedSkillCount: {
    required: 0,
    optional: 0,
  },
  incrementSelectedCount: () => undefined,
  decrementSelectedCount: () => undefined,
  resetId: '',
  resetSkills: () => undefined,
});

export function SkillProvider({ children }: Props) {
  const [resetId, setResetId] = React.useState('');
  const [skillCount, setSkillCount] = React.useState({
    required: 0,
    optional: 0,
  });
  const [selectedSkillCount, setSelectedSkillCount] = React.useState({
    required: 0,
    optional: 0,
  });

  function addToSkillCount(skillCount: SkillCount): void {
    return setSkillCount(prev => ({
      required: prev.required + skillCount.required,
      optional: prev.optional + skillCount.optional,
    }));
  }

  function incrementSelectedCount(optional: boolean = false): void {
    const skillType = optional ? 'optional' : 'required';

    return setSelectedSkillCount(prev => ({
      ...prev,
      [skillType]: prev[skillType] + 1,
    }));
  }

  function decrementSelectedCount(optional: boolean = false): void {
    const skillType = optional ? 'optional' : 'required';

    return setSelectedSkillCount(prev => ({
      ...prev,
      [skillType]: prev[skillType] - 1,
    }));
  }

  function resetSkills() {
    setSelectedSkillCount({
      required: 0,
      optional: 0,
    });

    setResetId(uuid());

    return;
  }

  return (
    <AppContext.Provider
      value={{
        skillCount,
        addToSkillCount,
        selectedSkillCount,
        incrementSelectedCount,
        decrementSelectedCount,
        resetId,
        resetSkills,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
