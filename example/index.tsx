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
              <h2 className="Example__heading">
                Completed skills: {selectedSkillCount}/{skillCount}
                <button onClick={resetSkills}>Reset</button>
              </h2>
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
