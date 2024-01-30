import { Tabs } from 'antd'
import React from 'react'
import Products from './products'
import UserBids from './products/userbids'
import { useSelector } from 'react-redux'
import moment from 'moment'

function Profile() {
    const {user} = useSelector((state)=>state.users)
  return (
    <div>
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab='Product' key='1'>
                <Products/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='My Bids' key='2'>
               <UserBids/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='General' key='3'>
                <div className="flex flex-col md:w-1/3 w-[320px]">
                    <span className='flex justify-between text-xl mt-2'>
                        Name : <span className='text-xl'>{user.name}</span>
                    </span>
                    <span className='flex justify-between text-xl mt-2'>
                        Email : <span className='text-xl'>{user.email}</span>
                    </span>
                    <span className='flex justify-between text-xl mt-2'>
                        CreatedAt : <span className='text-xl'>{moment(user.createdAt).format("MMM D , YYYY")}</span>
                    </span>
                </div>
            </Tabs.TabPane>
        </Tabs>
    </div>
  )
}

export default Profile