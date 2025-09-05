import { useCartStore } from "../Store/cartStore";

export default function Header() {
    const { cart } = useCartStore();

    return (
        <header>
            <h1>Shopping Cart</h1>
            <div>
                <span>Items in Cart: {cart.length}</span>
            </div>
        </header>
    );
}