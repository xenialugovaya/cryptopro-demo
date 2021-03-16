import cadesplugin from '../../cadesplugin';
import { init } from '../helpers';
import EnvelopedData from './CadesEnvelopedData';
import Signer from './CadesSigner';
import Store from './CadesStore';

export const getCadesObjects = async () => {
  try {
    await init(cadesplugin);
    return {
      store: new Store(cadesplugin),
      signer: new Signer(cadesplugin),
      envelopedData: new EnvelopedData(cadesplugin),
    };
  } catch (error) {
    throw new Error(error);
  }
};
