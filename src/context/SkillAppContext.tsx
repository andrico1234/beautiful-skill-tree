import * as React from 'react';

interface State {
  skillCount: number;
  selectedSkillCount: number;
}

export interface ISkillAppContext {
  skillCount: number;
  selectedSkillCount: number;
  incrementSelectedSkillCount: (number: number) => void;
  decrementSelectedSkillCount: VoidFunction;
  addToSkillCount: (number: number) => void;
  resetSkills: VoidFunction;
}

const SkillAppContext = React.createContext<ISkillAppContext>({
  skillCount: 0,
  selectedSkillCount: 0,
  incrementSelectedSkillCount: () => undefined,
  decrementSelectedSkillCount: () => undefined,
  addToSkillCount: () => undefined,
  resetSkills: () => undefined,
});

export class SkillProvider extends React.Component<{}, State> {
  state = {
    selectedSkillCount: 0,
    skillCount: 0,
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
    // return this.setState(prevState => {
    //   const { globalSkills } = prevState;
    //   let skillTrees: Dictionary<Skills> = {};
    //   Object.keys(globalSkills).map(key => {
    //     const resettedValues = mapValues(
    //       globalSkills[key],
    //       (): NodeState => LOCKED_STATE
    //     );
    //     skillTrees[key] = resettedValues;
    //   });
    //   return {
    //     globalSkills: skillTrees,
    //     selectedSkillCount: 0,
    //   };
    // });
  };

  render() {
    return (
      <SkillAppContext.Provider
        value={{
          addToSkillCount: this.addToSkillCount,
          skillCount: this.state.skillCount,
          incrementSelectedSkillCount: this.incrementSelectedSkillCount,
          decrementSelectedSkillCount: this.decrementSelectedSkillCount,
          selectedSkillCount: this.state.selectedSkillCount,
          resetSkills: this.resetSkills,
        }}
      >
        {this.props.children}
      </SkillAppContext.Provider>
    );
  }
}

export default SkillAppContext;
