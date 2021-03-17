import {
  CadesPlugin, CertificateObject, CPSigner,
} from '../types';

export default class Signer {
  private cadesplugin: CadesPlugin;

  private signer: CPSigner | null;

  constructor(cadesplugin: CadesPlugin) {
    this.cadesplugin = cadesplugin;
    this.signer = null;
  }

  public async create(): Promise<void> {
    if (window.Promise) {
      this.signer = await this.cadesplugin.CreateObjectAsync<CPSigner>('CAdESCOM.CPSigner');
    } else {
      this.signer = this.cadesplugin.CreateObject<CPSigner>('CAdESCOM.CPSigner');
    }
    console.log('Signer created!');
  }

  public async setCertificate(certificate: CertificateObject): Promise<void> {
    if (!this.signer) {
      throw new Error('Signer was not created');
    }

    await this.signer.propset_Certificate(certificate);
    console.log('Certificate set successfully!');
  }

  public async getCertificate(): Promise<CertificateObject> {
    if (!this.signer) {
      throw new Error('Signer was not created');
    }

    return this.signer.Certificate;
  }

  public getSigner(): CPSigner {
    if (!this.signer) {
      throw new Error('Signer was not created');
    }

    return this.signer;
  }

  public async setTSAAddress(url = 'http://testca.cryptopro.ru/tsp/'): Promise<void> {
    if (!this.signer) {
      throw new Error('Signer was not created');
    }

    await this.signer.propset_TSAAddress(url);
  }
}
