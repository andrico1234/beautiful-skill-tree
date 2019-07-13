import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import SkillNode from '../SkillNode';
import { Skill } from '../../models';
import { legsPushData } from '../__mocks__/mockData';

function fireResize(width: number) {
  // @ts-ignore
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

function renderComponent(children: Skill[] = []) {
  return render(
    <SkillNode
      skill={{
        children,
        id: 'test-node',
        icon: './hey',
        title: 'Hey there',
        tooltipDescription: 'Description',
      }}
    />
  );
}

describe('SkillNode component', () => {
  afterEach(cleanup);

  it('should handle resizing of the window correctly', () => {
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);

    renderComponent(legsPushData);

    // empty until i can work out how to attach the renderedComponnet to the DOM
    // otherwise getBoundingClientRect() always returns 0.
    act(() => {
      fireResize(400);
    });
  });
});
