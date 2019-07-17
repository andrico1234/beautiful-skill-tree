import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Skill } from '../models';
import SkillTreeSegment from './SkillTreeSegment';
import HSeparator from './ui/HSeparator';
import CalculateTotalNodes from './CalculateNodeCount';
import { SkillTreeProvider } from '../context/SkillTreeContext';

interface Props {
  data: Skill[];
  title: string;
}

const defaultParentPosition = {
  bottom: 0,
  center: 0,
};

function SkillTree({ data, title }: Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    function setState() {
      setIsMobile(window.innerWidth < 900);
    }

    window.addEventListener('resize', throttle(setState, 250));

    return function cleanup() {
      window.removeEventListener('resize', throttle(setState, 250));
    };
  }, []);

  return (
    <SkillTreeProvider treeId={title}>
      <CalculateTotalNodes data={data} />
      <div className="SkillTree__container">
        <h2 className="SkillTree__title">{title}</h2>
        <div className="SkillTree">
          {data.map((skill, i) => {
            return (
              <React.Fragment key={skill.id}>
                <SkillTreeSegment
                  parentState="unlocked"
                  parentPosition={defaultParentPosition}
                  skill={skill}
                />
                {data.length - 1 !== i && isMobile && <HSeparator />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SkillTreeProvider>
  );
}

export default SkillTree;
