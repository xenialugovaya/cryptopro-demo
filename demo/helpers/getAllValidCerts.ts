import Store from '../cadesObjects/CadesStore';
import { CertificateObject } from '../types';

export const getAllValidCerts = async (store: Store)
  : Promise<(CertificateObject | undefined)[]> => {
  await store?.create();
  await store?.open();
  return store?.getCertificates();
};
