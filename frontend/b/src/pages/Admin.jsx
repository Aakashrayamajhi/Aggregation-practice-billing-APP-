import React, { useState } from "react";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    alert("Product added!");
    // Reset form if needed
    setProduct({
      name: "",
      price: "",
      description: "",
      imageUrl: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Admin Product Upload
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="border border-gray-300 p-2 rounded h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="url"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt="Product Preview"
            className="w-full h-48 object-cover rounded mt-2"
          />
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default Admin;