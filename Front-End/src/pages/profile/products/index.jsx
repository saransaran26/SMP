import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import Productfrom from "./Productfrom";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "../../../redux/loaderSlice";
import { Getproduct, deleteProduct } from "../../../apicalls/product";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Bids from "./Bids";

function Products() {
  const[showBids,setshowbids] = useState(false)
  const[selectedproduct,setselectedproduct] = useState(null)
  const [showproductform, setshowproductform] = useState(false);
  const dispatch = useDispatch();
  const [products, setproduct] = useState([]);
  const {user} = useSelector((state)=>state.users)
  const deleteproduct = async(id) => {
    try {
      dispatch(setloading(true))
      const response = await deleteProduct(id)
      dispatch(setloading(false))
      if(response.success){
        message.success(response.message)
        getdata()
      }
    } catch (error) {
      dispatch(setloading(false))
      message.error(error.message)
    }
  }

  const columns = [
    {
      title:"Product",
      dataIndex:"images",
      render:(text,record)=>{
        return <img src={record?.images?.length>0?record.images[0]:""} alt="" className="w-20 h-20 object-cover rounded"/>
      }
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title:"Added on",
      dataIndex:"createdAt",
      render:(text,record)=>moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <MdDelete className="text-2xl cursor-pointer" onClick={()=> deleteproduct(record._id)}/>
            <MdEdit className="text-2xl cursor-pointer" onClick={()=>{
              setselectedproduct(record)
              setshowproductform(true)
            }}/>

            <span className="underline cursor-pointer"
            onClick={()=>{
              setshowbids(true)
              setselectedproduct(record)
            }}
              >
              Show Bids
            </span>
          </div>
        );
      },
    },
  ];
  const getdata = async () => {
    try {
      dispatch(setloading(true));
      const response = await Getproduct({
        seller:user._id
      });
      dispatch(setloading(false));
      if (response.success) {
        console.log("all products", response.data);
        setproduct(response.data);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-3">
        <Button type="default" onClick={() => {
          setselectedproduct(null)
          setshowproductform(true)
        }}>
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} className="overflow-x-auto"/>
      {showproductform && (
        <Productfrom
          showproductform={showproductform}
          setshowproductform={setshowproductform}
          selectedproduct={selectedproduct}
          getdata={getdata}
        />
      )}
      {showBids && <Bids setshowbids={setshowbids} showbids={showBids} selectedproduct={selectedproduct} />}
    </div>
  );
}

export default Products;
