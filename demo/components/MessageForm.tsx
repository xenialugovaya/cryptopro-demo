import React, { useState } from 'react';
import * as L from 'korus-ui';

interface MessageFormProps {
  handleEncrypt: (message: string) => Promise<string | undefined>
  handleDecrypt: (encryptedMessage: string) => Promise<string | undefined>
  handleSign: (message: string) => Promise<string | undefined>
}

export const MessageForm = ({
  handleEncrypt,
  handleDecrypt,
  handleSign,
}: MessageFormProps): React.ReactElement => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');

  const onEncryptClick = async () => {
    const encrypted = await handleEncrypt(message);
    if (encrypted !== undefined) setEncryptedMessage(encrypted);
  };

  const onDecryptClick = async () => {
    const decrypted = await handleDecrypt(encryptedMessage);
    if (decrypted !== undefined) setEncryptedMessage(decrypted);
  };

  const onSignClick = async () => {
    const signedMessage = await handleSign(message);
    if (signedMessage !== undefined) setMessage(signedMessage);
  };

  return (
    <L.Div>
      <L.Textarea
        value={message}
        onChange={(ev) => setMessage(ev.component.value)}
      />
      {message && (
      <>
        <L.Button onClick={onSignClick}>Sign</L.Button>
        <L.Button onClick={onEncryptClick}>Encrypt</L.Button>
      </>
      )}
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
