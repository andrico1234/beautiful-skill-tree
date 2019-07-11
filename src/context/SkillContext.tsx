import * as React from 'react';
import { ContextStorage } from '../models';
import { Dictionary } from '../models/utils';

interface State {
  skills: Skills;
}

export interface ISkillContext {
  skills: Skills;
  updateSkillState: (key: string, updatedState: string) => void;
  contextId: string;
}

interface Props {
  contextId: string;
  storage: ContextStorage;
}

type Skills = Dictionary<string>;

const SkillContext = React.createContext<ISkillContext>({
  skills: {},
  updateSkillState: () => undefined,
  contextId: '',
});

export class SkillProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      skills:
        JSON.parse(props.storage.getItem(`skills-${props.contextId}`)!) || {},
    };
  }

  updateSkillState = (key: string, updatedState: string): void => {
    this.setState((prevState: State) => {
      const updatedSkills = {
        ...prevState.skills,
        [key]: updatedState,
      };

      this.props.storage.setItem(
        `skills-${this.props.contextId}`,
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
          contextId: this.props.contextId,
        }}
      >
        {this.props.children}
      </SkillContext.Provider>
    );
  }
}

export default SkillContext;
