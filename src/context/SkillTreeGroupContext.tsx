import * as React from 'react';

interface Props {
  children: React.ReactElement;
}

interface ISkillContext {
  skillCount: number;
  addToSkillCount: (number: number) => void;
}

const SkillTreeGroupContext = React.createContext<ISkillContext>({
  skillCount: 0,
  addToSkillCount: () => null,
});

interface State {
  skillCount: number;
}

export class SkillTreeGroupProvider extends React.Component<Props, State> {
  state = {
    skillCount: 0,
  };

  addToSkillCount = (number: number): void => {
    this.setState(({ skillCount }) => ({
      skillCount: skillCount + number,
    }));
  };

  render() {
    return (
      <SkillTreeGroupContext.Provider
        value={{
          skillCount: this.state.skillCount,
          addToSkillCount: this.addToSkillCount,
        }}
      >
        {this.props.children}
      </SkillTreeGroupContext.Provider>
    );
  }
}

export default SkillTreeGroupContext;
