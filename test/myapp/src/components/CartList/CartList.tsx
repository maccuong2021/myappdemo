import { useCartStore } from "../Store/cartStore";
import './CartList.css';
export default function CartList() {
    const { cart, updateItemQuantity, removeItemFromCart } = useCartStore();

    const handleUpdateQuantity = (name: string, quantity: number) => {
        updateItemQuantity(name, quantity);
    };

    const handleRemoveItem = (name: string) => {
        removeItemFromCart(name);
    };

    return (
        <div>
            <h1>Cart List</h1>
            <ul>
                {cart.map((item) => (
                    <li key={item.name}>
                        {item.name} - ${item.unitPrice} x {item.quantity}
                        <button onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}>+</button>
                        <button onClick={() => handleUpdateQuantity(item.name, item.quantity - 1)}>-</button>
                        <button onClick={() => handleRemoveItem(item.name)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}