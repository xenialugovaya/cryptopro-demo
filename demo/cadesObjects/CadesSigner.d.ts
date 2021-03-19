import { CadesPlugin, CertificateObject, CPSigner } from '../types';
export default class Signer {
    private cadesplugin;
    private signer;
    constructor(cadesplugin: CadesPlugin);
    create(): Promise<void>;
    setCertificate(certificate: CertificateObject): Promise<void>;
    getCertificate(): Promise<CertificateObject>;
    getSigner(): CPSigner;
    setTSAAddress(url?: string): Promise<void>;
}
