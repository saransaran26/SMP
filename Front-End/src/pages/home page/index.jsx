import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setloading } from "../../redux/loaderSlice";
import { Divider, message } from "antd";
import { Getproduct } from "../../apicalls/product";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import { IoFilter } from "react-icons/io5";

function Home() {
  const [showfilters, setshowfilters] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setproducts] = useState([]);
  const[change,setchange] = useState([])
  const [filters, setfilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });

  const getdata = async () => {
    console.log("filter", filters);
    try {
      dispatch(setloading(true));
      const response = await Getproduct(filters);
      dispatch(setloading(false));
      if (response.success) {
        setproducts(response.data);
        setchange(response.data)
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };

  const changed = (e) => {
    const searchQuery = e.target.value.toLowerCase();
  
    if (searchQuery.trim() === "") {
      
      setproducts(change);
    } else {
      
      const filteredProducts = change.filter((f) =>
        f.name.toLowerCase().includes(searchQuery)
      );
      setproducts(filteredProducts);
    }
  };
  

  useEffect(() => {
    getdata();
  }, [filters]);
  return (
    <div className="flex gap-5">
      {showfilters && (
        <Filters
          showfilters={showfilters}
          setshowfilters={setshowfilters}
          filters={filters}
          setFilters={setfilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showfilters && (
            <IoFilter
              className="cursor-pointer text-2xl"
              onClick={() => setshowfilters(!showfilters)}
            />
          )}

          <input
            type="text"
            placeholder="Search products here.."
            className="border border-gray-300 border-solid w-full p-2 h-14"
            onChange={changed}
          />
        </div>
        <div
          // className={`grid mt-3 gap-2 ${
          //   showfilters ? "grid-cols-4" : "grid-cols-5"
          // }`}
          className="flex-wrap gap-7 items-center justify-center flex md:justify-start md:items-start"
        >
          {products?.map((product) => {
            return (
              <div
                className="border border-gray-300 border-solid w-[260px] h-[260px] rounded pb-2 gap-5 cursor-pointer "
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-full h-40 object-cover"
                />

                <div className="px-2 flex flex-col gap-1">
                  <h1 className="font-semibold text-lg">{product.name}</h1>
                  <p className="text-sm">{product.age} {product.age===1?"Year":"Years"} old</p>
                  <div className="h-[1px] bg-gray-300 w-full my-1"></div>
                  <span className="text-xl font-semibold text-green-700">
                    $ {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
