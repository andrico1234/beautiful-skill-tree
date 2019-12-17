import { Nullable, Dictionary } from './utils';

export type Skill = MajorSkill | BaseSkill;

export type TooltipDirection = 'right' | 'left' | 'top' | 'bottom';

export type NodeState = 'locked' | 'unlocked' | 'selected';

export type SkillMap = Record<string, string>;

export interface SkillGroupData {
  skillCount: SkillCount;
  selectedSkillCount: SkillCount;
  resetSkills: VoidFunction;
  handleFilter: (query: string) => void;
}

export type SavedDataType = Dictionary<SkillData>;

export type SkillData = {
  optional: boolean;
  nodeState: NodeState;
};

export interface SkillCount {
  required: number;
  optional: number;
}

export interface Tooltip {
  content: React.ReactNode;
  direction?: TooltipDirection;
}

export type Action = {
  type: ActionType;
};

export type ActionType =
  | 'SELECT_REQUIRED_SKILL'
  | 'DESELECT_REQUIRED_SKILL'
  | 'SELECT_OPTIONAL_SKILL'
  | 'DESELECT_OPTIONAL_SKILL'
  | 'RESET_SKILLS';

interface BaseSkill {
  id: string;
  optional?: boolean;
  color?: 'default' | 'alternative';
  title: JSX.Element | string;
  tooltip: Tooltip;
  children: Skill[];
}

interface MajorSkill extends BaseSkill {
  icon: string;
}

export type Direction = 'left' | 'right';

export interface ContextStorage {
  getItem: (key: string) => Nullable<string>;
  setItem: (key: string, value: string) => void;
}
