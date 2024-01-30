import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "../../redux/loaderSlice";
import { PlaceNewBid } from "../../apicalls/product";
import { Addnotification } from "../../apicalls/notification";

function BidModel({ reloaddata, showbidmodel, setshowbitmodel, product }) {
    const formref = useRef(null)
    const rules=[{
        required:true,
        message:'required'
    }]
    const{user} = useSelector((state)=>state.users)
    const dispatch = useDispatch()
    const onfinish = async(value) => {
        try {
            dispatch(setloading(true))
            const response = await PlaceNewBid({
                ...value,
                product:product._id,
                seller:product.seller._id,
                buyer:user._id
            })
            dispatch(setloading(false))
            if(response.success){
                message.success(response.message)
                await Addnotification({
                  title:'A new Bid has been placed',
                  message:`A new bid has been placed on your product ${product.name} by ${user.name} for $${value.bidAmount}`,
                  user:product.seller._id,
                  onClick:'/profile',
                  read:false
                })
                reloaddata()
                setshowbitmodel(false)
            }
            else{
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setloading(false))
            message.error(error.message)
        }
    }
  return (
    <Modal onCancel={() => setshowbitmodel(false)} open={showbidmodel} centered width={600} onOk={()=>formref.current.submit()}>
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          New Bid
        </h1>
        <Form layout="vertical" ref={formref} onFinish={onfinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BidModel;
