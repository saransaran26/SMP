import { axiosinstance } from "./axiosinstance"

export const Addproduct = async(payload)=>{
    try {
        const response = await axiosinstance.post('http://localhost:3000/api/product/add-product',payload)
        console.log("all in route",response);
        return response.data
    } catch (error) {
        return error.message
    }
}

export const Getproduct = async(filters)=>{
    console.log("api",filters);
    try {
        const response = await axiosinstance.post('http://localhost:3000/api/product/get-products',filters)
        return response.data
    } catch (error) {
        return error.message
    }
}

//get by product id
export const GetProductByID = async(id)=>{
    try {
        const response = await axiosinstance.get(`http://localhost:3000/api/product/get-product-id/${id}`)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const editproduct = async(id,payload)=>{
    try {
        const response = await axiosinstance.put(`http://localhost:3000/api/product/edit-product/${id}`,payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const deleteProduct = async(id)=>{
    try {
        const response = await axiosinstance.delete(`http://localhost:3000/api/product/delete-product/${id}`)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const uploadImage = async(payload)=>{
    try {
        const response = await axiosinstance.post('http://localhost:3000/api/product/upload-image',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const UpdateProductStatus = async(id,status)=>{
    try {
        const response = await axiosinstance.put(`http://localhost:3000/api/product/update-product-status/${id}`,{status})
        return response.data
    } catch (error) {
        return error.message
    }
}

//place a new bid

export const PlaceNewBid = async(payload)=>{
    try {
        const response = await axiosinstance.post('http://localhost:3000/api/bids/place-new-bid',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const GetAllBids = async(filters)=>{
    try {
        const response = await axiosinstance.post('http://localhost:3000/api/bids/get-all-bid',filters)
        return response.data
    } catch (error) {
        return error.message
    }
}

