import { Injectable } from "@angular/core";
import { uiStore } from "./ui.store";
import { select } from "@ngneat/elf";

@Injectable({ providedIn: 'root' })
export class UIRepository{
    selectIsModalOpen = uiStore.pipe(select((state)=> state.isModalOpen));


    openModal(){
        uiStore.update((state) => ({...state, isModalOpen:true}));
    }

    closeModal(){
        uiStore.update((state) => ({...state, isModalOpen:false}));
    }
}