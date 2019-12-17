import { useContext, useEffect } from 'react';
import { Skill, SkillMap } from '../../models';
import FilterContext from '../../context/FilterContext';

interface Props {
  treeId: string;
  skills: Skill[];
}

function createSkillsTreeMap(treeId: string, skills: Skill[]) {
  const skillsTreeMap: SkillMap = {};

  function addSkillToMap(currentSkill: Skill[]) {
    currentSkill.forEach(skill => {
      if (skill.children.length > 0) {
        addSkillToMap(skill.children);
      }

      console.log(typeof skill.title);

      console.log(skill.title.toString());

      skillsTreeMap[skill.title.toLowerCase()] = treeId;
    });
  }

  addSkillToMap(skills);

  return skillsTreeMap;
}

function AddToFilterIndex(props: Props) {
  const { skills, treeId } = props;
  const { addToSkillMap } = useContext(FilterContext);

  useEffect(() => {
    const skillsTreeMap = createSkillsTreeMap(treeId, skills);
    addToSkillMap(skillsTreeMap);
  }, []);

  return null;
}

export default AddToFilterIndex;
