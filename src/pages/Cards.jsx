import React, { useEffect, useState } from 'react';

function Cards({ filters }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://strapi-store-server.onrender.com/api/products`);
        const result = await response.json();
        let filteredProducts = result.data;

        if (filters.search) {
          filteredProducts = filteredProducts.filter((product) =>
            product.attributes.title.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        if (filters.category && filters.category !== 'all') {
          filteredProducts = filteredProducts.filter((product) =>
            product.attributes.category === filters.category
          );
        }

        if (filters.company) {
          filteredProducts = filteredProducts.filter((product) =>
            product.attributes.company === filters.company
          );
        }

        filteredProducts = filteredProducts.filter((product) =>
          product.attributes.price / 100 <= filters.price
        );

        if (filters.sort) {
          filteredProducts.sort((a, b) => {
            switch (filters.sort) {
              case 'az':
                return a.attributes.title.localeCompare(b.attributes.title);
              case 'za':
                return b.attributes.title.localeCompare(a.attributes.title);
              case 'high':
                return b.attributes.price - a.attributes.price;
              case 'low':
                return a.attributes.price - b.attributes.price;
              default:
                return 0;
            }
          });
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.attributes.title}</h3>
            <p className="text-gray-600 font-medium">
              ${(product.attributes.price / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
