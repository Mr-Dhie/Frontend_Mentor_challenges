// store/desserts.repository.ts
import { Injectable, inject } from '@angular/core';
import { dessertsStore, EnrichedCartItem } from './desserts.store';
import { select } from '@ngneat/elf';
import { DessertModel } from '../../models/dessert.model';
import { HttpClient } from '@angular/common/http';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DessertsRepository {
  private http = inject(HttpClient);

  desserts$ = dessertsStore.pipe(select((state) => state.desserts));
  cart$ = dessertsStore.pipe(select((state) => state.cart));
  loading$ = dessertsStore.pipe(select((state) => state.loading));

  cartItems$ = this.cart$.pipe(
    withLatestFrom(this.desserts$),
    map(([cartItem, desserts]) =>
      cartItem.map((cartItem) =>{
      const dessert = desserts.find((d) => d.id === cartItem.id);
      if (!dessert) return null;

      const itemTotal = Math.round(dessert?.price * cartItem.quantity * 100) / 100;

      return {
        ...cartItem,
        ...dessert,
        itemTotal
      };
      }).filter((item): item is EnrichedCartItem => item !== null)
    )
  );

  cartCount$ = this.cartItems$.pipe(map((items) => items.reduce((total, item) => total + item.quantity, 0)));
  cartTotal$ = this.cartItems$.pipe(map((items)=> items.reduce((total,item)=> total + (item.quantity * item.price), 0)))

  loadDesserts() {
    dessertsStore.update((state) => ({ ...state, loading: true }));

      this.http.get<Omit<DessertModel, 'id'>[]>('data.json').subscribe((dessertsRaw) => {
          const desserts: DessertModel[] = dessertsRaw.map((item, index) => ({
              ...item,
              id: `${index}`
          }));
      
          dessertsStore.update((state) => ({
              ...state,
              desserts,
              loading: false
          }));
      });
  }

  addToCart(id: string) {
    dessertsStore.update((state) => {
      const cart = [...state.cart]
      const itemIndex = cart.findIndex((item) => item.id === id);
      const dessert = [...state.desserts].find((item) => item.id === id);

      if (itemIndex > -1) {
        // Item already in cart, increase quantity
        cart[itemIndex].quantity += 1;
      } else {
        // Item not in cart, add it
        if(dessert)
        cart.push({id,quantity: 1})
      }

      return { ...state, cart };
    });
  }

  decreaseCartItem(id: string) {
    dessertsStore.update((state) => {
      const cart = state.cart
        .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0);
      
        return {...state, cart}
    });
  }

  isInCart(id: string) {
    return this.cartItems$.pipe(
      map(cart => cart.some(item => item.id === id))
    );
  }

  getItemQuantity(id:string){
    return this.cartItems$.pipe(
      map((cart) => cart.find((item) => item.id === id)?.quantity ?? 0)
    );
  }

  removeItemFromCart(id:string){
    dessertsStore.update((state) => ({
      ...state,
      cart: state.cart.filter(item => item.id !== id)
    }))
  }

  clearCart() {
    dessertsStore.update((state) => ({
      ...state,
      cart: []
    }));
  }
}
