import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SkillTree } from '../src';
import './index.css';
import { legsPushData, legsPullData } from './mockData';

const App = () => {
  return (
    <div className="App">
      <div className="App__body">
        <SkillTree id="squat" title="Squat Progression" data={legsPushData} />
        <SkillTree id="hinge" title="Hinge Progression" data={legsPullData} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
