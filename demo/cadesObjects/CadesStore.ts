import {
  CadesPlugin, CadesStore, CertificateObject,
} from '../types';

export default class Store {
  private cadesplugin: CadesPlugin;

  private store: CadesStore | null;

  constructor(cadesplugin: CadesPlugin) {
    this.cadesplugin = cadesplugin;
    this.store = null;
  }

  public async create(): Promise<void> {
    if (window.Promise) {
      this.store = await this.cadesplugin.CreateObjectAsync<CadesStore>('CAdESCOM.Store');
    } else {
      this.store = this.cadesplugin.CreateObject<CadesStore>('CAdESCOM.Store');
    }
  }

  public async open(): Promise<void> {
    if (!this.store) {
      throw new Error('Store was not created');
    }

    await this.store.Open(
      this.cadesplugin.CAPICOM_CURRENT_USER_STORE,
      this.cadesplugin.CAPICOM_MY_STORE,
      this.cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
    );
  }

  public async close(): Promise<void> {
    if (!this.store) {
      throw new Error('Store was not created');
    }

    await this.store.Close();
  }

  public async getCertificates(
    param = this.cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID,
    option?: string,
  ): Promise<(CertificateObject | undefined)[]> {
    if (!this.store) {
      throw new Error('Store was not created');
    }

    const certsCollection = await this.store.Certificates;

    const filteredCertsCollection = option
      ? await certsCollection.Find(param, option)
      : await certsCollection.Find(param);

    const count = await filteredCertsCollection.Count;

    const certificates = [];

    if (count !== undefined) {
      for (let i = 1; i <= count; i += 1) {
        certificates.push(await filteredCertsCollection.Item(i));
      }
    }

    return certificates;
  }
}
