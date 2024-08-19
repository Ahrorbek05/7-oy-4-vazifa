import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex gap-16">
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
          <p className="text-2xl text-gray-700 mb-6">${(product.attributes.price) / 100}</p>
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
          <div className="flex items-center mb-6">
            <span className="mr-4">Amount:</span>
            <select className="border rounded p-2">
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
