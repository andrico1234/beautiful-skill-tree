import * as React from 'react';
import { SkillMap } from '../models';

interface Props {
  children: React.ReactNode;
}

interface IFilterContext {
  filtersMatches: Set<string> | null;
  handleFilter: (query: string) => void;
  addToSkillMap: (skillMap: SkillMap) => void;
}

const FilterContext = React.createContext<IFilterContext>({
  filtersMatches: null,
  handleFilter: () => null,
  addToSkillMap: () => null,
});

export function FilterProvider(props: Props) {
  const [skillMap, setSkillMap] = React.useState<SkillMap>({});
  const [filtersMatches, setMatches] = React.useState<Set<string> | null>(null);
  // keep the map, also keep track of the sorted keys. (if performance becomes a concern).

  function handleFilter(query: string) {
    if (query.trim() === '') {
      return setMatches(null);
    }

    const skills = Object.keys(skillMap);
    const filteredSkills = skills.filter(key => key.includes(query));
    const treeIds = new Set(filteredSkills.map(skill => skillMap[skill]));

    return setMatches(treeIds);
  }

  function addToSkillMap(skillMap: SkillMap) {
    return setSkillMap(prev => ({
      ...prev,
      ...skillMap,
    }));
  }

  return (
    <FilterContext.Provider
      value={{
        filtersMatches,
        handleFilter,
        addToSkillMap,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
}

export default FilterContext;
