export type WithPromise<T> = Promise<T> | T;
export type CapicomEncodingType = 'CAPICOM_ENCODE_ANY' | 'CAPICOM_ENCODE_BASE64' | 'CAPICOM_ENCODE_BINARY';

export interface SearchObject<T> {
  objid: number;
  Find(count?: number, certificateName?: string): WithPromise<SearchObject<T>>;
  Count: WithPromise<number>;
  Item(id: number): WithPromise<T>;
}
export interface CertificateObject {
  objid: number;
  IssuerName: WithPromise<string>;
  SubjectName: WithPromise<string>;
  Version: WithPromise<string>;
  SerialNumber: WithPromise<string>;
  Thumbprint: WithPromise<string>;
}
export interface CadesStore {
  Open(userStore?: number, myStore?: string, storeOpenMaximumAllowed?: number): WithPromise<void>;
  Close(): WithPromise<void>;
  Certificates: WithPromise<SearchObject<CertificateObject>>;
}
export interface EnvelopedData {
  Decrypt(envelopedMessage: string): void;
  Encrypt(capicomEncodingType: CapicomEncodingType): Blob;
  Content: WithPromise<string>;
  Algorithm: WithPromise<number>;
  Recipients: CertificateObject[];
  objid: number;
  propset_Content(content: string): void;
  propset_Algorithm: number;
  propset_ContentEncoding(contentEncoding: number): void;
  propset_Recipients: number;
}
export interface CPSigner {
  Certificate: WithPromise<CertificateObject>;
  TSAAddress: WithPromise<string>;
}
export interface RawSignature {
  SignHash(hashedData: CadesHashedData, certificate: CertificateObject): Promise<string>;
  VerifyHash(hashedData: CadesHashedData, certificate: CertificateObject, rawSignature: string): Promise<void>;
}
export type SignedMessage = string;
export interface CadesSignedData {
  ContentEncoding: WithPromise<number>;
  Content: WithPromise<string>;
  SignCades(signer: CPSigner, cadesBES: number, bDetached?: boolean): WithPromise<SignedMessage>;
  SignHash(hashData: CadesHashedData, signer: CPSigner, cadesType: number, encodingType?: number): WithPromise<string>;
}
export interface About {
  MajorVersion: Promise<any>;
  MinorVersion: Promise<any>;
  BuildVersion: Promise<any>;
}
export interface CadesHashedData {
  Algorithm: WithPromise<number>;
  Value: WithPromise<string>;
  DataEncoding: WithPromise<number>;
  SetHashValue(hash: string): WithPromise<void>;
  Hash(data: string): WithPromise<void>;
}
export interface CreateObject<T>{
  (name: string): T;
}
export interface CreateObjectAsync<T>{
  (name: string): Promise<T>;
}
export interface CadesPlugin {
  CAPICOM_LOCAL_MACHINE_STORE: number;
  CAPICOM_CURRENT_USER_STORE: number;
  CADESCOM_LOCAL_MACHINE_STORE: number;
  CADESCOM_CURRENT_USER_STORE: number;
  CADESCOM_CONTAINER_STORE: number;
  CAPICOM_MY_STORE: string;
  CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED: number;
  CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED: number;
  CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING: number;
  CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE: number;
  XmlDsigGost3410UrlObsolete: string;
  XmlDsigGost3411UrlObsolete: string;
  XmlDsigGost3410Url: string;
  XmlDsigGost3411Url: string;
  CADESCOM_CADES_DEFAULT: number;
  CADESCOM_CADES_BES: number;
  CADESCOM_CADES_T: number;
  CADESCOM_CADES_X_LONG_TYPE_1: number;
  CADESCOM_ENCODE_BASE64: number;
  CADESCOM_ENCODE_BINARY: number;
  CADESCOM_ENCODE_ANY: number;
  CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT: number;
  CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN: number;
  CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY: number;
  CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME: number;
  CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME: number;
  CAPICOM_CERTIFICATE_FIND_SHA1_HASH: number;
  CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME: number;
  CAPICOM_CERTIFICATE_FIND_ISSUER_NAME: number;
  CAPICOM_CERTIFICATE_FIND_ROOT_NAME: number;
  CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME: number;
  CAPICOM_CERTIFICATE_FIND_EXTENSION: number;
  CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY: number;
  CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY: number;
  CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY: number;
  CAPICOM_CERTIFICATE_FIND_TIME_VALID: number;
  CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID: number;
  CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED: number;
  CAPICOM_CERTIFICATE_FIND_KEY_USAGE: number;
  CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE: number;
  CAPICOM_PROPID_ENHKEY_USAGE: number;
  CAPICOM_OID_OTHER: number;
  CAPICOM_OID_KEY_USAGE_EXTENSION: number;
  CAPICOM_EKU_CLIENT_AUTH: number;
  CAPICOM_EKU_SMARTCARD_LOGON: number;
  CAPICOM_EKU_OTHER: number;
  CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME: number;
  CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME: number;
  CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION: number;
  CADESCOM_ATTRIBUTE_OTHER: number;
  CADESCOM_STRING_TO_UCS2LE: number;
  CADESCOM_BASE64_TO_BINARY: number;
  CADESCOM_DISPLAY_DATA_NONE: number;
  CADESCOM_DISPLAY_DATA_CONTENT: number;
  CADESCOM_DISPLAY_DATA_ATTRIBUTE: number;
  CADESCOM_ENCRYPTION_ALGORITHM_RC2: number;
  CADESCOM_ENCRYPTION_ALGORITHM_RC4: number;
  CADESCOM_ENCRYPTION_ALGORITHM_DES: number;
  CADESCOM_ENCRYPTION_ALGORITHM_3DES: number;
  CADESCOM_ENCRYPTION_ALGORITHM_AES: number;
  CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89: number;
  CADESCOM_HASH_ALGORITHM_SHA1: number;
  CADESCOM_HASH_ALGORITHM_MD2: number;
  CADESCOM_HASH_ALGORITHM_MD4: number;
  CADESCOM_HASH_ALGORITHM_MD5: number;
  CADESCOM_HASH_ALGORITHM_SHA_256: number;
  CADESCOM_HASH_ALGORITHM_SHA_384: number;
  CADESCOM_HASH_ALGORITHM_SHA_512: number;
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411: number;
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256: number;
  CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512: number;
  LOG_LEVEL_DEBUG: number;
  LOG_LEVEL_INFO: number;
  LOG_LEVEL_ERROR: number;
  GetAbout: () => any;
  CreateObjectAsync: <T>(name: string) => Promise<T>;
  CreateObject: <T>(name: string) => T;
  isNativeMessageSupported: () => boolean;
}

export interface ParsedCertificate {
  subject:{ [k: string]: string },
  issuer: { [k: string]: string },
  serial: string,
  thumbprint: string,
}
