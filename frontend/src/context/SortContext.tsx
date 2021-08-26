import { createContext } from 'react';

interface SortStatus {
  onSortHandler: (field: string) => void;
}
export const SortContext = createContext({} as SortStatus);
