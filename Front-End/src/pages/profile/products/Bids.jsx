import React, { useEffect, useState } from 'react'
import { Modal, Table, message } from 'antd'
import { useDispatch } from 'react-redux'
import { setloading } from '../../../redux/loaderSlice'
import { GetAllBids } from '../../../apicalls/product'
import moment from 'moment'
import Divider from '../../../components/Divider'

function Bids({
    showbids,setshowbids,selectedproduct
}) {

    const dispatch = useDispatch()
    const[bids,setbids] = useState([])
    const getdata = async()=>{
        try {
            dispatch(setloading(true))
            const response = await GetAllBids({
                product:selectedproduct._id
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
          title: "Bid Placed On",
          dataIndex: "createdAt",
          render: (text, record) => {
            return moment(text).format("DD-MM-YYYY hh:mm a");
          }
        },
        {
          title: "Name",
          dataIndex: "name",
          render: (text, record) => {
            return record.buyer.name;
          },
        },
        {
          title: "Bid Amount",
          dataIndex: "bidAmount",
        },
        
        {
          title: "Message",
          dataIndex: "message",
        },
        
        {
          title: "Contact Details",
          dataIndex: "contactDetails",
          render: (text, record) => {
            return (
              <div>
                <p>Phone: {record.mobile}</p>
                <p>Email: {record.buyer.email}</p>
              </div>
            );
          },
        },
      ];
    useEffect(()=>{
        if(selectedproduct){
            getdata()
        }
    },[selectedproduct])
  return (
    <Modal
    open={showbids}
    onCancel={()=>setshowbids(false)}
    centered
    footer={null}
    width={800}
    >
        <div className="flex gap-3 flex-col">
        <h1 className=" text-primary">Bids</h1>
        <Divider />
        <h1 className="text-xl text-gray-500">
          Product Name: {selectedproduct.name}
        </h1>

        <Table columns={columns} dataSource={bids} className='overflow-auto'/>
      </div>
    </Modal>
  )
}

export default Bids