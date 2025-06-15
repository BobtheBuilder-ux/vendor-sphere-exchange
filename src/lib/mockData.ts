
export const mockCategories = [
  { id: '1', name: 'Electronics', description: 'Latest gadgets and electronic devices' },
  { id: '2', name: 'Fashion', description: 'Trendy clothing and accessories' },
  { id: '3', name: 'Home & Garden', description: 'Home improvement and garden supplies' },
  { id: '4', name: 'Health & Beauty', description: 'Personal care and wellness products' },
  { id: '5', name: 'Sports & Outdoors', description: 'Athletic and outdoor equipment' }
];

export const mockVendors = [
  { id: '1', name: 'TechGear Pro', rating: 4.8, reviews: 2100 },
  { id: '2', name: 'Fashion Hub', rating: 4.9, reviews: 1800 },
  { id: '3', name: 'Home Essentials', rating: 4.7, reviews: 950 },
  { id: '4', name: 'Beauty World', rating: 4.6, reviews: 1200 },
  { id: '5', name: 'Sports Zone', rating: 4.8, reviews: 850 }
];

export const mockProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: '/placeholder.svg',
    vendorId: '1',
    categoryId: '1',
    rating: 4.5,
    reviews: 234
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Advanced fitness tracking with heart rate monitoring',
    image: '/placeholder.svg',
    vendorId: '1',
    categoryId: '5',
    rating: 4.7,
    reviews: 156
  },
  {
    id: '3',
    name: 'Organic Coffee Beans',
    price: 24.99,
    description: 'Premium organic coffee beans from sustainable farms',
    image: '/placeholder.svg',
    vendorId: '3',
    categoryId: '3',
    rating: 4.6,
    reviews: 89
  },
  {
    id: '4',
    name: 'Designer Sunglasses',
    price: 149.99,
    description: 'Stylish designer sunglasses with UV protection',
    image: '/placeholder.svg',
    vendorId: '2',
    categoryId: '2',
    rating: 4.8,
    reviews: 267
  },
  {
    id: '5',
    name: 'Moisturizing Face Cream',
    price: 34.99,
    description: 'Hydrating face cream with natural ingredients',
    image: '/placeholder.svg',
    vendorId: '4',
    categoryId: '4',
    rating: 4.4,
    reviews: 178
  }
];

export const generateMoreProducts = (count: number = 50) => {
  const productNames = [
    'Wireless Earbuds', 'Smart Home Speaker', 'Laptop Stand', 'Gaming Mouse',
    'Mechanical Keyboard', 'Monitor Stand', 'Desk Organizer', 'Plant Pot',
    'Ceramic Mug', 'Throw Pillow', 'Wall Art Print', 'Essential Oil Diffuser',
    'Travel Backpack', 'Phone Case', 'Tablet Stand', 'USB Hub',
    'Portable Battery', 'Car Phone Mount', 'Running Shoes', 'Yoga Mat'
  ];

  const descriptions = [
    'High-quality product with excellent durability',
    'Premium design meets functionality',
    'Perfect for daily use with great value',
    'Innovative solution that exceeds expectations',
    'Carefully crafted with attention to detail'
  ];

  const products = [...mockProducts];
  
  for (let i = 0; i < count - 5; i++) {
    const productIndex = i % productNames.length;
    const product = {
      id: String(i + 6),
      name: productNames[productIndex] + (i >= productNames.length ? ` ${Math.floor(i / productNames.length) + 1}` : ''),
      price: Math.floor(Math.random() * 200) + 10,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      image: '/placeholder.svg',
      vendorId: mockVendors[Math.floor(Math.random() * mockVendors.length)].id,
      categoryId: mockCategories[Math.floor(Math.random() * mockCategories.length)].id,
      rating: 3.5 + Math.random() * 1.5,
      reviews: Math.floor(Math.random() * 200) + 5
    };
    products.push(product);
  }
  
  return products;
};
