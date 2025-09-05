import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import './InventoryList.scss';

const inventory = [
  { name: 'bacon', unitPrice: 10.99, quantity: 10 },
  { name: 'eggs', unitPrice: 3.99, quantity: 10 },
  { name: 'cheese', unitPrice: 6.99, quantity: 10 },
  { name: 'chives', unitPrice: 1.0, quantity: 10 },
  { name: 'wine', unitPrice: 11.99, quantity: 10 },
  { name: 'brandy', unitPrice: 17.55, quantity: 10 },
  { name: 'bananas', unitPrice: 0.69, quantity: 10 },
  { name: 'ham', unitPrice: 2.69, quantity: 10 },
  { name: 'tomatoes', unitPrice: 3.26, quantity: 10 },
  { name: 'tissue', unitPrice: 8.45, quantity: 10 },
];

export default function InventoryCart() {
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (name: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (item: typeof inventory[0]) => {
    const quantity = quantities[item.name] || 1;
    addItemToCart({ ...item, quantity });
  };

  return (
    <div className="inventory-cart">
      {inventory.map((item) => (
        <Card key={item.name} className="inventory-card">
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography>Price: ${item.unitPrice}</Typography>
            <TextField
              type="number"
              label="Quantity"
              value={quantities[item.name] || 1}
              onChange={(e) =>
                handleQuantityChange(item.name, parseInt(e.target.value))
              }
              inputProps={{ min: 1 }}
              size="small"
              style={{ marginTop: '8px', marginBottom: '8px' }}
            />
            <Button
              variant="contained"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}