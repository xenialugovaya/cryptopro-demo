import React from 'react';
import ReactDOM from 'react-dom';
import { getCadesObjects } from './cadesObjects';
import { CertificateList } from './components/CertificateList';
import { CadesContext } from './context';

getCadesObjects().then(async (CadesObjects) => {
  // const { store } = CadesObjects;
  // await store.create();
  // await store.open();
  // const certs = await store.getCertificates();
  // const issuer = await certs[0]?.IssuerName;
  // const serial = await certs[0]?.SerialNumber;
  // const subject = await certs[0]?.SubjectName;

  // await store.close();

  // console.log('store', store);
  // console.log('certs', certs);
  // console.log('issuer', issuer);
  // console.log('serial', serial);
  // console.log('subject', subject);
  const CadesDemo = () => (
    <CadesContext.Provider value={CadesObjects}>
      <CertificateList />
    </CadesContext.Provider>
  );

  ReactDOM.render(
    <CadesDemo />,
    document.getElementById('root'),
  );
});
