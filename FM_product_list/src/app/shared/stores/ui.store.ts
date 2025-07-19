import { createStore, withProps } from "@ngneat/elf";

interface UIState{
    isModalOpen: boolean;
}

const initialState: UIState ={
    isModalOpen: false
};

export const uiStore = createStore(
    { name: 'ui'},
    withProps(initialState)
);