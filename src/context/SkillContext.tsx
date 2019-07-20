import * as React from 'react';
import { mapValues } from 'lodash';
import { NodeState, ContextStorage } from '../models';
import { Dictionary } from '../models/utils';
import AppContext, { IAppContext } from './AppContext';
import { SELECTED_STATE, LOCKED_STATE } from '../components/constants';

type Props = typeof SkillTreeProvider.defaultProps & {
  treeId: string;
};

type DefaultProps = {
  storage: ContextStorage;
};

type Skills = Dictionary<NodeState>;

interface State {
  skills: Skills;
  resetId: string;
}

export interface ISkillContext {
  skills: Skills;
  updateSkillState: (key: string, updatedState: NodeState) => void;
  incrementSelectedSkillCount: VoidFunction;
  decrementSelectedSkillCount: VoidFunction;
}

const SkillContext = React.createContext<ISkillContext>({
  skills: {},
  updateSkillState: () => undefined,
  incrementSelectedSkillCount: () => undefined,
  decrementSelectedSkillCount: () => undefined,
});

export class SkillTreeProvider extends React.Component<Props, State> {
  static contextType = AppContext;
  static defaultProps: DefaultProps = {
    storage: localStorage,
  };

  constructor(props: Props, context: IAppContext) {
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
      resetId: context.resetId,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.writeToStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.writeToStorage);
  }

  componentDidUpdate() {
    if (this.context.resetId !== this.state.resetId) {
      this.resetSkills();
    }
  }

  resetSkills = () => {
    return this.setState(prevState => {
      const { skills } = prevState;

      const resettedSkills = mapValues(skills, (): NodeState => LOCKED_STATE);

      return {
        skills: resettedSkills,
        resetId: this.context.resetId,
      };
    });
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
      <SkillContext.Provider
        value={{
          skills: this.state.skills,
          updateSkillState: this.updateSkillState,
          incrementSelectedSkillCount: this.context.incrementSelectedSkillCount,
          decrementSelectedSkillCount: this.context.decrementSelectedSkillCount,
        }}
      >
        {this.props.children}
      </SkillContext.Provider>
    );
  }
}

export default SkillContext;
