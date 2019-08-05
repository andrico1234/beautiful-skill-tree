import * as React from 'react';
import { mapValues } from 'lodash';
import {
  NodeState,
  ContextStorage,
  Action,
  SavedDataType,
  SkillData,
} from '../models';
import AppContext, { IAppContext } from './AppContext';
import { SELECTED_STATE, LOCKED_STATE } from '../components/constants';

type Props = typeof SkillTreeProvider.defaultProps & {
  treeId: string;
  savedData?: SavedDataType;
};

type DefaultProps = {
  storage: ContextStorage;
  handleSave: (
    storage: ContextStorage,
    id: string,
    skills: SavedDataType
  ) => void;
};

interface State {
  skills: SavedDataType;
  resetId: string;
}

export interface ISkillContext {
  skills: SavedDataType;
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
    handleSave(storage, treeId, skills) {
      return storage.setItem(`skills-${treeId}`, JSON.stringify(skills));
    },
  };

  constructor(props: Props, context: IAppContext) {
    super(props, context);

    const treeSkills = this.getTreeSkills();

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

  getTreeSkills = (): SavedDataType => {
    if (this.props.savedData) {
      return this.props.savedData;
    }

    const { storage, treeId } = this.props;

    const storedItems = storage.getItem(`skills-${treeId}`);

    if (storedItems === 'undefined' || storedItems === null) {
      return {};
    }

    return JSON.parse(storedItems);
  };

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

      const resettedSkills: SavedDataType = mapValues(
        skills,
        (skill: SkillData) => ({
          optional: skill.optional,
          nodeState: LOCKED_STATE,
        })
      );

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
    const { handleSave, storage, treeId } = this.props;

    return this.setState(prevState => {
      const updatedSkills = {
        ...prevState.skills,
        [key]: {
          optional,
          nodeState: updatedState,
        },
      };

      handleSave(storage, treeId, updatedSkills);

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
