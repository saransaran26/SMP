import React from "react";
import { MdCancel } from "react-icons/md";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
];

const ages = [
  {
    name: "0-2 years old",
    value: "0-2",
  },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-8 years old",
    value: "6-8",
  },
  {
    name: "9-12 years old",
    value: "9-12",
  },
  {
    name: "13+ years old",
    value: "12-20",
  },
];
function Filters({ showfilters, setshowfilters,filters,setFilters }) {
  return (
    <div className="w-72 ">
      <div className="flex justify-between">
        <h1 className="text-xl text-orange-900">Filter</h1>
        <MdCancel
          className="text-2xl cursor-pointer bg-white"
          onClick={() => setshowfilters(!showfilters)}
        />
      </div>
      <div className="flex flex-col mt-5 gap-1">
        <h1>Categories</h1>
        <div className="flex flex-col">
          {categories.map((category) => {
            return (
              <div className="flex items-center">
                <input type="checkbox" style={{ width: "20px" }} 
                name="category"
                checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                  className="cursor-pointer"
                />
                <label className="ml-2">{category.name}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col mt-5 gap-1">
        <h1>Ages</h1>
        <div className="flex flex-col">
          {ages.map((age) => {
            return (
              <div className="flex items-center">
                <input type="checkbox" style={{ width: "20px" }} 
                name="age"
                checked={filters.age.includes(age.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      age: [...filters.age, age.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      age: filters.age.filter((item) => item !== age.value),
                    });
                  }
                }}
                className="cursor-pointer"
                />
                <label className="ml-2">{age.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
