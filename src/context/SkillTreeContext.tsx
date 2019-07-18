import React from 'react';
import { NodeState, ContextStorage } from '../models';
import { Dictionary } from '../models/utils';
import SkillAppContext, { ISkillAppContext } from './SkillAppContext';
import { SELECTED_STATE } from '../components/constants';

type Props = typeof SkillTreeProvider.defaultProps & {
  treeId: string;
};

type DefaultProps = {
  storage: ContextStorage;
};

type Skills = Dictionary<NodeState>;

interface State {
  skills: Skills;
}

export interface ISkillTreeContext {
  skills: Skills;
  updateSkillState: (key: string, updatedState: NodeState) => void;
  incrementSelectedSkillCount: VoidFunction;
  decrementSelectedSkillCount: VoidFunction;
  addToSkillCount: (count: number) => void;
}

const SkillTreeContext = React.createContext<ISkillTreeContext>({
  skills: {},
  updateSkillState: () => undefined,
  incrementSelectedSkillCount: () => undefined,
  decrementSelectedSkillCount: () => undefined,
  addToSkillCount: () => undefined,
});

export class SkillTreeProvider extends React.Component<Props, State> {
  static contextType = SkillAppContext;
  static defaultProps: DefaultProps = {
    storage: localStorage,
  };

  constructor(props: Props, context: ISkillAppContext) {
    super(props, context);

    const treeSkills: Skills =
      JSON.parse(props.storage.getItem(`skills-${props.treeId}`)!) || {};

    const selectedSkillCount = Object.keys(treeSkills).reduce((acc, i) => {
      if (treeSkills[i] === SELECTED_STATE) {
        return acc + 1;
      }

      return acc;
    }, 0);

    context.incrementSelectedSkillCount(selectedSkillCount);

    this.state = {
      skills: treeSkills,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.writeToStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.writeToStorage);
  }

  addToSkillCount = (count: number) => {
    return this.context.addToSkillCount(count);
  };

  updateSkillState = (key: string, updatedState: NodeState) => {
    return this.setState(prevState => {
      const updatedSkills = {
        ...prevState.skills,
        [key]: updatedState,
      };

      return {
        skills: updatedSkills,
      };
    });
  };

  private writeToStorage = () => {
    this.props.storage.setItem(
      `skills-${this.props.treeId}`,
      JSON.stringify(this.state.skills)
    );
  };

  render() {
    return (
      <SkillTreeContext.Provider
        value={{
          skills: this.state.skills,
          updateSkillState: this.updateSkillState,
          incrementSelectedSkillCount: this.context.incrementSelectedSkillCount,
          decrementSelectedSkillCount: this.context.decrementSelectedSkillCount,
          addToSkillCount: this.addToSkillCount,
        }}
      >
        {this.props.children}
      </SkillTreeContext.Provider>
    );
  }
}

export default SkillTreeContext;
