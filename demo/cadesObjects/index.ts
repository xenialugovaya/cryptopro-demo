import cadesplugin from '../../cadesplugin';
import { init } from '../helpers';
import EnvelopedData from './CadesEnvelopedData';
import SignData from './CadesSignedData';
import Signer from './CadesSigner';
import Store from './CadesStore';

export const getCadesObjects = async () => {
  try {
    await init(cadesplugin);
    return {
      store: new Store(cadesplugin),
      signer: new Signer(cadesplugin),
      envelopedData: new EnvelopedData(cadesplugin),
      signedData: new SignData(cadesplugin),
    };
  } catch (error) {
    throw new Error(error);
  }
};
