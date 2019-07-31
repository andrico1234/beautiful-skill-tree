import { Action } from 'models';
import { initialState } from './AppContext';

type State = {
  selectedSkillCount: {
    required: number;
    optional: number;
  };
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SELECT_REQUIRED_SKILL':
      return {
        ...state,
        selectedSkillCount: {
          optional: state.selectedSkillCount.optional,
          required: state.selectedSkillCount.required + 1,
        },
      };
    case 'DESELECT_REQUIRED_SKILL':
      return {
        ...state,
        selectedSkillCount: {
          optional: state.selectedSkillCount.optional,
          required: state.selectedSkillCount.required - 1,
        },
      };
    case 'SELECT_OPTIONAL_SKILL':
      return {
        ...state,
        selectedSkillCount: {
          optional: state.selectedSkillCount.optional + 1,
          required: state.selectedSkillCount.required,
        },
      };
    case 'DESELECT_OPTIONAL_SKILL':
      return {
        ...state,
        selectedSkillCount: {
          optional: state.selectedSkillCount.optional - 1,
          required: state.selectedSkillCount.required,
        },
      };
    case 'RESET_SKILLS':
      return initialState;
    default:
      return state;
  }
}

export default reducer;
