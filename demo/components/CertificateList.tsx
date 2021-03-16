import React from 'react';
import * as L from 'korus-ui';
// import { CadesContext } from '../context';
// import { getAllValidCerts } from '../helpers/getAllValidCerts';
import { ParsedCertificate } from '../types';

interface CertificateListProps {
  certs: ParsedCertificate[] | null,
  selectedCert: ParsedCertificate | null,
  setSelectedCert: React.Dispatch<React.SetStateAction<ParsedCertificate | null>>,
}

export const CertificateList = ({
  certs,
  selectedCert,
  setSelectedCert,
}: CertificateListProps): React.ReactElement =>
// const cadesObjects = useContext(CadesContext);
// const { store } = cadesObjects;

// const [certs, setCerts] = useState<ParsedCertificate[] | null>(null);
// const [selectedCert, setSelectedCert] = useState<ParsedCertificate | null>(null);

// const handleGetCertsClick = () => {
//   if (!store) return;

//   getAllValidCerts(store).then((parsedCertificates) => {
//     setCerts(parsedCertificates);
//     setSelectedCert(parsedCertificates[0]);
//   });
// };

// const onClickContinue = () => {

// };

// if (!certs) {
//   return (
//     <L.Button onClick={handleGetCertsClick}>Получить все действующие сертификаты</L.Button>
//   );
// }

  (
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
    </L.Div>
  );
