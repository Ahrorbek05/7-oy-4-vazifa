import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../components/CartContext";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.attributes.title,
      price: product.attributes.price,
      image: product.attributes.image,
      company: product.attributes.company,
      colors: product.attributes.colors,
      amount: 1,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex gap-20">
        <div className="w-1/2">
          <img
            src={product.attributes.image}
            alt={product.attributes.title}
            className="rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-4xl font-bold mb-4">{product.attributes.title}</h2>
          <p className="text-gray-500 text-lg mb-2">{product.attributes.company}</p>
          <p className="text-2xl text-gray-700 mb-6">
            ${(product.attributes.price / 100).toFixed(2)}
          </p>
          <p className="text-gray-700 mb-4">{product.attributes.description}</p>
          <div className="flex items-center mb-6">
            <span className="mr-4">Colors:</span>
            <div className="flex gap-4">
              {product.attributes.colors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="w-6 h-6 rounded-full"
                ></div>
              ))}
            </div>
          </div>
          <button
            className="bg-blue-700 text-white px-8 py-2 rounded"
            onClick={handleAddToCart}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details;
