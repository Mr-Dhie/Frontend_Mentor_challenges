import { Component, inject, input, signal } from '@angular/core';
import { DessertModel } from '../../../models/dessert.model';
import { DessertsRepository } from '../../stores/desserts.repository';
import { EnrichedCartItem } from '../../stores/desserts.store';

@Component({
  selector: 'app-cart-list',
  imports: [],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css'
})
export class CartList {
  private readonly dessertRepository = inject(DessertsRepository);
  item = input.required<EnrichedCartItem>();
  showThumbnail= input<boolean>(false);

  removeItem(id:string){
    this.dessertRepository.removeItemFromCart(id);
  }
  
}
