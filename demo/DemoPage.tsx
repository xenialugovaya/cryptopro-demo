import React, { useContext, useState } from 'react';
import * as L from 'korus-ui';
import { CadesContext } from './context';
import { getAllValidCerts } from './helpers/getAllValidCerts';
import { CertificateObject, ParsedCertificate } from './types';
import { CertificateList } from './components/CertificateList';
import { parseCertificateArray } from './helpers/parseCertificate';
import { MessageForm } from './components/MessageForm';

export const DemoPage = (): React.ReactElement | null => {
  const cadesObjects = useContext(CadesContext);
  const {
    store, signer, envelopedData, signedData,
  } = cadesObjects;

  const [certsCollection, setCertsCollection] = useState<CertificateObject[] | null>(null);
  const [certObject, setCertObject] = useState<CertificateObject | null>(null);
  const [certs, setCerts] = useState<ParsedCertificate[] | null>(null);
  const [selectedCert, setSelectedCert] = useState<ParsedCertificate | null>(null);
  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);

  const handleGetCertsClick = () => {
    if (!store) return;

    getAllValidCerts(store).then(async (certificates) => {
      setCertsCollection(certificates as CertificateObject[]);
      setCerts(await parseCertificateArray(certificates as CertificateObject[]));
    });
  };

  const onClickContinue = async () => {
    if (!certObject || !signer) return;
    await signer.create();
    await signer.setCertificate(certObject);
    await signer.setTSAAddress();
    setShowMessageForm(true);
  };

  const handleSign = async (message: string, shouldDetach: boolean) => {
    if (!signer || !signedData) return undefined;
    await signedData.create();
    await signedData.setContent(message);

    const signedMessage = shouldDetach
      ? await signedData.signContentDetachedSignature(signer.getSigner())
      : await signedData.signContent(signer.getSigner());
    return signedMessage;
  };

  const handleEncrypt = async (message: string): Promise<string | undefined> => {
    if (!envelopedData || !certObject) return undefined;
    await envelopedData.create();
    await envelopedData.setContent(message);
    await envelopedData.addCertificate(certObject);
    const encrypted = await envelopedData.getEncryptedMessage();
    return encrypted;
  };

  const handleDecrypt = async (encryptedMessage: string): Promise<string | undefined> => {
    if (!envelopedData || !certObject) return undefined;
    await envelopedData.create();
    await envelopedData.getDecryptedMessage(encryptedMessage);
    const content = await envelopedData.getContent();
    return content;
  };

  const handleVerify = async (signedMessage: string, shouldDetach: boolean): Promise<void> => {
    if (!signedData) return undefined;
    await signedData.create();
    if (shouldDetach) {
      await signedData.verifyDetachedSignature(signedMessage);
    } else {
      await signedData.verifySignature(signedMessage);
    }
  };

  if (!certs) {
    return (
      <L.Div style={{ padding: '50px 40px' }}>
        <L.Button
          className="ui orange button"
          onClick={handleGetCertsClick}
        >
          ???????????????? ?????? ?????????????????????? ??????????????????????
        </L.Button>
      </L.Div>
    );
  }

  return (
    <L.Div style={{ padding: '50px 40px' }}>
      {certs && (
      <CertificateList
        certs={certs}
        selectedCert={selectedCert}
        setSelectedCert={setSelectedCert}
        certsCollection={certsCollection}
        setCertObject={setCertObject}
      />
      )}
      <br />
      <br />
      <L.StickyPanel offsetTop={200}>
        <L.Div>
          {selectedCert && (
            <L.Button
              className="ui orange button"
              onClick={onClickContinue}
            >
              ????????????????????
            </L.Button>
          )}
        </L.Div>
      </L.StickyPanel>
      {showMessageForm && (
      <MessageForm
        handleEncrypt={handleEncrypt}
        handleDecrypt={handleDecrypt}
        handleSign={handleSign}
        handleVerify={handleVerify}
      />
      )}
    </L.Div>
  );
};
