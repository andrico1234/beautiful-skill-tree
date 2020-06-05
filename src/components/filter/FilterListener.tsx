import { useEffect, useContext, useState } from 'react';
import FilterContext from '../../context/FilterContext';

interface Props {
  setVisibility: (isVisible: boolean) => void;
  isVisible: boolean;
  treeId: string;
  disabled: boolean;
}

function FilterListener({ setVisibility, isVisible, treeId, disabled }: Props) {
  const { filtersMatches } = useContext(FilterContext);
  const [hasLoaded, setLoadingState] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      return setLoadingState(true);
    }

    if (disabled) {
      return setVisibility(false);
    }

    if (!filtersMatches) {
      if (isVisible === true) return;

      return setVisibility(true);
    }

    if (!filtersMatches.has(treeId)) {
      if (isVisible === false) return;
      return setVisibility(false);
    }

    if (isVisible === true) return;
    return setVisibility(true);
  }, [filtersMatches]);

  return null;
}

export default FilterListener;
