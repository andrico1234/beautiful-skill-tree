import * as React from 'react';
import { ContextStorage, NodeState } from '../models';
import { Dictionary } from '../models/utils';
import { SELECTED_STATE } from '../components/constants';

type Props = typeof SkillProvider.defaultProps & {
  appId: string;
};

type DefaultProps = {
  storage: ContextStorage;
};

interface State {
  skills: Skills;
  skillCount: number;
  selectedSkillCount: number;
}

export interface ISkillContext {
  skills: Skills;
  skillCount: number;
  selectedSkillCount: number;
  updateSkillState: (key: string, updatedState: NodeState) => void;
  incrementSelectedSkillCount: () => void;
  decrementSelectedSkillCount: () => void;
  addToSkillCount: (number: number) => void;
}

type Skills = Dictionary<NodeState>;

const SkillContext = React.createContext<ISkillContext>({
  skills: {},
  skillCount: 0,
  selectedSkillCount: 0,
  updateSkillState: () => undefined,
  incrementSelectedSkillCount: () => undefined,
  decrementSelectedSkillCount: () => undefined,
  addToSkillCount: () => undefined,
});

export class SkillProvider extends React.Component<Props, State> {
  static defaultProps: DefaultProps = {
    storage: localStorage,
  };

  constructor(props: Props) {
    super(props);

    const storedSkills: Skills =
      JSON.parse(props.storage.getItem(`skills-${props.appId}`)!) || {};

    const selectedSkillCount = Object.keys(storedSkills).reduce((acc, i) => {
      if (storedSkills[i] === SELECTED_STATE) {
        return acc + 1;
      }

      return acc;
    }, 0);

    this.state = {
      selectedSkillCount,
      skills: storedSkills,
      skillCount: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.writeToStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.writeToStorage);
  }

  addToSkillCount = (number: number): void => {
    this.setState(({ skillCount }) => ({
      skillCount: skillCount + number,
    }));
  };

  incrementSelectedSkillCount = (): void => {
    return this.setState(({ selectedSkillCount }) => {
      return {
        selectedSkillCount: selectedSkillCount + 1,
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
    /* dummyState = {
      iterate over the keys, go through each item in the state object that begins with 'tree'
      set each activeState to === the item's default value (locked or unlocked);
      set activeSkillCount to 0
      do I need to use a reducer for this?
      sounds like I have a bunch of actions, and some action creators. could that work in my favour?
    } */
  };

  updateSkillState = (key: string, updatedState: NodeState): void => {
    this.setState((prevState: State) => {
      const updatedSkills = {
        ...prevState.skills,
        [key]: updatedState,
      };

      return {
        skills: updatedSkills,
      };
    });
  };

  writeToStorage = () => {
    this.props.storage.setItem(
      `skills-${this.props.appId}`,
      JSON.stringify(this.state.skills)
    );
  };

  render() {
    return (
      <SkillContext.Provider
        value={{
          skills: this.state.skills,
          updateSkillState: this.updateSkillState,
          addToSkillCount: this.addToSkillCount,
          skillCount: this.state.skillCount,
          incrementSelectedSkillCount: this.incrementSelectedSkillCount,
          decrementSelectedSkillCount: this.decrementSelectedSkillCount,
          selectedSkillCount: this.state.selectedSkillCount,
        }}
      >
        {this.props.children}
      </SkillContext.Provider>
    );
  }
}

export default SkillContext;
