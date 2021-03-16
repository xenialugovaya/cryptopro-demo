import React, { useContext, useState } from 'react';
import * as L from 'korus-ui';
import { CertificateObject, ParsedCertificate } from '../types';
import { CadesContext } from '../context';

interface MessageFormProps {
  handleEncrypt: (message: string) => Promise<string | undefined>
  handleDecrypt: (encryptedMessage: string) => Promise<string | undefined>
}

export const MessageForm = ({ handleEncrypt, handleDecrypt }: MessageFormProps): React.ReactElement => {
  const { envelopedData } = useContext(CadesContext);

  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');

  const onEncryptClick = async () => {
    const encrypted = await handleEncrypt(message);
    if (encrypted !== undefined) setEncryptedMessage(encrypted);
  };

  const onDecryptClick = async () => {
    const decrypted = await handleDecrypt(encryptedMessage);
    if (decrypted !== undefined) setEncryptedMessage(decrypted);

    // await envelopedData?.create();
    // await envelopedData?.getDecriptedMessage(encryptedMessage);
    // const content = await envelopedData?.getContent();
    // console.log('content', content);
    // setEncryptedMessage(await envelopedData?.getContent());
  };

  return (
    <L.Div>
      <L.Textarea
        value={message}
        onChange={(ev) => setMessage(ev.component.value)}
      />
      {message && <L.Button onClick={onEncryptClick}>Encrypt</L.Button>}
      {encryptedMessage && (
      <>
        <L.Textarea
          value={encryptedMessage}
        />
        <L.Button onClick={onDecryptClick}>Decrypt</L.Button>
      </>
      )}
    </L.Div>
  );
};
