import * as React from 'react';
import { SkillTree, NodeSelectEvent } from '../../dist/index';
import { secretTree } from '../mockData';
import { useState } from 'react';
import { ContextStorage, SkillData } from '../../src/models';
import { Dictionary } from '../../src/models/utils';

interface Props {
  handleNodeSelect: (e: NodeSelectEvent) => void;
  handleSave: (
    storage: ContextStorage,
    treeId: string,
    skills: Dictionary<SkillData>
  ) => void;
}

function DisabledSkillTree(props: Props) {
  const { handleNodeSelect, handleSave } = props;
  const [isDisabled, setDisabledState] = useState(true);

  return (
    <>
      <button onClick={() => setDisabledState(!isDisabled)} />
      <SkillTree
        treeId="secret"
        handleNodeSelect={handleNodeSelect}
        title="Secret Tree"
        data={secretTree}
        collapsible
        disabled={isDisabled}
        handleSave={handleSave}
      />
    </>
  );
}

export default DisabledSkillTree;
