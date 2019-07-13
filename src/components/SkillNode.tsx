import * as React from 'react';
import classnames from 'classnames';
import { throttle, Cancelable, isEmpty } from 'lodash';
import Tippy from '@tippy.js/react';
import SkillContext from '../context/SkillContext';
import { LOCKED_STATE, UNLOCKED_STATE, SELECTED_STATE } from './constants';
import SkillTreeSegment from './SkillTreeSegment';
import TooltipContent from './ui/TooltipContent';
import { Skill, ParentPosition } from '../models';
import { Dictionary } from '../models/utils';
import Node from './ui/Node';

interface Props {
  skill: Skill;
  parentNodeId?: string;
}

interface State {
  currentState: string;
  parentPosition: ParentPosition;
}

interface Context {
  skills: Dictionary<string>;
}

class SkillNode extends React.Component<Props, State> {
  static contextType = SkillContext;
  private skillNodeRef: React.RefObject<HTMLDivElement>;
  private throttledResize: (() => void) & Cancelable;
  private childWidth: number = 0;

  constructor(props: Props, context: Context) {
    super(props);

    const { id } = props.skill;

    const skillState = context.skills[id];
    this.skillNodeRef = React.createRef();
    this.throttledResize = throttle(this.handleResize, 200);

    this.state = {
      currentState: skillState,
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
    const { currentState } = this.state;

    if (currentState === LOCKED_STATE) {
      return null;
    }

    if (currentState === UNLOCKED_STATE) {
      return this.updateState(SELECTED_STATE);
    }

    return this.updateState(UNLOCKED_STATE);
  };

  updateState = (state: string) => {
    this.setState({
      currentState: state,
    });

    return this.context.updateSkillState(this.props.skill.id, state);
  };

  componentDidMount() {
    this.calculatePosition();
    this.calculateOverlayWidth();

    window.addEventListener('resize', this.throttledResize);

    if (isEmpty(this.context.skills)) {
      if (this.props.parentNodeId) {
        return this.updateState(LOCKED_STATE);
      }

      return this.updateState(UNLOCKED_STATE);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledResize);
  }

  componentDidUpdate() {
    const { currentState } = this.state;
    const { parentNodeId } = this.props;

    const parentNodeIsSelected =
      !parentNodeId || this.context.skills[parentNodeId] === SELECTED_STATE;

    if (currentState === UNLOCKED_STATE && !parentNodeIsSelected) {
      return this.updateState(LOCKED_STATE);
    }

    if (!parentNodeIsSelected) {
      return null;
    }

    if (currentState === LOCKED_STATE && parentNodeIsSelected) {
      return this.updateState(UNLOCKED_STATE);
    }
  }

  render() {
    const { currentState, parentPosition } = this.state;
    const { children, title, tooltipDescription, id } = this.props.skill;

    return (
      <React.Fragment>
        <div className="SkillNode">
          <span
            style={{ width: this.childWidth + 4 }}
            className={classnames('SkillNode__overlay', {
              'SkillNode__overlay--selected': currentState === SELECTED_STATE,
            })}
          />
          <Tippy
            className="Tooltip"
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
              currentState={currentState}
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
