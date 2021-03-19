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
    <L.Div className="ui form">
      <L.H3>Введите сообщение</L.H3>
      <L.Textarea
        value={message}
        onChange={(ev) => setMessage(ev.component.value)}
      />
      <br />
      <br />
      {message && (
      <>
        <L.Button
          className="ui orange button"
          onClick={onSignClick}
        >
          Подписать

        </L.Button>
        <L.Button
          className="ui orange button"
          onClick={onEncryptClick}
        >
          Зашифровать

        </L.Button>
        <L.CheckBox
          className="ui checkbox"
          value={shouldDetach}
          onChange={() => setShouldDetach(!shouldDetach)}
        >
          Создать отсоединенную подпись
        </L.CheckBox>
        <br />
        <br />
      </>
      )}
      {signedMessage && (
      <>
        <L.Textarea
          value={signedMessage}
        />
        <br />
        <br />
        <L.Button
          className="ui orange button"
          onClick={onVerifyClick}
        >
          Проверить подпись
        </L.Button>
        <br />
        <br />
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
        <br />
        <br />
        <L.Button
          className="ui orange button"
          onClick={onDecryptClick}
        >
          Расшифровать

        </L.Button>
      </>
      )}
    </L.Div>
  );
};
