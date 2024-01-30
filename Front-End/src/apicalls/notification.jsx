import { axiosinstance } from "./axiosinstance"


export const Addnotification = async(payload)=>{
    try {
        const response = await axiosinstance.post('https://smp-2a89.onrender.com/api/notify/notify',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const Getnotification = async()=>{
    try {
        const response = await axiosinstance.get('https://smp-2a89.onrender.com/api/notify/get-all-notify')
        return response.data
    } catch (error) {
        return error.message
    }
}

export const Deletenotify = async(id)=>{
    try {
        const response = await axiosinstance.delete(`https://smp-2a89.onrender.com/api/notify/delete-notify/${id}`)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const readednotify = async()=>{
    try {
        const response = await axiosinstance.put('https://smp-2a89.onrender.com/api/notify/read-notify')
        return response.data
    } catch (error) {
        return error.message
    }
}