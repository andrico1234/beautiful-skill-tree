import React from 'react';
import classnames from 'classnames';
import { SELECTED_STATE, UNLOCKED_STATE, LOCKED_STATE } from '../constants';
import { Skill } from '../../models';
import Icon from './Icon';

interface Props {
  handleClick: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  id: string;
  currentState: string;
  skill: Skill;
}

const Node = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const {
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      id,
      currentState,
      skill,
    } = props;

    return (
      <div
        onClick={handleClick}
        ref={ref}
        data-testid={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classnames('Node', {
          'Node--selected': currentState === SELECTED_STATE,
          'Node--unlocked': currentState === UNLOCKED_STATE,
          'Node--locked': currentState === LOCKED_STATE,
        })}
      >
        {'icon' in skill ? (
          <div className="Node__icon-node">
            <Icon title="node-icon" src={skill.icon} containerWidth={64} />
          </div>
        ) : (
          <div className="Node__text-node">
            <p className="Node__text">{skill.title}</p>
          </div>
        )}
      </div>
    );
  }
);

export default Node;
