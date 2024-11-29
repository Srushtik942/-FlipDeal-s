const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Add an Item to the Cart
function addNewItem(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });

  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addNewItem(cart, productId, name, price, quantity);
  res.json(result);
});

// Edit Quantity of an Item in the Cart

function updateItemCart(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateItemCart(cart, productId, quantity);
  res.json(result);
});

// Delete an Item from the Cart

function deleteItem(cart, productId) {
  return cart.filter((product) => product.productId !== productId);
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = deleteItem(cart, productId);
  cart = result;
  res.json(result);
});

// Read Items in the Cart

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Calculate Total Quantity of Items in the Cart

function totalQuantity(cart) {
  let quantity = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].quantity !== 0) {
      quantity = quantity + cart[i].quantity;
    }
  }
  return quantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = totalQuantity(cart);
  res.json({ result });
});

// Calculate Total Price of Items in the Cart

function addTotalPrice(cart) {
  let totalprice = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].quantity !== 0) {
      totalprice = totalprice + cart[i].quantity * cart[i].price;
    }
  }
  return totalprice;
}

app.get('/cart/total-price', (req, res) => {
  let totalPrice = addTotalPrice(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
