import { axiosinstance } from "./axiosinstance"

export const Addproduct = async(payload)=>{
    try {
        const response = await axiosinstance.post('https://smp-2a89.onrender.com/api/product/add-product',payload)
        console.log("all in route",response);
        return response.data
    } catch (error) {
        return error.message
    }
}

export const Getproduct = async(filters)=>{
    console.log("api",filters);
    try {
        const response = await axiosinstance.post('https://smp-2a89.onrender.com/api/product/get-products',filters)
        return response.data
    } catch (error) {
        return error.message
    }
}

//get by product id
export const GetProductByID = async(id)=>{
    try {
        const response = await axiosinstance.get(`https://smp-2a89.onrender.com/api/product/get-product-id/${id}`)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const editproduct = async(id,payload)=>{
    try {
        const response = await axiosinstance.put(`https://smp-2a89.onrender.com/api/product/edit-product/${id}`,payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const deleteProduct = async(id)=>{
    try {
        const response = await axiosinstance.delete(`https://smp-2a89.onrender.com/api/product/delete-product/${id}`)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const uploadImage = async(payload)=>{
    try {
        const response = await axiosinstance.post('https://smp-2a89.onrender.com/api/product/upload-image',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const UpdateProductStatus = async(id,status)=>{
    try {
        const response = await axiosinstance.put(`https://smp-2a89.onrender.com/api/product/update-product-status/${id}`,{status})
        return response.data
    } catch (error) {
        return error.message
    }
}

//place a new bid

export const PlaceNewBid = async(payload)=>{
    try {
        const response = await axiosinstance.post('https://smp-2a89.onrender.com/api/bids/place-new-bid',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const GetAllBids = async(filters)=>{
    try {
        const response = await axiosinstance.post('https://smp-2a89.onrender.com/api/bids/get-all-bid',filters)
        return response.data
    } catch (error) {
        return error.message
    }
}

