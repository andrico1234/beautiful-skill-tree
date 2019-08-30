import { useContext, useEffect } from 'react';
import { Skill, SkillCount } from '../models';
import AppContext from '../context/AppContext';
import SkillContext from '../context/SkillContext';

interface Props {
  data: Skill[];
}

function calculateNodeCount(data: Skill[]): SkillCount {
  return data.reduce(
    (prev, curr) => {
      const nodeType = curr.optional ? 'optional' : 'required';

      if (curr.children.length > 0) {
        const incOptional = nodeType === 'optional' ? 1 : 0;
        const incRequired = nodeType === 'required' ? 1 : 0;
        const childNodeCount = calculateNodeCount(curr.children);

        return {
          optional: prev.optional + childNodeCount.optional + incOptional,
          required: prev.required + childNodeCount.required + incRequired,
        };
      }

      return {
        ...prev,
        [nodeType]: prev[nodeType] + 1,
      };
    },
    {
      required: 0,
      optional: 0,
    }
  );
}

function CalculateNodeCount({ data }: Props) {
  const { addToSkillCount } = useContext(AppContext);
  const { setSkillCount } = useContext(SkillContext);

  useEffect(() => {
    const count = calculateNodeCount(data);
    const { required, optional } = count;
    setSkillCount(required + optional);
    addToSkillCount(count);
  }, []);

  return null;
}

export default CalculateNodeCount;
