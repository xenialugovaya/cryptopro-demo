import { CadesPlugin, CertificateObject } from '../types';
export default class EnvelopedData {
    private cadesplugin;
    private envelopedData;
    constructor(cadesplugin: CadesPlugin);
    create(): Promise<void>;
    setContent(content: string): Promise<void>;
    getContent(): Promise<string>;
    getEncryptedMessage(): Promise<string>;
    getDecryptedMessage(message: string): Promise<void>;
    addCertificate(certificate: CertificateObject): Promise<void>;
}
