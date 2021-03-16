import { CadesPlugin } from '../types';

export const init = (cadesplugin: Promise<void> | CadesPlugin): Promise<void> => {
  const canPromise = Boolean(window.Promise);

  if (canPromise) {
    return cadesplugin as Promise<void>;
  }

  return new Promise<void>((resolve, reject) => {
    window.addEventListener('message', (event) => {
      const eventData = event.data;

      if (eventData === 'cadesplugin_load_error') {
        reject(new Error('Ошибка при загрузке плагина'));
      }

      if (eventData === 'cadesplugin_loaded') {
        resolve();
      }
    });
  });
};
