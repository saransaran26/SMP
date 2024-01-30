import { axiosinstance } from "./axiosinstance"


export const RegisterUser = async(payload)=>{
    try {
        const response = await axiosinstance.post('https://smp-2a89.onrender.com/api/user/register',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const LoginUser = async(payload)=>{
    try {
        const response = await axiosinstance.post('https://smp-2a89.onrender.com/api/user/login',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const GetcurrentUser = async()=>{
    try {
        const response = await axiosinstance.get('https://smp-2a89.onrender.com/api/user/get-current-user')
        return response.data
    } catch (error) {
        return error.message
    }
}

export const GetAllUser = async()=>{
    try {
        const response = await axiosinstance.get('https://smp-2a89.onrender.com/api/user/get-all-user')
        return response.data
    } catch (error) {
        return error.message
    }
}

export const UpdateUserStatus = async(id,status)=>{
    try {
        const response = await axiosinstance.put(`https://smp-2a89.onrender.com/api/user/update-user-status/${id}`,{status})
        return response.data
    } catch (error) {
        return error.message 
    }
}