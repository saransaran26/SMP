import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import Products from './Products'
import User from './User'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Admin() {
    const navigate = useNavigate()
    const{user} = useSelector((state)=>state.users)
    useEffect(()=>{
        if(user.role != 'admin'){
            navigate('/')
        }
    },[])
  return (
    <div>
        <Tabs>
            <Tabs.TabPane tab='Products' key='1'>
                <Products/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='User' key='2'>
                <User/>
            </Tabs.TabPane>
        </Tabs>
    </div>
  )
}

export default Admin