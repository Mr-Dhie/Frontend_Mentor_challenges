// store/desserts.store.ts
import { createStore, withProps, select } from '@ngneat/elf';
import { DessertModel, Image } from '../../models/dessert.model'; 
import {
  persistState,
  localStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface EnrichedCartItem extends DessertModel {
  quantity: number;
  itemTotal: number;
}

interface CartItem {
  id: string;
  quantity: number;
}

interface DessertsState {
  desserts: DessertModel[];
  cart: CartItem[];
  loading: boolean;
}

const initialState: DessertsState = {
  desserts: [],
  cart: [],
  loading: false
};

export const dessertsStore = createStore(
  { name: 'desserts' },
  withProps(initialState)
);


export const persist = persistState(dessertsStore, {
  key: 'menu',
  storage: localStorageStrategy,
});