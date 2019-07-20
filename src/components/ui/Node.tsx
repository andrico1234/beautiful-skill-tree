import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { SELECTED_STATE, UNLOCKED_STATE, LOCKED_STATE } from '../constants';
import { Skill } from '../../models';
import Icon from './Icon';

interface Props {
  handleClick: VoidFunction;
  id: string;
  currentState: string;
  skill: Skill;
}

const Node = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const { handleClick, id, currentState, skill } = props;

    return (
      <StyledNode
        onClick={handleClick}
        ref={ref}
        data-testid={id}
        className={classnames({
          'Node--selected': currentState === SELECTED_STATE,
          'Node--unlocked': currentState === UNLOCKED_STATE,
          'Node--locked': currentState === LOCKED_STATE,
        })}
      >
        {'icon' in skill ? (
          <IconNode>
            <Icon title="node-icon" src={skill.icon} containerWidth={64} />
          </IconNode>
        ) : (
          <TextNode>
            <Text className="Node__text">{skill.title}</Text>
          </TextNode>
        )}
      </StyledNode>
    );
  }
);

export default Node;

const StyledNode = styled.div`
  background: #282c34;
  border: 2px solid white;
  box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  margin: 0 8px;
  outline: none;
  position: relative;
  transition: box-shadow 0.6s, opacity 1s;
  user-select: none;

  @media (min-width: 900px) {
    margin: 0 16px;
    outline: initial;
    outline-color: white;
  }
`;

const IconNode = styled.div`
  width: 64px;
`;

const TextNode = styled.div`
  align-items: center;
  display: flex;
  font-weight: 600;
  justify-content: center;
  height: 32px;
  width: 108px;

  @media (min-width: 900px) {
    height: 28px;
    width: 144px;
  }
`;

const Text = styled.p`
  font-size: 14px;
  text-overflow: ellipsis;
  margin: 0;
  overflow: hidden;
  padding: 0 8px;
  white-space: nowrap;

  @media (min-width: 900px) {
    font-size: 16px;
  }
`;
