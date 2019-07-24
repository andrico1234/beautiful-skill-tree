import { Nullable } from './utils';

export type Skill = MajorSkill | MinorSkill;

export type TooltipDirection = 'right' | 'left' | 'top' | 'bottom';

export type NodeState = 'locked' | 'unlocked' | 'selected';

export interface Tooltip {
  description: string;
  direction?: TooltipDirection;
  visible?: boolean;
}

export type MajorSkill = {
  id: string;
  icon: string;
  title: string;
  tooltip: Tooltip;
  children: Skill[];
};

export type MinorSkill = {
  id: string;
  title: string;
  tooltip: Tooltip;
  children: Skill[];
};

export type ParentPosition = {
  bottom: number;
  center: number;
};

export type ChildPosition = {
  center: number;
};

export interface ContextStorage {
  getItem: (key: string) => Nullable<string>;
  setItem: (key: string, value: string) => void;
}
