import Store from '../cadesObjects/CadesStore';
import { ParsedCertificate } from '../types';
import { parseCertificate } from './parseCertificate';

export const getAllValidCerts = async (store: Store)
: Promise<ParsedCertificate[]> => {
  await store?.create();
  await store?.open();
  const certs = await store?.getCertificates();
  const parsedCerts: ParsedCertificate[] = [];

  for (let i = 0; i < certs.length; i += 1) {
    const current = certs[i];
    if (current === undefined) continue;
    const parsed = await parseCertificate(current);
    parsedCerts.push(parsed);
  }

  return parsedCerts;
};
