import axios from 'axios';
import { Item } from '../store/cartStore';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CartService = {  
  async getList(): Promise<Item[]> {
    const response = await axios.get<Item[]>(`${API_BASE_URL}/cart`);
    return response.data;
  },

  async addItemToCart(item: Item): Promise<Item> {
    const response = await axios.post<Item>(`${API_BASE_URL}/cart`, item);
    return response.data;
  },

  async updateItemCartItem(name: string, quantity: number): Promise<Item> {
    const response = await axios.put<Item>(`${API_BASE_URL}/cart/${name}`, { quantity });
    return response.data;
  },

  async removeItemFromCart(name: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/cart/${name}`);
  },

  async clearCart(): Promise<void> {
    await axios.delete(`${API_BASE_URL}/cart`);
  }
};