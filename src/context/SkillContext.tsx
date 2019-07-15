import * as React from 'react';
import { ContextStorage, NodeState } from '../models';
import { Dictionary } from '../models/utils';

// const dummyState = {
//   ['tree-lpl']: {},
//   ['tree-lps']: {},
//   totalSkillCount: 0,
//   activeSkillCount: 0,
// };

interface State {
  skills: Skills;
  skillCount: number;
}

export interface ISkillContext {
  skills: Skills;
  skillCount: number;
  updateSkillState: (key: string, updatedState: NodeState) => void;
  addToSkillCount: (number: number) => void;
}

type Props = typeof SkillProvider.defaultProps & {
  appId: string;
};

type DefaultProps = {
  storage: ContextStorage;
};

type Skills = Dictionary<NodeState>;

const SkillContext = React.createContext<ISkillContext>({
  skills: {},
  skillCount: 0,
  updateSkillState: () => undefined,
  addToSkillCount: () => undefined,
});

export class SkillProvider extends React.Component<Props, State> {
  static defaultProps: DefaultProps = {
    storage: localStorage,
  };

  constructor(props: Props) {
    super(props);

    const storedSkills =
      JSON.parse(props.storage.getItem(`skills-${props.appId}`)!) || {};

    this.state = {
      skills: storedSkills,
      skillCount: 0,
    };
  }

  addToSkillCount = (number: number): void => {
    this.setState(({ skillCount }) => ({
      skillCount: skillCount + number,
    }));
  };

  initialiseTree = () => {
    // why did I add this stub here? is it releated to the commente dout data structure at the top? who knows!
  };

  clearSkillState = () => {
    /* dummyState = {
      iterate over the keys, go through each item in the state object that begins with 'tree'
      set each activeState to === the item's default value (locked or unlocked);
      set activeSkillCount to 0
      do I need to use a reducer for this?
      sounds like I have a bunch of actions, and some action creators. could that work in my favour?
    } */
  };

  getActiveSkills = () => {};

  updateSkillState = (key: string, updatedState: NodeState): void => {
    this.setState((prevState: State) => {
      const updatedSkills = {
        ...prevState.skills,
        [key]: updatedState,
      };

      this.props.storage.setItem(
        `skills-${this.props.appId}`,
        JSON.stringify(updatedSkills)
      );

      return {
        skills: updatedSkills,
      };
    });
  };

  render() {
    return (
      <SkillContext.Provider
        value={{
          skills: this.state.skills,
          updateSkillState: this.updateSkillState,
          addToSkillCount: this.addToSkillCount,
          skillCount: this.state.skillCount,
        }}
      >
        {this.props.children}
      </SkillContext.Provider>
    );
  }
}

export default SkillContext;
