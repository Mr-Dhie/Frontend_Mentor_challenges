import { AfterViewInit, Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { trapFocus } from '../../utils/focus-trap.util';
import { EnrichedCartItem } from '../../stores/desserts.store';
import { DessertsRepository } from '../../stores/desserts.repository';
import { CartList } from "../cart-list/cart-list";
import { UIRepository } from '../../stores/ui.repository';

@Component({
  selector: 'app-custom-modal',
  imports: [CartList],
  templateUrl: './custom-modal.html',
  styleUrl: './custom-modal.css'
})
export class CustomModal implements AfterViewInit{
  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;
  private readonly dessertRepository = inject(DessertsRepository);
  private readonly UIRepository = inject(UIRepository)
  
  readonly cartItem = signal<EnrichedCartItem[]>([]);
  readonly cartTotal = signal<number>(0);

  constructor(){
    this.dessertRepository.cartItems$.subscribe((item) =>{
      this.cartItem.set(item);
    })

    this.dessertRepository.cartTotal$.subscribe((total) =>{
      this.cartTotal.set(total);
    })
  }

  ngAfterViewInit(): void {
    trapFocus(this.modalRef.nativeElement);
  }

  close(){
    this.UIRepository.closeModal(); 
    this.dessertRepository.clearCart();
    document.body.style.overflow = '';
  }
}
