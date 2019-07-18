import * as React from 'react';
import uuid from 'uuid';

interface State {
  resetId: string;
  skillCount: number;
  selectedSkillCount: number;
}

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

export class SkillProvider extends React.Component<{}, State> {
  state = {
    resetId: '',
    skillCount: 0,
    selectedSkillCount: 0,
  };

  // refactor the increment items to use just one method.
  addToSkillCount = (number: number): void => {
    this.setState(({ skillCount }) => ({
      skillCount: skillCount + number,
    }));
  };

  incrementSelectedSkillCount = (number: number = 1): void => {
    return this.setState(({ selectedSkillCount }) => {
      return {
        selectedSkillCount: selectedSkillCount + number,
      };
    });
  };

  decrementSelectedSkillCount = (): void => {
    return this.setState(({ selectedSkillCount }) => {
      return {
        selectedSkillCount: selectedSkillCount - 1,
      };
    });
  };

  resetSkills = () => {
    this.setState({
      resetId: uuid(),
      selectedSkillCount: 0,
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          addToSkillCount: this.addToSkillCount,
          skillCount: this.state.skillCount,
          incrementSelectedSkillCount: this.incrementSelectedSkillCount,
          decrementSelectedSkillCount: this.decrementSelectedSkillCount,
          selectedSkillCount: this.state.selectedSkillCount,
          resetSkills: this.resetSkills,
          resetId: this.state.resetId,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
