import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useCartStore } from '../../store/cartStore';
import './CartList.scss';
import { Link } from 'react-router-dom';

export default function CartList() {
  const cartItems = useCartStore((state) => state.cart);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-list">
      <Typography variant="h5">
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item.name} className="cart-card">
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>

                <TextField
                  label="Quantity"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={item.quantity}
                  onChange={(e) => {
                    const newQty = Math.max(1, parseInt(e.target.value) || 1);
                    updateItemQuantity(item.name, newQty);
                  }}
                  style={{ marginBottom: '8px' }}
                />

                <Typography>Unit Price: ${item.unitPrice}</Typography>
                <Typography>
                  Subtotal: ${(item.unitPrice * item.quantity).toFixed(2)}
                </Typography>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeItemFromCart(item.name)}
                  style={{ marginTop: '8px' }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h6" style={{ marginTop: '16px' }}>
            Total: ${getTotalPrice()}
          </Typography>

          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
              fullWidth
            >
              Proceed to Checkout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}