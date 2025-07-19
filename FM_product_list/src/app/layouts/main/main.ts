import { Component, inject, signal} from '@angular/core';
import { Desserts } from "../../features/desserts/desserts";
import { Cart } from "../../features/cart/cart";
import { CustomModal } from "../../shared/components/custom-modal/custom-modal";
import { UIRepository } from '../../shared/stores/ui.repository';

@Component({
  selector: 'app-main',
  imports: [Desserts, Cart, CustomModal],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  private readonly UIRepository = inject(UIRepository);
  readonly isModalOpen = signal<boolean>(false);

  
  constructor(){
      this.UIRepository.selectIsModalOpen.subscribe((isOpen) =>{
      this.isModalOpen.set(isOpen);
    })
  }
}
