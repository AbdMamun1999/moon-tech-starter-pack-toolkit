import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { toggle, toggleBrands } from "../features/filter/filterSlice";
import { getProducts } from "../features/products/productsSlice";

const Home = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const activeClass = "text-white  bg-indigo-500 border-white";

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  }

  if (products.length && (filter.stock || filter.brands.length)) {
    content = products
      .filter((product) => {
        if (filter.stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (filter.brands.length) {
          return filter.brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => <ProductCard key={product._id} product={product} />);
  }

  return (
    <>
      <div className="max-w-7xl gap-14 mx-auto my-10">
        <div className="mb-10 flex justify-end gap-5">
          <button
            onClick={() => dispatch(toggle())}
            className={`border px-3 py-2 rounded-full font-semibold 
            ${filter.stock ? activeClass : null} `}
          >
            In Stock
          </button>
          <button
            onClick={() => dispatch(toggleBrands("amd"))}
            className={`border px-3 py-2 rounded-full font-semibold
             ${filter.brands.includes("amd") ? activeClass : null}
            `}
          >
            AMD
          </button>
          <button
            onClick={() => dispatch(toggleBrands("intel"))}
            className={`border px-3 py-2 rounded-full font-semibold
             ${filter.brands.includes("intel") ? activeClass : null}`}
          >
            Intel
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))} */}
          {content}
        </div>
      </div>
    </>
  );
};

export default Home;
