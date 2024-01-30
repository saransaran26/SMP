import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setloading } from "../../redux/loaderSlice";
import { Getproduct, UpdateProductStatus } from "../../apicalls/product";
import { GetAllUser, UpdateUserStatus } from "../../apicalls/user";

function User() {
  const dispatch = useDispatch();
  const[users,setusers] = useState([])

  const getdata = async () => {
    try {
      dispatch(setloading(true));
      const response = await GetAllUser();
      dispatch(setloading(false));
      if (response.success) {
        
        setusers(response.data);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };

  const onstatusupdate = async (id,status) => {
    
    try {
      dispatch(setloading(true));
      const response = await UpdateUserStatus(id, status);
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
      title: "Name",
      dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
      },
    
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
        title:"Status",
        dataIndex:"status",
        render:(text,record)=>{
            return record.status.toUpperCase()
        }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        
        return (
          <div className="flex gap-3">
            {status == "active" && (
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
                onClick={() => onstatusupdate(_id, "active")}
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
      <Table columns={columns} dataSource={users} className="overflow-auto" />
    </div>
  );
}

export default User;
