import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/user";
import { useDispatch } from "react-redux";
import { setloading } from "../../redux/loaderSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];
function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onfinish = async(value) => {
    dispatch(setloading(true))
    console.log("success", value);
    try {
      const response = await LoginUser(value)
      dispatch(setloading(false))
      if(response.success){
        message.success(response.message)
        localStorage.setItem("token",response.data)
        window.location.href = '/'
        //navigate('/')
      }
      else{
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(setloading(false))
      message.error(error.message)
    }
   
  };
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate('/')
    }
  },[])
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white w-[400px] p-5 rounded-md">
        <h1 className="text-primary text-2xl">
          SMP - <span className="text-gray-400 text-2xl">Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onfinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
