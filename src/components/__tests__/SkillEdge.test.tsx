import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SkillEdge from '../SkillEdge';
import SkillContext, { SkillProvider } from '../../context/SkillContext';
import MockLocalStorage from '../__mocks__/mockLocalStorage';
import uuid4 from 'uuid/v4';

interface Props {
  startingState: string;
  startingId: string;
}

interface Context {
  updateSkillState: (startingId: string, startingState: string) => void;
}

class ContextSetter extends React.Component<Props> {
  static contextType = SkillContext;

  constructor(props: Props, context: Context) {
    super(props);

    context.updateSkillState(props.startingId, props.startingState);
  }

  render() {
    return null;
  }
}

const defaultPosition = {
  topX: 0,
  topY: 0,
  bottomX: 0,
  bottomY: 0,
};

function renderComponent(
  nextNodeId: string,
  startingState: string,
  position = defaultPosition
) {
  let updateState: Function | void;

  const id = uuid4();

  const defaultStoreContents = {
    [`skills-${id}`]: JSON.stringify({}),
  };

  const store = new MockLocalStorage(defaultStoreContents);

  const api = render(
    <SkillProvider contextId={id} storage={store}>
      <ContextSetter startingState={startingState} startingId={nextNodeId} />
      <SkillEdge position={position} nextNodeId={nextNodeId} />
    </SkillProvider>
  );

  return {
    ...api,
    updateState() {
      return updateState;
    },
  };
}

describe('SkillEdge', () => {
  afterEach(cleanup);

  describe('straight lines', () => {
    it('should be inactive if the next node is unlocked', async () => {
      const startingId = '123';
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(startingId, startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).not.toHaveClass('SkillEdge--active');
    });

    it('should be inactive if the next node is locked', () => {
      const startingId = '123';
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(startingId, startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).not.toHaveClass('SkillEdge--active');
    });

    it('should be active if the next node is selected', () => {
      const startingId = '123';
      const startingState = 'selected';

      const { getByTestId } = renderComponent(startingId, startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).toHaveClass('SkillEdge SkillEdge--active');
    });
  });

  describe('angled lines', () => {
    const leftAngledLinePosition = {
      topX: 100,
      topY: 100,
      bottomX: 50,
      bottomY: 150,
    };

    const rightAngledLinePosition = {
      topX: 100,
      topY: 100,
      bottomX: 150,
      bottomY: 150,
    };

    it('should be inactive if the next node is unlocked', async () => {
      const startingId = '123';
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(
        startingId,
        startingState,
        leftAngledLinePosition
      );

      const skillEdgeOne = getByTestId('angled-line-one');
      const skillEdgeTwo = getByTestId('angled-line-two');
      const skillEdgeThree = getByTestId('angled-line-three');

      expect(skillEdgeOne).not.toHaveClass('AngledLine__line-one--active');
      expect(skillEdgeTwo).not.toHaveClass('AngledLine__line-two--active');
      expect(skillEdgeThree).not.toHaveClass('AngledLine__line-three--active');
    });

    it('should be inactive if the next node is locked', () => {
      const startingId = '123';
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(
        startingId,
        startingState,
        leftAngledLinePosition
      );

      const skillEdgeOne = getByTestId('angled-line-one');
      const skillEdgeTwo = getByTestId('angled-line-two');
      const skillEdgeThree = getByTestId('angled-line-three');

      expect(skillEdgeOne).not.toHaveClass('AngledLine__line-one--active');
      expect(skillEdgeTwo).not.toHaveClass('AngledLine__line-two--active');
      expect(skillEdgeThree).not.toHaveClass('AngledLine__line-three--active');
    });

    it('should be active if the next node is selected', () => {
      const startingId = '123';
      const startingState = 'selected';

      const { getByTestId } = renderComponent(
        startingId,
        startingState,
        rightAngledLinePosition
      );

      const skillEdgeOne = getByTestId('angled-line-one');
      const skillEdgeTwo = getByTestId('angled-line-two');
      const skillEdgeThree = getByTestId('angled-line-three');

      expect(skillEdgeOne).toHaveClass('AngledLine__line-one--active');
      expect(skillEdgeTwo).toHaveClass('AngledLine__line-two--active');
      expect(skillEdgeThree).toHaveClass('AngledLine__line-three--active');
    });
  });
});
