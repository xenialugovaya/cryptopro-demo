import { CadesPlugin, CertificateObject } from '../types';
export default class Store {
    private cadesplugin;
    private store;
    constructor(cadesplugin: CadesPlugin);
    create(): Promise<void>;
    open(): Promise<void>;
    close(): Promise<void>;
    getCertificates(param?: number, option?: string): Promise<(CertificateObject | undefined)[]>;
}
