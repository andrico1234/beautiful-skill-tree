import React from 'react';
import { isEmpty } from 'lodash';
import { NodeState, ContextStorage } from '../models';
import { Dictionary } from '../models/utils';
import SkillAppContext, {
  SkillProvider,
  ISkillAppContext,
} from './SkillAppContext';
import { SELECTED_STATE } from '../components/constants';

type Props = typeof SkillProvider.defaultProps & {
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

    const allStoredSkills: Dictionary<Skills> =
      JSON.parse(props.storage.getItem(`skills-${context.appId}`)!) || {};

    if (isEmpty(allStoredSkills)) {
    }

    const treeSkills = allStoredSkills[props.treeId] || {};
    const selectedSkillCount = Object.keys(treeSkills).reduce((acc, i) => {
      if (treeSkills[i] === SELECTED_STATE) {
        return acc + 1;
      }

      return acc;
    }, 0);

    context.addToSelectedSkillCount(selectedSkillCount);

    this.state = {
      skills: treeSkills,
    };
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

      this.context.updateSkillState(this.props.treeId, updatedSkills);

      return {
        skills: updatedSkills,
      };
    });
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
