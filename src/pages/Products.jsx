import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Products({ onFilterChange }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [company, setCompany] = useState('');
  const [sort, setSort] = useState('');
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch('https://strapi-store-server.onrender.com/api/products');
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  function handleSearch() {
    onFilterChange({ search, category, company, sort, price });
  }

  function handleReset() {
    setSearch('');
    setCategory('all');
    setCompany('');
    setSort('');
    setPrice(0);
    onFilterChange({ search: '', category: 'all', company: '', sort: '', price: 0 });
  }

  const handleClickCard = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div>
      <div className="w-[1090px] h-[220px] bg-[#F0F6FF] p-6 rounded-lg mx-auto my-20">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="flex gap-5">
            <label className="input input-bordered input-sm flex items-center gap-2 w-[235px] mt-7">
              <input 
                type="text" 
                className="grow" 
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
              />
            </label>

            <span>
              <p className="text-sm text-gray-600 font-normal mb-2">Select Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered select-sm w-[250px]"
              >
                <option value="all">all</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </span>

            <span>
              <p className="text-sm text-gray-600 font-normal mb-2">Select Company</p>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="select select-bordered select-sm w-[250px]"
              >
                <option value="">all</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </span>

            <span>
              <p className="text-sm text-gray-600 font-normal mb-2">Sort By</p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="select select-bordered select-sm w-[250px]"
              >
                <option value="az">a-z</option>
                <option value="za">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </span>
          </div>
          <div className="mt-6">
            <div className="flex flex-col gap-2 p-2 rounded-lg">
              <span className='flex'>
                <p className=" text-[15px] font-normal">Select Price</p>
                <span className="ml-[120px] font-normal text-sm">${price}.00</span>
              </span>
              <input 
                onChange={(e) => setPrice(e.target.value)} 
                type="range" 
                min={0} 
                max={1000} 
                value={price}
                className="range range-info w-64" 
              />
              <div className="flex text-xs text-gray-500">
                <span>0</span>
                <span className="ml-[165px]">Max : $1,000.00</span>
              </div>
            </div>
            <div className="flex items-center gap-5 relative top-[-65px] left-[345px]">
              <label className="flex items-center gap-2">
                Free Shipping
                <input type="checkbox" defaultChecked className="checkbox ml-[-60px] mb-[-50px] w-[18px] h-[18px]" />
              </label>
              <button
                onClick={handleSearch}
                className="w-[250px] ml-24 bg-[#007bff] text-gray-200 font-bold py-2 rounded-lg"
              >
                SEARCH
              </button>
              <button
                onClick={handleReset}
                className="w-[250px] bg-[#d63384] text-gray-200 font-bold py-2 rounded-lg"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mb-32">
        <div className="flex flex-wrap ml-12 gap-10">
          {products.map(product => (
            <div onClick={() => handleClickCard(product.id)} key={product.id} className="card cursor-pointer p-4 w-[341px] bg-base-100 shadow-xl">
              <figure>
                <img src={product.attributes.image} alt={product.attributes.title} className="w-full rounded-b-xl h-48 object-cover"/>
              </figure>
              <div className="card-body">
                <h2 className="card-title capitalize tracking-wider justify-center">{product.attributes.title}</h2>
                <p className='text-primary text-center'>${product.attributes.price / 100}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
