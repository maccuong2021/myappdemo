import { Item, useCartStore } from '../Store/cartStore';
import './InventoryList.scss';
export default function InventoryList() {
    const { cart, addItemToCart, updateItemQuantity, removeItemFromCart } = useCartStore();

    // Example usage of the store methods
    const handleAddItem = (item: Item) => {
        addItemToCart(item);
    };

    const handleUpdateQuantity = (name: any, quantity: any) => {
        updateItemQuantity(name, quantity);
    };

    const handleRemoveItem = (name: any) => {
        removeItemFromCart(name);
    };

    return (
        <div className='inventory-list'>
            <h2>Inventory List</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.name}>
                        <span>{item.name} - ${item.unitPrice} x {item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}>+</button>
                        <button onClick={() => handleUpdateQuantity(item.name, item.quantity - 1)}>-</button>
                        <button onClick={() => handleRemoveItem(item.name)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleAddItem({ name: 'New Item', unitPrice: 10, quantity: 1 })}>Add New Item</button>
        </div>
    );
}