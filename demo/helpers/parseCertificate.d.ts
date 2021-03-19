import { CertificateObject, ParsedCertificate } from '../types';
export declare const parseCertificate: (certificate: CertificateObject) => Promise<ParsedCertificate>;
export declare const parseCertificateArray: (certs: CertificateObject[]) => Promise<ParsedCertificate[]>;
