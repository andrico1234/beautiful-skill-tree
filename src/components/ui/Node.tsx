import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { SELECTED_STATE, UNLOCKED_STATE, LOCKED_STATE } from '../constants';
import { Skill } from '../../models';
import Icon from './Icon';

interface Props {
  handleClick: VoidFunction;
  id: string;
  currentState: string;
  skill: Skill;
}

interface StyledNodeProps {
  selected: boolean;
  unlocked: boolean;
  locked: boolean;
}

const Node = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLDivElement>) => {
    const { handleClick, id, currentState, skill } = props;

    return (
      <StyledNode
        onClick={handleClick}
        ref={ref}
        data-testid={id}
        selected={currentState === SELECTED_STATE}
        unlocked={currentState === UNLOCKED_STATE}
        locked={currentState === LOCKED_STATE}
      >
        {'icon' in skill ? (
          <IconNode>
            <Icon title="node-icon" src={skill.icon} containerWidth={64} />
          </IconNode>
        ) : (
          <TextNode>
            <Text>{skill.title}</Text>
          </TextNode>
        )}
      </StyledNode>
    );
  }
);

export default Node;

const shadowburst = keyframes`
  from {
    box-shadow: 0 0 18px 0 rgba(255, 255, 255, 1);
  }

  20% {
    box-shadow: 0 0 24px 0 rgba(255, 255, 255, 1);
  }

  to {
    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0);
  }
`;

const shadowpulse = keyframes`
  from,
  20% {
    box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.5);
  }

  to {
    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0.5);
  }
`;

const StyledNode = styled.div<StyledNodeProps>`
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

  ${props =>
    props.selected &&
    css`
      animation: ${shadowburst} 1s 1;
      background: linear-gradient(
        to right,
        #d0e6a5 0%,
        #86e3ce 50%,
        #ccabd8 100%
      );
    `}

  ${props =>
    props.unlocked &&
    css`
      animation: ${shadowpulse} 1s infinite alternate;
      box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.5);

      &:after,
      &:before {
        border: 0 solid;
        border-image-source: linear-gradient(
          to right,
          #d0e6a5 0%,
          #86e3ce 50%,
          #ccabd8 100%
        );
        border-image-slice: 1;
        content: ' ';
        opacity: 0;
        height: 0;
        transition: opacity 0.6s, width 0.6s, height 0.6s;
        position: absolute;
        width: 0;
      }

      &:after {
        border-top: 4px solid;
        border-left: 4px solid;
        top: 0;
        left: 0;
      }

      &:before {
        bottom: 0px;
        right: 0px;
        border-bottom: 4px solid;
        border-right: 4px solid;
      }
      &:hover {
        animation: none;
        box-shadow: 0 0 12px 0 rgba(255, 255, 255, 1);

        &:after,
        &:before {
          opacity: 1;
          height: 85%;
          width: 95%;
          transition: width 0.6s, height 0.6s;
        }
      }
    `}
  ${props =>
    props.locked &&
    `
        cursor: initial;
        opacity: 0.65;
    `}
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
