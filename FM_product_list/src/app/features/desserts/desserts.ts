import { Component, inject, signal } from '@angular/core';
import { MenuCard } from '../../shared/components/menu-card/menu-card';
import { DessertsRepository } from '../../shared/stores/desserts.repository';
import { DessertModel } from '../../models/dessert.model';

@Component({
  selector: 'app-desserts',
  imports: [MenuCard],
  templateUrl: './desserts.html',
  styleUrl: './desserts.css'
})
export class Desserts {
  private dessertsRepository = inject(DessertsRepository);
  readonly desserts = signal<DessertModel[]>([]);
  

  constructor(){
    this.dessertsRepository.desserts$.subscribe(desserts => {
      this.desserts.set(desserts);
    });
    
    this.dessertsRepository.loadDesserts();
  }
}
