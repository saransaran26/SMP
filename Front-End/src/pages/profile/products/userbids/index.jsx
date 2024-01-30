import React, { useEffect, useState } from 'react'
import { Modal, Table, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'
import { GetAllBids } from '../../../../apicalls/product'
import { setloading } from '../../../../redux/loaderSlice'


function UserBids({
    showbids,setshowbids,selectedproduct
}) {
    const {user} = useSelector((state)=>state.users)
    const dispatch = useDispatch()
    const[bids,setbids] = useState([])
    const getdata = async()=>{
        try {
            dispatch(setloading(true))
            const response = await GetAllBids({
                buyer:user._id
            })
            dispatch(setloading(false))
            if(response.success){
                setbids(response.data)
            }
            else{
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setloading(false))
            message.error(error.message)
        }
    }
    const columns = [
        {
            title:"Product",
            dataIndex:"product",
            render:(text,record)=>{
                return record.product.name
            }
        },
        {
          title: "Bid Placed On",
          dataIndex: "createdAt",
          render: (text, record) => {
            return moment(text).format("DD-MM-YYYY hh:mm a");
          }
        },
        {
            title:"Seller",
            dataIndex:"seller",
            render:(text,record)=>{
                return record.seller.name
            }
        },
        {
            title:"Offered Price",
            dataIndex:"offeredprice",
            render:(text,record)=>{
                return record.product.price
            }
        },
        
        {
          title: "Bid Amount",
          dataIndex: "bidAmount",
        },
       
        {
          title: "Message",
          dataIndex: "message",
        },
        
       
      ];
    useEffect(()=>{
        
            getdata()
        
    },[])
  return (
   
        <div className="flex gap-3 flex-col">
       
       

        <Table columns={columns} dataSource={bids} className='overflow-auto'/>
      </div>
   
  )
}

export default UserBids