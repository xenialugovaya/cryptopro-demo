import React, { useState } from 'react';
import * as L from 'korus-ui';

interface MessageFormProps {
  handleEncrypt: (message: string) => Promise<string | undefined>
  handleDecrypt: (encryptedMessage: string) => Promise<string | undefined>
  handleSign: (message: string, shouldDetach: boolean) => Promise<string | undefined>
  handleVerify: (signedMessage: string, shouldDetach: boolean) => Promise<void>
}

export const MessageForm = ({
  handleEncrypt,
  handleDecrypt,
  handleSign,
  handleVerify,
}: MessageFormProps): React.ReactElement => {
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [verified, setVerified] = useState<boolean | undefined>();
  const [shouldDetach, setShouldDetach] = useState(false);

  const onEncryptClick = async () => {
    const encrypted = await handleEncrypt(message);
    if (encrypted !== undefined) setEncryptedMessage(encrypted);
  };

  const onDecryptClick = async () => {
    const decrypted = await handleDecrypt(encryptedMessage);
    if (decrypted !== undefined) setEncryptedMessage(decrypted);
  };

  const onSignClick = async () => {
    const signed = await handleSign(message, shouldDetach);
    if (signed !== undefined) setSignedMessage(signed);
  };

  const onVerifyClick = async () => {
    try {
      await handleVerify(signedMessage, shouldDetach);
      setVerified(true);
    } catch (error) {
      console.error(error);
      setVerified(false);
    }
  };

  return (
    <L.Div>
      <L.H3>Type some message</L.H3>
      <L.Textarea
        value={message}
        onChange={(ev) => setMessage(ev.component.value)}
      />
      {message && (
      <>
        <L.CheckBox
          value={shouldDetach}
          onChange={() => setShouldDetach(!shouldDetach)}
        >
          Should detach signature
        </L.CheckBox>
        <L.Button onClick={onSignClick}>Sign</L.Button>
        <L.Button onClick={onEncryptClick}>Encrypt</L.Button>
      </>
      )}
      {signedMessage && (
      <>
        <L.Textarea
          value={signedMessage}
        />
        <L.Button onClick={onVerifyClick}>Verify</L.Button>
        {verified !== undefined && (
        <L.P style={{ color: verified ? 'green' : 'red' }}>
          {verified ? 'Verified!' : 'Not Verified'}
        </L.P>
        )}
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
