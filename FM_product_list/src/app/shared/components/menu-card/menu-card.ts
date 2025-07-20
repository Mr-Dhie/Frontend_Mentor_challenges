import { Component, computed, inject, input, signal } from '@angular/core';
import { DessertModel } from '../../../models/dessert.model';
import { DessertsRepository } from '../../stores/desserts.repository';
import { map } from 'rxjs';

@Component({
  selector: 'app-menu-card',
  imports: [],
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.css'
})
export class MenuCard {
  private readonly dessertRepository = inject(DessertsRepository);
  item = input.required<DessertModel>();
  
  private readonly _isInCart = signal<boolean>(false);
  readonly isInCart = computed(() => this._isInCart());

  private readonly _itemQuantity = signal<number>(0);
  readonly itemQuantity = computed(()=> this._itemQuantity());

  ngOnInit() {
    if (this.item()) {
      this.dessertRepository.isInCart(this.item().id).subscribe((isInCart) => {
        this._isInCart.set(isInCart); 
      });

      this.dessertRepository.getItemQuantity(this.item().id).subscribe((qty) =>{
        this._itemQuantity.set(qty);
      })
    }
  }

  addItem(id:string){
    this.dessertRepository.addToCart(id);
  }

  decreaseItem(id:string){
    this.dessertRepository.decreaseCartItem(id)
  }

  
}
