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
      <div className="breadcrumbs text-sm">
        <ul>
          <li><a>Home</a></li>
          <li><a>Documents</a></li>
        </ul>
      </div>
      <div className="flex gap-10">
        <div className="w-1/3">
          <img
            src={product.attributes.image}
            alt={product.attributes.title}
            className=" ml-32 w-96 rounded-lg"
          />
        </div>
        <div className="w-1/3 ml-32">
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
          <div>
            <h4 class="text-md font-medium -tracking-wider capitalize mb-4">amount</h4>
            <select className="select select-primary w-full max-w-xs mb-12">
              <option disabled selected>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <button
            className="btn bg-blue-700 text-white"
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
