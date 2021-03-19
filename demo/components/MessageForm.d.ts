import React from 'react';
interface MessageFormProps {
    handleEncrypt: (message: string) => Promise<string | undefined>;
    handleDecrypt: (encryptedMessage: string) => Promise<string | undefined>;
    handleSign: (message: string, shouldDetach: boolean) => Promise<string | undefined>;
    handleVerify: (signedMessage: string, shouldDetach: boolean) => Promise<void>;
}
export declare const MessageForm: ({ handleEncrypt, handleDecrypt, handleSign, handleVerify, }: MessageFormProps) => React.ReactElement;
export {};
