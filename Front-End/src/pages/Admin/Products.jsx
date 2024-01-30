import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "../../redux/loaderSlice";
import { Getproduct, UpdateProductStatus } from "../../apicalls/product";

function Products() {
  const dispatch = useDispatch();
  const [products, setproduct] = useState([]);

  const getdata = async () => {
    try {
      dispatch(setloading(true));
      const response = await Getproduct(null);
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

  const onstatusupdate = async (id,status) => {
    console.log("id",id);
    console.log("status",status);
    try {
      dispatch(setloading(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(setloading(false));
      if (response.success) {
        message.success(response.message);
        getdata();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title:"Product",
      dataIndex:"images",
      render:(text,record)=>{
        return <img src={record?.images?.length>0?record.images[0]:""} alt="" className="w-20 h-20 object-cover rounded"/>
      }
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
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
      render:(text,record)=>{
        return record.status.toUpperCase()
      }
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        
        return (
          <div className="flex gap-3">
            {status == "pending" && (
              <span
                className="cursor-pointer underline"
                onClick={() => onstatusupdate(_id, "approved")}
              >
                Approve
              </span>
            )}
            {status == "pending" && (
              <span
                className="cursor-pointer underline"
                onClick={() => onstatusupdate(_id, "rejected")}
              >
                Reject
              </span>
            )}
            {status == "approved" && (
              <span
                className="cursor-pointer underline"
                onClick={() => onstatusupdate(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status == "blocked" && (
              <span
                className="cursor-pointer underline"
                onClick={() => onstatusupdate(_id, "approved")}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={products} className="overflow-auto" />
    </div>
  );
}

export default Products;
