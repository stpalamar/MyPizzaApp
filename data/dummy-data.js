const image = require('../assets/pizza.png');

export const PIZZAS = [
  {
    id: '1',
    name: 'Pizza Margherita',
    price: 5.99,
    ingredients: ['Tomato', 'Mozzarella', 'Basil'],
    imageUrl: image,
  },
  {
    id: '2',
    name: 'Pizza Marinara',
    price: 6.99,
    ingredients: ['Tomato', 'Garlic', 'Olive Oil', 'Basil'],
    imageUrl: image,
  },
  {
    id: '3',
    name: 'Pizza Prosciutto',
    price: 7.99,
    ingredients: ['Tomato', 'Mozzarella', 'Prosciutto', 'Arugula'],
    imageUrl: image,
  },
  {
    id: '4',
    name: 'Pizza Quattro Stagioni',
    price: 8.99,
    ingredients: [
      'Tomato',
      'Mozzarella',
      'Mushrooms',
      'Artichokes',
      'Olives',
      'Prosciutto',
    ],
    imageUrl: image,
  },
  {
    id: '5',
    name: 'Pizza Capricciosa',
    price: 9.99,
    ingredients: [
      'Tomato',
      'Mozzarella',
      'Mushrooms',
      'Artichokes',
      'Prosciutto',
    ],
    imageUrl: image,
  },
  {
    id: '6',
    name: 'Pizza Funghi',
    price: 10.99,
    ingredients: ['Tomato', 'Mozzarella', 'Mushrooms'],
    imageUrl: image,
  },
];
