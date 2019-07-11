import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SkillTree, SkillTreeGroup } from '../src';
import './index.css';
import '../styles.css';
import { legsPushData, legsPullData } from './mockData';

const App = () => {
  return (
    <SkillTreeGroup>
      <SkillTree id="squat" title="Squat Progression" data={legsPushData} />
      <SkillTree id="hinge" title="Hinge Progression" data={legsPullData} />
    </SkillTreeGroup>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
