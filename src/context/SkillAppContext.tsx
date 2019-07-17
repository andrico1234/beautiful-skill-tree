import * as React from 'react';
import { ContextStorage, NodeState } from '../models';
import { Dictionary } from '../models/utils';
// import { SELECTED_STATE } from '../components/constants';

type Props = typeof SkillProvider.defaultProps & {
  appId: string;
};

type DefaultProps = {
  storage: ContextStorage;
};

type Skills = Dictionary<NodeState>;

interface State {
  globalSkills: Dictionary<Skills>;
  skillCount: number;
  selectedSkillCount: number;
}

export interface ISkillAppContext {
  appId: string;
  skillCount: number;
  selectedSkillCount: number;
  updateSkillState: (treeId: string, updatedState: Skills) => void;
  incrementSelectedSkillCount: VoidFunction;
  decrementSelectedSkillCount: VoidFunction;
  addToSkillCount: (number: number) => void;
  addToSelectedSkillCount: (number: number) => void;
  resetSkills: VoidFunction;
}

const SkillAppContext = React.createContext<ISkillAppContext>({
  appId: '',
  skillCount: 0,
  selectedSkillCount: 0,
  updateSkillState: () => undefined,
  incrementSelectedSkillCount: () => undefined,
  decrementSelectedSkillCount: () => undefined,
  addToSkillCount: () => undefined,
  addToSelectedSkillCount: () => undefined,
  resetSkills: () => undefined,
});

export class SkillProvider extends React.Component<Props, State> {
  static defaultProps: DefaultProps = {
    storage: localStorage,
  };

  constructor(props: Props) {
    super(props);

    const storedSkills: Dictionary<Skills> =
      JSON.parse(props.storage.getItem(`skills-${props.appId}`)!) || {};

    this.state = {
      selectedSkillCount: 0,
      globalSkills: storedSkills,
      skillCount: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.writeToStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.writeToStorage);
  }

  // refactor the increment items to use just one method.
  addToSkillCount = (number: number): void => {
    this.setState(({ skillCount }) => ({
      skillCount: skillCount + number,
    }));
  };

  addToSelectedSkillCount = (number: number): void => {
    this.setState(({ selectedSkillCount }) => ({
      selectedSkillCount: selectedSkillCount + number,
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
    // return this.setState(prevState => {
    //   const { globalSkills } = prevState;
    //   let resettedSkills = { ...globalSkills };
    //   const skillKeys = Object.keys(resettedSkills);
    //   skillKeys.map(key => {
    //     resettedSkills[key] = 'locked';
    //   });
    //   return {
    //     skills: resettedSkills,
    //     selectedSkillCount: 0,
    //   };
    // });
  };

  updateSkillState = (treeId: string, updatedState: Skills): void => {
    this.setState((prevState: State) => {
      const updatedSkills = {
        ...prevState.globalSkills,
        [treeId]: updatedState,
      };

      return {
        globalSkills: updatedSkills,
      };
    });
  };

  writeToStorage = () => {
    this.props.storage.setItem(
      `skills-${this.props.appId}`,
      JSON.stringify(this.state.globalSkills)
    );
  };

  render() {
    return (
      <SkillAppContext.Provider
        value={{
          appId: this.props.appId,
          updateSkillState: this.updateSkillState,
          addToSkillCount: this.addToSkillCount,
          addToSelectedSkillCount: this.addToSelectedSkillCount,
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
