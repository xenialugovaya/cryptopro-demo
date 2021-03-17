import React from 'react';
import * as L from 'korus-ui';
import { CertificateObject, ParsedCertificate } from '../types';

interface CertificateListProps {
  certs: ParsedCertificate[] | null,
  selectedCert: ParsedCertificate | null,
  setSelectedCert: React.Dispatch<React.SetStateAction<ParsedCertificate | null>>,
  certsCollection: CertificateObject[] | null,
  setCertObject: React.Dispatch<React.SetStateAction<CertificateObject | null>>,
}

export const CertificateList = ({
  certs,
  selectedCert,
  setSelectedCert,
  certsCollection,
  setCertObject,
}: CertificateListProps): React.ReactElement => (
  <L.Div _inner _txtCenter>
    <L.H3>Choose certificate</L.H3>
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
          {certs?.map((cert, index) => (
            <L.Tr
              key={cert.thumbprint}
              onClick={() => {
                if (!certsCollection) return;
                setSelectedCert(cert);
                setCertObject(certsCollection[index]);
              }}
            >
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
  </L.Div>
);
