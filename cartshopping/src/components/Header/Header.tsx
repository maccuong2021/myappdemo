import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import CartList from '../CartList/CartList'; // Adjust path as needed

export default function Header() {
  const cartItems = useCartStore((state) => state.cart);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const username = 'Cuong'; // You can replace this with dynamic logic

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            🧀 Inventory Shop
          </Typography>

          <Typography variant="body1" style={{ marginRight: '20px' }}>
            {username}
          </Typography>

          <IconButton color="inherit" onClick={() => setShowCart((prev) => !prev)}>
            <Badge badgeContent={totalQuantity} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {showCart && <CartList />}
    </>
  );
}