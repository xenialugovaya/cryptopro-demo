import React, {
  useContext, useState,
} from 'react';
import * as L from 'korus-ui';
import { CadesContext } from './context';
import { getAllValidCerts } from './helpers/getAllValidCerts';
import { CertificateObject, ParsedCertificate } from './types';
import { CertificateList } from './components/CertificateList';
import { parseCertificateArray } from './helpers/parseCertificate';

export const DemoPage = (): React.ReactElement | null => {
  const cadesObjects = useContext(CadesContext);
  const { store, signer, envelopedData } = cadesObjects;

  const [certsCollection, setCertsCollection] = useState<CertificateObject[] | null>(null);
  const [certObject, setCertObject] = useState<CertificateObject | null>(null);
  const [certs, setCerts] = useState<ParsedCertificate[] | null>(null);
  const [selectedCert, setSelectedCert] = useState<ParsedCertificate | null>(null);

  const handleGetCertsClick = () => {
    if (!store) return;

    getAllValidCerts(store).then(async (certificates) => {
      setCertsCollection(certificates as CertificateObject[]);
      setCerts(await parseCertificateArray(certificates as CertificateObject[]));
    });
  };

  const onClickContinue = () => {
    if (!certObject) return;
    signer?.setCertificate(certObject);
    envelopedData?.addCertificate(certObject);
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
        certsCollection={certsCollection}
        setCertObject={setCertObject}
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
