import * as React from 'react';
import { mapValues } from 'lodash';
import { NodeState, ContextStorage, Action } from '../models';
import { Dictionary } from '../models/utils';
import AppContext, { IAppContext } from './AppContext';
import { SELECTED_STATE, LOCKED_STATE } from '../components/constants';

type Props = typeof SkillTreeProvider.defaultProps & {
  treeId: string;
};

type DefaultProps = {
  storage: ContextStorage;
};

type Skills = Dictionary<SkillData>;

type SkillData = {
  optional: boolean;
  nodeState: NodeState;
};

interface State {
  skills: Skills;
  resetId: string;
}

export interface ISkillContext {
  skills: Skills;
  updateSkillState: (
    key: string,
    updatedState: NodeState,
    optional?: boolean
  ) => void;
  incrementSelectedCount: VoidFunction;
  decrementSelectedCount: VoidFunction;
}

const SkillContext = React.createContext<ISkillContext>({
  skills: {},
  updateSkillState: () => undefined,
  incrementSelectedCount: () => undefined,
  decrementSelectedCount: () => undefined,
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

    Object.keys(treeSkills).map(key => {
      if (treeSkills[key].nodeState === SELECTED_STATE) {
        const action: Action = {
          type: treeSkills[key].optional
            ? 'SELECT_OPTIONAL_SKILL'
            : 'SELECT_REQUIRED_SKILL',
        };

        context.dispatch(action);
      }
    });

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

  incrementSelectedCount = (optional: boolean = false) => {
    const action: Action = {
      type: optional ? 'SELECT_OPTIONAL_SKILL' : 'SELECT_REQUIRED_SKILL',
    };

    this.context.dispatch(action);
  };

  decrementSelectedCount = (optional: boolean = false) => {
    const action: Action = {
      type: optional ? 'DESELECT_OPTIONAL_SKILL' : 'DESELECT_REQUIRED_SKILL',
    };

    this.context.dispatch(action);
  };

  resetSkills = () => {
    return this.setState(prevState => {
      const { skills } = prevState;

      const resettedSkills: Skills = mapValues(skills, (skill: SkillData) => ({
        optional: skill.optional,
        nodeState: LOCKED_STATE,
      }));

      return {
        skills: resettedSkills,
        resetId: this.context.resetId,
      };
    });
  };

  updateSkillState = (
    key: string,
    updatedState: NodeState,
    optional: boolean = false
  ) => {
    return this.setState(prevState => {
      const updatedSkills = {
        ...prevState.skills,
        [key]: {
          optional,
          nodeState: updatedState,
        },
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
          incrementSelectedCount: this.incrementSelectedCount,
          decrementSelectedCount: this.decrementSelectedCount,
        }}
      >
        {this.props.children}
      </SkillContext.Provider>
    );
  }
}

export default SkillContext;
