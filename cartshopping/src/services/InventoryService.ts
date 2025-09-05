import axios from 'axios';
import { Item } from '../store/cartStore';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const InventoryService = {
  async getList(): Promise<Item[]> {
    const response = await axios.get<Item[]>(`${API_BASE_URL}/inventory`);
    return response.data;
  },

  async getInventoryItem(name: string): Promise<Item> {
    const response = await axios.get<Item>(`${API_BASE_URL}/inventory/${name}`);
    return response.data;
  },

  async updateInventoryItem(name: string, updatedItem: Partial<Item>): Promise<Item> {
    const response = await axios.put<Item>(`${API_BASE_URL}/inventory/${name}`, updatedItem);
    return response.data;
  },

  async deleteInventoryItem(name: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/inventory/${name}`);
  },

  async createInventoryItem(newItem: Item): Promise<Item> {
    const response = await axios.post<Item>(`${API_BASE_URL}/inventory`, newItem);
    return response.data;
  }  
};