import React, { useState } from "react";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setResponse("Please select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", Number(product.price)); // ensure number
      formData.append("description", product.description);
      formData.append("image", file);

      const res = await fetch("http://localhost:3000/upload", { // match backend port
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.message || "Product uploaded successfully!");
        setProduct({ name: "", price: "", description: "" });
        setFile(null);
        setPreview(null);
      } else {
        setResponse(data.error || "Failed to upload product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      setResponse("Error uploading product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Product Upload</h1>

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
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {preview && (
          <img
            src={preview}
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

      {response && <h2 className="mt-4 text-green-600">{response}</h2>}
    </div>
  );
}

export default Admin;