import { Component, inject, signal } from '@angular/core';
import { DessertsRepository } from '../../shared/stores/desserts.repository';
import { CartList } from "../../shared/components/cart-list/cart-list";
import { DessertModel } from '../../models/dessert.model';
import { EnrichedCartItem } from '../../shared/stores/desserts.store';
import { UIRepository } from '../../shared/stores/ui.repository';

@Component({
  selector: 'app-cart',
  imports: [CartList],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private readonly dessertrepository = inject(DessertsRepository);
  readonly UIRepository = inject(UIRepository);
  
  readonly cartCount = signal<number>(0);
  readonly cartItem = signal<EnrichedCartItem[]>([]);
  readonly total = signal<number>(0);
    
  

  constructor() {
    this.dessertrepository.cartCount$.subscribe(count => {
      this.cartCount.set(count);
    });

    this.dessertrepository.cartItems$.subscribe((item) =>{
      this.cartItem.set(item);
    })

    this.dessertrepository.cartTotal$.subscribe((total) =>{
      this.total.set(total);
    })
  }


  openModal(){
    this.UIRepository.openModal();
    document.body.style.overflow = 'hidden'
  }

}
