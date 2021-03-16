import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import * as L from 'korus-ui';
import { CadesContext } from '../context';
import { getAllValidCerts } from '../helpers/getAllValidCerts';
import { ParsedCertificate } from '../types';

export const CertificateList = (): React.ReactElement => {
  const cadesObjects = useContext(CadesContext);
  const { store } = cadesObjects;
  const [certs, setCerts] = useState<ParsedCertificate[] | null>(null);
  console.log('certs', certs);
  const [selectedCert, setSelectedCert] = useState<ParsedCertificate | null>(null);

  useEffect(() => {
    if (!store) return;

    getAllValidCerts(store).then((parsedCertificates) => {
      setCerts(parsedCertificates);
    });
  }, [store]);

  return (
    <L.Div _inner _txtCenter>
      <L.H3 _marginBottom>Выберите сертификат для подписания</L.H3>
      <L.Div _table>
        <L.Table _layoutFixed>
          <L.ColGroup>
            <L.Col style={{ width: '4rem' }} />
            <L.Col style={{ width: '24rem' }} />
            <L.Col style={{ width: '24rem' }} />
            <L.Col style={{ width: '35rem' }} />
          </L.ColGroup>
          <L.THead>
            <L.Tr>
              <L.Th _tableHeader />
              <L.Th _tableHeader>Subject</L.Th>
              <L.Th _tableHeader>Issuer</L.Th>
              <L.Th _tableHeader>Serial</L.Th>
            </L.Tr>
          </L.THead>
          <L.TBody _borderBottomNone>
            {certs?.map((cert) => (
              <L.Tr key={cert.thumbprint} onClick={() => setSelectedCert(cert)}>
                <L.Td>
                  <L.RadioGroup value={selectedCert?.thumbprint}>
                    <L.RadioButton value={cert.thumbprint} />
                  </L.RadioGroup>
                </L.Td>
                <L.Td>{cert.subject.CN}</L.Td>
                <L.Td>{cert.issuer.CN}</L.Td>
                <L.Td>{cert.serial}</L.Td>
              </L.Tr>
            ))}
          </L.TBody>
        </L.Table>
      </L.Div>
      <L.StickyPanel offsetTop={200}>
        <L.Div _inner>
          {/* <L.Button _right _primary isDisabled={isDisabledButton} onClick={onClickContinue}>
            Продолжить
          </L.Button> */}
        </L.Div>
      </L.StickyPanel>
    </L.Div>
  );
};
