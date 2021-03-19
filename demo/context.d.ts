import React from 'react';
import EnvelopedData from './cadesObjects/CadesEnvelopedData';
import Signer from './cadesObjects/CadesSigner';
import Store from './cadesObjects/CadesStore';
import SignedData from './cadesObjects/CadesSignedData';
export interface CadesContextType {
    store: Store | null;
    signer: Signer | null;
    envelopedData: EnvelopedData | null;
    signedData: SignedData | null;
}
export declare const CadesContext: React.Context<CadesContextType>;
