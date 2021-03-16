import React, {
  useContext, useState,
} from 'react';
import * as L from 'korus-ui';
import { CadesContext } from './context';
import { getAllValidCerts } from './helpers/getAllValidCerts';
import { ParsedCertificate } from './types';
import { CertificateList } from './components/CertificateList';

export const DemoPage = (): React.ReactElement | null => {
  const cadesObjects = useContext(CadesContext);
  const { store, signer } = cadesObjects;

  const [certs, setCerts] = useState<ParsedCertificate[] | null>(null);
  const [selectedCert, setSelectedCert] = useState<ParsedCertificate | null>(null);

  const handleGetCertsClick = () => {
    if (!store) return;

    getAllValidCerts(store).then((parsedCertificates) => {
      setCerts(parsedCertificates);
      setSelectedCert(parsedCertificates[0]);
    });
  };

  const onClickContinue = () => {
    if (!selectedCert) return;
    // signer?.setCertificate(selectedCert);
  };

  if (!certs) {
    return (
      <L.Button onClick={handleGetCertsClick}>Получить все действующие сертификаты</L.Button>
    );
  }

  return (
    <L.Div>
      {certs && (
      <CertificateList
        certs={certs}
        selectedCert={selectedCert}
        setSelectedCert={setSelectedCert}
      />
      )}
      <L.StickyPanel offsetTop={200}>
        <L.Div _inner>
          {selectedCert && (
            <L.Button onClick={onClickContinue}>
              Продолжить
            </L.Button>
          )}
        </L.Div>
      </L.StickyPanel>
    </L.Div>
  );
};
