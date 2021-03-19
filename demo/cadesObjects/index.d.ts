import EnvelopedData from './CadesEnvelopedData';
import SignData from './CadesSignedData';
import Signer from './CadesSigner';
import Store from './CadesStore';
export declare const getCadesObjects: () => Promise<{
    store: Store;
    signer: Signer;
    envelopedData: EnvelopedData;
    signedData: SignData;
}>;
