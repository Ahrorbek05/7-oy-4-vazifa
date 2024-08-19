import { useEffect, useState } from "react";
import React  from "react";
import { Link } from "react-router-dom";
function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://strapi-store-server.onrender.com/api/products?featured=true")
        .then(res => res.json())
        .then(data => setData(data.data))
    }, [])
  return (
    <div>
      <div className="container px-8 py-20 mx-auto max-w-6xl flex justify-between">
        <div className="max-w-lg flex flex-wrap  items-center">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl text-slate-700 mt-5">
            We are changing the way people shop
          </h1>
          <p className="mt- -5 max-w-xl text-lg leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis
          </p>
          <Link to="/products" className="text-white btn btn-info">OUR PRODUCTS</Link>
        </div>
        <div style={{width: "496px", height: "448px"}} className="carousel carousel-center bg-neutral rounded-box  space-x-4 p-4">
          <div className="carousel-item">
            <img  width={320} height={416}
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img width={320} height={416}
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img width={320} height={416}
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp"
              className="rounded-box"
            />
          </div> 
          <div className="carousel-item">
            <img width={320} height={416}
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp"
              className="rounded-box"
            />
          </div>
        </div>
      </div>
      <div className="featuredproducts">
        <h2 class="max-w-6xl mx-auto text-3xl font-medium tracking-wider capitalize pb-5">featured products</h2>
        <div className="wrapper flex max-w-6xl mx-auto justify-between border-t-2 pt-10 mb-10">
        {
        data.length > 0 && data.map((el,index)=>{
            console.log(el.attributes.image);
            return(
                <a style={{width: "352px", height: "332px"}} className=" shadow-xl hover:shadow-2xl transition duration-300 p-4  rounded-2xl" href={`/products/${el.id}`} key={index}>
                    <div className="text-center">
                    <div style={{ maxHeight: "192px",maxWidth: "320px"}} className=""><img className="w-80 h-52 rounded-xl" src={el.attributes.image} alt="" /></div>
                    <div className="flex flex-col gap-2">
                        <h3 class="pt-9 capitalize tracking-wider text-center">{el.attributes.title}</h3>
                        <p>${(el.attributes.price)/100}</p>
                    </div>
                    </div>
                </a>
            )
        }) 
        }
        </div>
      </div>
    </div>
  );
}

export default Home;
