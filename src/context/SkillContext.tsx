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
}

export interface ISkillContext {
  skills: Skills;
  updateSkillState: (key: string, updatedState: NodeState) => void;
}

interface Props {
  appId: string;
  storage: ContextStorage;
}

type Skills = Dictionary<NodeState>;

const SkillContext = React.createContext<ISkillContext>({
  skills: {},
  updateSkillState: () => undefined,
});

export class SkillProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      skills: JSON.parse(props.storage.getItem(`skills-${props.appId}`)!) || {},
    };
  }

  // give each skill tree it's own context that keeps track of its id. which is used to get the data. from the top level component.
  initialiseTree = () => {};

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
        }}
      >
        {this.props.children}
      </SkillContext.Provider>
    );
  }
}

export default SkillContext;
