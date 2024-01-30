import { axiosinstance } from "./axiosinstance"


export const Addnotification = async(payload)=>{
    try {
        const response = await axiosinstance.post('http://localhost:3000/api/notify/notify',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const Getnotification = async()=>{
    try {
        const response = await axiosinstance.get('http://localhost:3000/api/notify/get-all-notify')
        return response.data
    } catch (error) {
        return error.message
    }
}

export const Deletenotify = async(id)=>{
    try {
        const response = await axiosinstance.delete(`http://localhost:3000/api/notify/delete-notify/${id}`)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const readednotify = async()=>{
    try {
        const response = await axiosinstance.put('http://localhost:3000/api/notify/read-notify')
        return response.data
    } catch (error) {
        return error.message
    }
}