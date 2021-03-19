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
  <L.Div>
    <L.H3>Выберите сертификат</L.H3>
    <L.Div>
      <L.Table className="ui inverted table">
        <L.ColGroup>
          <L.Col style={{ width: '4rem' }} />
          <L.Col style={{ width: '24rem' }} />
          <L.Col style={{ width: '24rem' }} />
          <L.Col style={{ width: '35rem' }} />
        </L.ColGroup>
        <L.THead>
          <L.Tr>
            <L.Th />
            <L.Th>Subject</L.Th>
            <L.Th>Issuer</L.Th>
            <L.Th>Serial</L.Th>
          </L.Tr>
        </L.THead>
        <L.TBody>
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
                  <L.RadioButton className="ui radio checkbox orange" value={cert.thumbprint} />
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
