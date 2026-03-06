import React, { useState } from "react";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    alert("Product added!");
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
          placeholder="Product Name"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border border-gray-300 p-2 rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
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