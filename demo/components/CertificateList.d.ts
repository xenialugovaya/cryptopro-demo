import React from 'react';
import { CertificateObject, ParsedCertificate } from '../types';
interface CertificateListProps {
    certs: ParsedCertificate[] | null;
    selectedCert: ParsedCertificate | null;
    setSelectedCert: React.Dispatch<React.SetStateAction<ParsedCertificate | null>>;
    certsCollection: CertificateObject[] | null;
    setCertObject: React.Dispatch<React.SetStateAction<CertificateObject | null>>;
}
export declare const CertificateList: ({ certs, selectedCert, setSelectedCert, certsCollection, setCertObject, }: CertificateListProps) => React.ReactElement;
export {};
