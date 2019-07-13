import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SkillTree, SkillTreeGroup, SkillTreeGroupProvider } from '../src';
import './index.css';
import '../styles.css';
import { legsPushData, legsPullData } from './mockData';

const App = () => {
  return (
    <SkillTreeGroupProvider>
      <SkillTreeGroup>
        {skillCount => {
          return (
            <React.Fragment>
              <h2 style={{ padding: '0 16px' }}>Total skills: {skillCount}</h2>
              <SkillTree
                id="squat"
                title="Squat Progression"
                data={legsPushData}
              />
              <SkillTree
                id="hinge"
                title="Hinge Progression"
                data={legsPullData}
              />
            </React.Fragment>
          );
        }}
      </SkillTreeGroup>
    </SkillTreeGroupProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
