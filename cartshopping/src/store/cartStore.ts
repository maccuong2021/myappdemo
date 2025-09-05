import { create } from 'zustand';

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
  cart: [],
  addItemToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((i) => i.name === item.name);
      if (exists) {
        return {
          cart: state.cart.map((i) =>
            i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  updateItemQuantity: (name, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.name === name ? { ...i, quantity } : i
      ),
    })),
  removeItemFromCart: (name) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.name !== name),
    })),
}));