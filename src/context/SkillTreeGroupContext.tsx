import * as React from 'react';

interface Props {
  children: React.ReactElement;
}

interface ISkillContext {
  totalCount: number;
  addToTotalCount: (number: number) => void;
}

const SkillTreeGroupContext = React.createContext<ISkillContext>({
  totalCount: 0,
  addToTotalCount: () => null,
});

interface State {
  totalCount: number;
}

export class SkillTreeGroupProvider extends React.Component<Props, State> {
  state = {
    totalCount: 0,
  };

  addToTotalCount = (number: number): void => {
    this.setState(({ totalCount }) => ({
      totalCount: totalCount + number,
    }));
  };

  render() {
    return (
      <SkillTreeGroupContext.Provider
        value={{
          totalCount: this.state.totalCount,
          addToTotalCount: this.addToTotalCount,
        }}
      >
        {this.props.children}
      </SkillTreeGroupContext.Provider>
    );
  }
}

export default SkillTreeGroupContext;
