import { create } from "zustand";

export interface Item {
    name: string;
    unitPrice: number;
    quantity: number;
}

interface CartState {
    cart: Item[];
    addItemToCart: (item: Item) => void;
    updateItemQuantity: (name: string, quantity: number) => void;
    removeItemFromCart: (name: string) => void;   
}

export const useCartStore = create<CartState>((set) => ({
    cart: [{
        name: 'Item 1',
        unitPrice: 10,
        quantity: 1
    },
    {
        name: 'Item 2',
        unitPrice: 10,
        quantity: 1
    }],
    
    addItemToCart: (item) => set((state) => ({
        cart: [...state.cart, item]
    })),
    
    updateItemQuantity: (name, quantity) => set((state) => ({
        cart: state.cart.map(item =>
            item.name === name ? { ...item, quantity } : item
        )
    })),
    
    removeItemFromCart: (name) => set((state) => ({
        cart: state.cart.filter(item => item.name !== name)
    }))
}));