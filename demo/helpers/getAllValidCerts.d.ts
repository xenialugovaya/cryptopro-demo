import Store from '../cadesObjects/CadesStore';
import { CertificateObject } from '../types';
export declare const getAllValidCerts: (store: Store) => Promise<(CertificateObject | undefined)[]>;
