import React from 'react';
import ReactDOM from 'react-dom';
import { getCadesObjects } from './cadesObjects';
import { CadesContext } from './context';
import { DemoPage } from './DemoPage';

getCadesObjects().then(async (CadesObjects) => {
  const CadesDemo = () => (
    <CadesContext.Provider value={CadesObjects}>
      <DemoPage />
    </CadesContext.Provider>
  );

  ReactDOM.render(
    <CadesDemo />,
    document.getElementById('root'),
  );
});
