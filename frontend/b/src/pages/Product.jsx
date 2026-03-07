import React, { useState , useEffect} from "react";


function Product() {

  const [product , setproduct] = useState([])

  useEffect(()=>{

    fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => setproduct(data))
    .catch(err => console.log(err))

  },[])


  const [cart, setCart] = useState([]);

const handlebuy = async () => {
  try {
    const transactionId = Date.now().toString(); // one ID for all items

    const res = await fetch("http://localhost:3000/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, transactionId }) // send all items
    });

    if (!res.ok) throw new Error("Purchase failed");

    const data = await res.json();
    alert(`Purchase successful! Total: $${data.total}`);
    setCart([]); // clear cart
  } catch (err) {
    console.log(err);
    alert("Something went wrong. Please try again.");
  }
};

  const handleBuy = (product) => {

    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Products
      </h1>

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
       <div class="flex justify-end mt-5">
  <button onClick={handlebuy} class="bg-red-500 text-white font-bold py-1 px-5 rounded-lg shadow-lg hover:bg-red-600 transform hover:scale-105 transition duration-200">
    Buy
  </button>
</div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {product.map((data) => (
          <div
            key={data.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
          >
            <img
              src={data.imageUrl}
              alt={data.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
                <p className="text-gray-600 mb-2">{data.description}</p>
                <p className="text-indigo-600 font-bold text-lg">${data.price}</p>
              </div>
              <button
                onClick={() => handleBuy(data)}
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
