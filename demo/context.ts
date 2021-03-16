import React from 'react';
import Store from './cadesObjects/CadesStore';

export interface CadesContextType {
  store: Store | null,

}

export const CadesContext = React.createContext<CadesContextType>({
  store: null,
});
