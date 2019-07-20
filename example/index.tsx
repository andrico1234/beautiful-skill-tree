import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SkillTree, SkillTreeGroup, SkillProvider } from '../src';
import './index.css';
import '../styles.css';
import { legsPushData, legsPullData } from './mockData';

const App = () => {
  return (
    <SkillProvider>
      <SkillTreeGroup>
        {({ skillCount, selectedSkillCount, resetSkills }) => {
          return (
            <React.Fragment>
              <div className="Example__header">
                <h2 className="Example__heading">
                  Completed skills: {selectedSkillCount}/{skillCount}
                </h2>
                <button className="Example__reset-button" onClick={resetSkills}>
                  Reset
                </button>
              </div>
              <SkillTree
                treeId="sp"
                title="Squat Progression"
                data={legsPushData}
              />
              <SkillTree
                treeId="hp"
                title="Hinge Progression"
                data={legsPullData}
              />
              <SkillTree
                treeId="sp"
                title="Squat Progression"
                data={legsPushData}
              />
              <SkillTree
                treeId="hp"
                title="Hinge Progression"
                data={legsPullData}
              />
              <SkillTree
                treeId="sp"
                title="Squat Progression"
                data={legsPushData}
              />
              <SkillTree
                treeId="hp"
                title="Hinge Progression"
                data={legsPullData}
              />
              <SkillTree
                treeId="sp"
                title="Squat Progression"
                data={legsPushData}
              />
              <SkillTree
                treeId="hp"
                title="Hinge Progression"
                data={legsPullData}
              />
            </React.Fragment>
          );
        }}
      </SkillTreeGroup>
    </SkillProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
