import Store from '../cadesObjects/CadesStore';
import { CertificateObject, ParsedCertificate } from '../types';
import { parseCertificate } from './parseCertificate';

export const getAllValidCerts = async (store: Store)
  : Promise<(CertificateObject | undefined)[]> => {
  await store?.create();
  await store?.open();
  return store?.getCertificates();
  // const parsedCerts: ParsedCertificate[] = [];

  // for (let i = 0; i < certs.length; i += 1) {
  //   const current = certs[i];
  //   if (current === undefined) continue;
  //   const parsed = await parseCertificate(current);
  //   parsedCerts.push(parsed);
  // }

  // return parsedCerts;
};
