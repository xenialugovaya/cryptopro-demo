import {
  CadesPlugin, CadesSignedData, CPSigner,
} from '../types';

export default class SignData {
  private cadesplugin: CadesPlugin;

  private signedData: CadesSignedData | null;

  constructor(cadesplugin: CadesPlugin) {
    this.cadesplugin = cadesplugin;
    this.signedData = null;
  }

  public async create(): Promise<void> {
    if (window.Promise) {
      this.signedData = await this.cadesplugin.CreateObjectAsync<CadesSignedData>('CAdESCOM.CadesSignedData');
    } else {
      this.signedData = this.cadesplugin.CreateObject<CadesSignedData>('CAdESCOM.CadesSignedData');
    }
  }

  public async setContent(content: string): Promise<void> {
    if (!this.signedData) {
      throw new Error('SignedData was not created');
    }

    await this.signedData.propset_Content(content);
    console.log('Content was set successfully!');
  }

  public async setEncoding(encodingType: number): Promise<void> {
    if (!this.signedData) {
      throw new Error('SignedData was not created');
    }

    await this.signedData.propset_ContentEncoding(encodingType);
    console.log('ContentEncoding was set successfully!');
  }

  public async signContent(
    signer: CPSigner,
    encodingType = this.cadesplugin.CADESCOM_CADES_X_LONG_TYPE_1,
    shouldDetachSignature = false,
  ): Promise<string> {
    if (!this.signedData) {
      throw new Error('SignedData was not created');
    }
    const signedContent = await this.signedData.SignCades(
      signer,
      encodingType,
      shouldDetachSignature,
    );

    console.log('Content was signed successfully!');
    return signedContent;
  }

  public async verifySignature(
    signedContent: string,
    encodingType = this.cadesplugin.CADESCOM_CADES_X_LONG_TYPE_1,
  ): Promise<void> {
    if (!this.signedData) {
      throw new Error('SignedData was not created');
    }

    await this.signedData.VerifyCades(signedContent, encodingType);
    console.log('Content was verified successfully!');
  }
}
