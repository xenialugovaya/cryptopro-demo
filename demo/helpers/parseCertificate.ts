import Store from '../cadesObjects/CadesStore';
import { CertificateObject, ParsedCertificate } from '../types';

const stringToObj = (string: string) => {
  const items = string.split(',');
  return items.reduce<{ [k: string]: string }>((obj, item) => {
    const [key, value] = item.split('=');
    obj[key.trim()] = value;
    return obj;
  }, {});
};

export const parseCertificate = async (certificate: CertificateObject)
: Promise<ParsedCertificate> => {
  const subject = stringToObj(await certificate.SubjectName);
  const issuer = stringToObj(await certificate.IssuerName);
  const serial = await certificate.SerialNumber;
  const thumbprint = await certificate.Thumbprint;
  return {
    subject,
    issuer,
    serial,
    thumbprint,
  };
};
