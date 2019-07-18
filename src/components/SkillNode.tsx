import * as React from 'react';
import classnames from 'classnames';
import { throttle, Cancelable } from 'lodash';
import Tippy from '@tippy.js/react';
import SkillContext from '../context/SkillContext';
import { LOCKED_STATE, UNLOCKED_STATE, SELECTED_STATE } from './constants';
import SkillTreeSegment from './SkillTreeSegment';
import TooltipContent from './ui/TooltipContent';
import { Skill, ParentPosition, NodeState } from '../models';
import Node from './ui/Node';

interface Props {
  skill: Skill;
  nodeState: NodeState;
}

interface State {
  parentPosition: ParentPosition;
  isMobile: boolean;
}

class SkillNode extends React.Component<Props, State> {
  static contextType = SkillContext;
  private skillNodeRef: React.RefObject<HTMLDivElement>;
  private throttledResize: VoidFunction & Cancelable;
  private childWidth: number = 0;

  constructor(props: Props) {
    super(props);

    this.skillNodeRef = React.createRef();
    this.throttledResize = throttle(this.handleResize, 200);

    this.state = {
      isMobile: window.innerWidth < 900,
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

    this.setState(() => ({
      isMobile: window.innerWidth < 900,
    }));
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
    return this.context.updateSkillState(this.props.skill.id, state);
  };

  componentDidMount() {
    this.calculatePosition();
    this.calculateOverlayWidth();

    window.addEventListener('resize', this.throttledResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledResize);
  }

  render() {
    const { parentPosition, isMobile } = this.state;
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
            placement={isMobile ? 'top' : 'bottom'}
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
