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
  storage?: ContextStorage;
};

type DefaultProps = {
  handleSave: (
    storage: ContextStorage,
    id: string,
    skills: SavedDataType
  ) => void;
};

interface State {
  skills: SavedDataType;
  skillCount: number;
  resetId: string;
  mounting: boolean;
}

export interface ISkillContext {
  mounting: boolean;
  skills: SavedDataType;
  skillCount: number;
  updateSkillState: (
    key: string,
    updatedState: NodeState,
    optional?: boolean
  ) => void;
  setSkillCount: (skillCount: number) => void;
  incrementSelectedCount: VoidFunction;
  decrementSelectedCount: VoidFunction;
}

const SkillContext = React.createContext<ISkillContext>({
  mounting: true,
  skills: {},
  skillCount: 0,
  updateSkillState: () => undefined,
  setSkillCount: () => undefined,
  incrementSelectedCount: () => undefined,
  decrementSelectedCount: () => undefined,
});

export class SkillTreeProvider extends React.Component<Props, State> {
  static contextType = AppContext;
  static defaultProps: DefaultProps = {
    handleSave(storage, treeId, skills) {
      return storage.setItem(`skills-${treeId}`, JSON.stringify(skills));
    },
  };

  storage: ContextStorage | null = null;

  constructor(props: Props, context: IAppContext) {
    super(props, context);

    this.state = {
      skills: {},
      skillCount: 0,
      resetId: context.resetId,
      mounting: true,
    };
  }

  componentDidMount() {
    const { storage } = this.props;
    const { context } = this;

    if (storage) {
      this.storage = storage;
    } else {
      this.storage = localStorage;
    }

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

    this.setState({
      skills: treeSkills,
      mounting: false,
    });

    return null;
  }

  getTreeSkills = (): SavedDataType => {
    if (this.props.savedData) {
      return this.props.savedData;
    }

    const { treeId } = this.props;

    const storedItems = this.storage!.getItem(`skills-${treeId}`);

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

  setSkillCount = (skillCount: number) => {
    return this.setState({
      skillCount,
    });
  };

  updateSkillState = (
    key: string,
    updatedState: NodeState,
    optional: boolean = false
  ) => {
    const { handleSave, treeId } = this.props;

    return this.setState(prevState => {
      const updatedSkills = {
        ...prevState.skills,
        [key]: {
          optional,
          nodeState: updatedState,
        },
      };

      handleSave(this.storage!, treeId, updatedSkills);

      return {
        skills: updatedSkills,
      };
    });
  };

  render() {
    return (
      <SkillContext.Provider
        value={{
          mounting: this.state.mounting,
          skills: this.state.skills,
          skillCount: this.state.skillCount,
          updateSkillState: this.updateSkillState,
          setSkillCount: this.setSkillCount,
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
