import React, { useState } from "react";

function Product() {
  // Product list
  const products = [
    {
      id: 1,
      name: "iPhone 14",
      price: 999,
      description: "Latest Apple iPhone with A15 chip",
      image:
        "data:image/webp;base64,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",
    },
    {
      id: 2,
      name: "MacBook Pro",
      price: 1999,
      description: "Apple MacBook Pro 14-inch with M1 Pro",
      image:
        "https://images.unsplash.com/photo-1611078484285-df08163ff507?auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: 249,
      description: "Noise cancelling wireless earbuds",
      image:
        "https://images.unsplash.com/photo-1616627980960-2d2a7d25f7a4?auto=format&fit=crop&w=500&q=60",
    },
  ];

  // Cart state
  const [cart, setCart] = useState([]);

  const handleBuy = (product) => {
    // Add product to cart
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Products
      </h1>

      {/* Cart section */}
      <div className="max-w-6xl mx-auto mb-8 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No products in cart.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-bold text-indigo-600">${item.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Product grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-indigo-600 font-bold text-lg">${product.price}</p>
              </div>
              <button
                onClick={() => handleBuy(product)}
                className="mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
