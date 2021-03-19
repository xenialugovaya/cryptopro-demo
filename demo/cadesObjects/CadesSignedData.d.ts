import { CadesPlugin, CPSigner } from '../types';
export default class SignData {
    private cadesplugin;
    private signedData;
    constructor(cadesplugin: CadesPlugin);
    create(): Promise<void>;
    setContent(content: string): Promise<void>;
    setEncoding(encodingType: number): Promise<void>;
    signContent(signer: CPSigner, encodingType?: number): Promise<string>;
    signContentDetachedSignature(signer: CPSigner, encodingType?: number): Promise<string>;
    verifySignature(signedContent: string, encodingType?: number): Promise<void>;
    verifyDetachedSignature(signedContent: string, encodingType?: number): Promise<void>;
}
