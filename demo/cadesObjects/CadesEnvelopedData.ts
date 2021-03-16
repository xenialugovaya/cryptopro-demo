import {
  CadesPlugin, CadesEnvelopedData,
} from '../types';

export default class EnvelopedData {
  private cadesplugin: CadesPlugin;

  private envelopedData: CadesEnvelopedData | null;

  constructor(cadesplugin: CadesPlugin) {
    this.cadesplugin = cadesplugin;
    this.envelopedData = null;
  }

  public async create(): Promise<void> {
    if (window.Promise) {
      this.envelopedData = await this.cadesplugin.CreateObjectAsync<CadesEnvelopedData>('CAdESCOM.CPEnvelopedData');
    } else {
      this.envelopedData = this.cadesplugin.CreateObject<CadesEnvelopedData>('CAdESCOM.CPEnvelopedData');
    }
  }

  public async setContent(content: string): Promise<void> {
    if (!this.envelopedData) {
      throw new Error('EnvelopedData was not created');
    }

    await this.envelopedData.propset_Content(content);
  }

  public async getContent(): Promise<string> {
    if (!this.envelopedData) {
      throw new Error('EnvelopedData was not created');
    }

    return this.envelopedData.Content;
  }

  public async getEncryptedMessage(): Promise<string> {
    if (!this.envelopedData) {
      throw new Error('EnvelopedData was not created');
    }

    const encrypted = await this.envelopedData.Encrypt(this.cadesplugin.CADESCOM_ENCODE_BASE64);
    if (encrypted === '') {
      throw new Error('Encrypt failed');
    }
    return encrypted;
  }

  public async getDecriptedMessage(message: string): Promise<void> {
    if (!this.envelopedData) {
      throw new Error('EnvelopedData was not created');
    }

    await this.envelopedData.Decrypt(message);
  }
}
