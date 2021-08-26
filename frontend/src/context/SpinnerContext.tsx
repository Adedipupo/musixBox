import { createContext } from 'react';

interface Spinner {
  isLoader: boolean;
  onStop: () => void;
}
export const SpinnerContext = createContext({} as Spinner);
