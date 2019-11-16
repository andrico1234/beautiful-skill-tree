import * as React from 'react';
import uuid from 'uuid';
import { SkillCount, Action } from '../models';
import reducer from './appContextReducer';

type Props = {
  children: React.ReactNode;
};

export interface IAppContext {
  skillCount: SkillCount;
  addToSkillCount: (skilCount: SkillCount) => void;
  selectedSkillCount: SkillCount;
  dispatch: React.Dispatch<Action>;
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
  dispatch: () => '',
  resetId: '',
  resetSkills: () => undefined,
});

export const initialState = {
  selectedSkillCount: {
    required: 0,
    optional: 0,
  },
};

export function AppProvider({ children }: Props) {
  const [resetId, setResetId] = React.useState('');
  const [skillCount, setSkillCount] = React.useState({
    required: 0,
    optional: 0,
  });

  const [state, dispatch] = React.useReducer(reducer, initialState);

  function addToSkillCount(skillCount: SkillCount): void {
    return setSkillCount(prev => ({
      required: prev.required + skillCount.required,
      optional: prev.optional + skillCount.optional,
    }));
  }

  function resetSkills() {
    const action: Action = {
      type: 'RESET_SKILLS',
    };

    dispatch(action);
    setResetId(uuid());

    return;
  }

  return (
    <AppContext.Provider
      value={{
        skillCount,
        dispatch,
        addToSkillCount,
        selectedSkillCount: state.selectedSkillCount,
        resetId,
        resetSkills,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
