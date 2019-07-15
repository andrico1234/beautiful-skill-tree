import * as React from 'react';
import classnames from 'classnames';
import { throttle, Cancelable, isEmpty } from 'lodash';
import Tippy from '@tippy.js/react';
import SkillContext from '../context/SkillContext';
import { LOCKED_STATE, UNLOCKED_STATE, SELECTED_STATE } from './constants';
import SkillTreeSegment from './SkillTreeSegment';
import TooltipContent from './ui/TooltipContent';
import { Skill, ParentPosition, NodeState } from '../models';
import { Dictionary } from '../models/utils';
import Node from './ui/Node';

interface Props {
  skill: Skill;
  parentNodeId?: string;
  parentState: NodeState;
  nodeState: NodeState;
  setNodeState: (state: NodeState) => void;
}

interface State {
  parentPosition: ParentPosition;
}

interface Context {
  skills: Dictionary<NodeState>;
  incrementSelectedSkillCount: VoidFunction;
  decrementSelectedSkillCount: VoidFunction;
}

class SkillNode extends React.Component<Props, State> {
  static contextType = SkillContext;
  private skillNodeRef: React.RefObject<HTMLDivElement>;
  private throttledResize: (() => void) & Cancelable;
  private childWidth: number = 0;

  constructor(props: Props, context: Context) {
    super(props);

    const { id } = props.skill;

    props.setNodeState(context.skills[id]);
    this.skillNodeRef = React.createRef();
    this.throttledResize = throttle(this.handleResize, 200);

    this.state = {
      parentPosition: {
        bottom: 0,
        center: 0,
      },
    };
  }

  calculateOverlayWidth = () => {
    this.childWidth = this.skillNodeRef.current!.clientWidth;
  };

  calculatePosition = () => {
    const {
      bottom,
      left,
      right,
    } = this.skillNodeRef.current!.getBoundingClientRect();

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    this.setState({
      parentPosition: {
        bottom: bottom + scrollY,
        center: (right - left) / 2 + left + scrollX,
      },
    });
  };

  handleResize = () => {
    this.calculatePosition();
    this.calculateOverlayWidth();
  };

  handleClick = () => {
    const { nodeState } = this.props;

    if (nodeState === LOCKED_STATE) {
      return null;
    }

    if (nodeState === UNLOCKED_STATE) {
      this.context.incrementSelectedSkillCount();
      return this.updateState(SELECTED_STATE);
    }

    this.context.decrementSelectedSkillCount();
    return this.updateState(UNLOCKED_STATE);
  };

  updateState = (state: NodeState) => {
    this.props.setNodeState(state);

    return this.context.updateSkillState(this.props.skill.id, state);
  };

  componentDidMount() {
    this.calculatePosition();
    this.calculateOverlayWidth();

    window.addEventListener('resize', this.throttledResize);

    if (isEmpty(this.context.skills)) {
      return this.updateState(UNLOCKED_STATE);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledResize);
  }

  componentDidUpdate() {
    const { parentNodeId, nodeState, parentState } = this.props;

    const parentNodeIsSelected =
      !parentNodeId || parentState === SELECTED_STATE;

    if (nodeState === SELECTED_STATE && !parentNodeIsSelected) {
      this.context.decrementSelectedSkillCount();
      return this.updateState(LOCKED_STATE);
    }

    if (!parentNodeIsSelected) {
      return null;
    }

    if (nodeState === LOCKED_STATE && parentNodeIsSelected) {
      return this.updateState(UNLOCKED_STATE);
    }
  }

  render() {
    const { parentPosition } = this.state;
    const { nodeState, skill } = this.props;
    const { children, title, tooltipDescription, id } = skill;

    return (
      <React.Fragment>
        <div className="SkillNode">
          <span
            data-testid="skill-node-overlay"
            style={{ width: this.childWidth + 4 }}
            className={classnames('SkillNode__overlay', {
              'SkillNode__overlay--selected': nodeState === SELECTED_STATE,
            })}
          />
          <Tippy
            className="Tooltip"
            placement="bottom"
            content={
              <TooltipContent
                tooltipDescription={tooltipDescription}
                title={title}
              />
            }
          >
            <Node
              handleClick={this.handleClick}
              id={id}
              currentState={nodeState}
              skill={this.props.skill}
              ref={this.skillNodeRef}
            />
          </Tippy>
        </div>
        {children.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {children.map(skill => {
              return (
                <SkillTreeSegment
                  key={skill.id}
                  parentPosition={parentPosition}
                  parentState={nodeState}
                  skill={skill}
                  parentNodeId={id}
                />
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SkillNode;
