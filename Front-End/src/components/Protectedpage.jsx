import React, { useEffect, useState } from "react";
import { GetcurrentUser } from "../apicalls/user";
import { Avatar, Badge, message } from "antd";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../redux/userSlice";
import { setloading } from "../redux/loaderSlice";
import { IoMdNotifications } from "react-icons/io";
import Notification from "./Notification";
import { Getnotification, readednotify } from "../apicalls/notification";

function Protectedpage({ children }) {
  const [notification, setnotification] = useState([]);
  const [shownotification, setshownotification] = useState(false);
  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateToken = async () => {
    dispatch(setloading(true));
    try {
      const response = await GetcurrentUser();
      dispatch(setloading(false));

      if (response.success) {
        dispatch(setuser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setloading(false));
      navigate("/login");
      message.error(error.message);
    }
  };
  const getnotification = async()=>{
    try {
        dispatch(setloading(true))
        const response = await Getnotification()
        dispatch(setloading(false))
        if(response.success){
            setnotification(response.data)
        }
        else{
            throw new Error(response.message)
        }
    } catch (error) {
        dispatch(setloading(false))
        message.error(error.message);
    }
  }
  const readnotification = async() => {
    try {
        const response = await readednotify()
        dispatch(setloading(false))
        if(response.success){
            getnotification()
        }
        else{
            throw new Error(response.message)
        }
    } catch (error) {
        dispatch(setloading(false))
        message.error(error.message)
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getnotification()
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        <div className="px-16 flex justify-between items-center bg-primary p-4">
          <h1
            className="text-white text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            SMP
          </h1>
          <div className="bg-white py-2 px-5 rounded flex items-center gap-1">
            {/* <FaRegUser className='mr-2'/> */}
            <span
              className="underline uppercase cursor-pointer"
              onClick={() => {
                if (user.role == "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <Badge count={ notification?.filter((notify)=>!notify.read).length}
            
            >
              <Avatar
                shape="circle"
                className="bg-white flex items-center"
                
                icon={
                  <IoMdNotifications className="text-black text-2xl ml-2 cursor-pointer" onClick={()=>{
                    readnotification()
                    setshownotification(true)}
                  } />
                }
              />
            </Badge>
            <MdOutlineLogout
              className="ml-10 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            />
          </div>
        </div>

        {/* body */}
        <div className="p-5">{children}</div>

        { <Notification getdata={getnotification} shownotification={shownotification} 
        setshownotification={setshownotification}
        notification={notification}
        />}
      </div>
    )
  );
}

export default Protectedpage;
