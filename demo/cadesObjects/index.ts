import cadesplugin from '../../cadesplugin';
import { init } from '../helpers';
import Store from './CadesStore';

export const getCadesObjects = async () => {
  try {
    await init(cadesplugin);
    return {
      store: new Store(cadesplugin),
    };
  } catch (error) {
    throw new Error(error);
  }
};
