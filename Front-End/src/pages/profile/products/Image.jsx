import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setloading } from "../../../redux/loaderSlice";
import { editproduct, uploadImage } from "../../../apicalls/product";
import { MdDelete } from "react-icons/md";

function Image({ setshowproductform, getdata, selectedproduct }) {
  const [file, setfile] = useState(null);
  const [showpreview, setshowpreview] = useState(true);
  const dispatch = useDispatch();
  const [images, setimage] = useState(selectedproduct.images);
  const upload = async () => {
    try {
      dispatch(setloading(true));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedproduct._id);
      const response = await uploadImage(formData);
      dispatch(setloading(false));
      if (response.success) {
        message.success(response.message);
        setshowpreview(false)
        setfile(null)
        setimage([...images,response.data])
        getdata();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };

  const deleteImage = async(image) => {
        try {
            dispatch(setloading(true))
            const updatedArray = images.filter((img)=>img !== image)
            const updatedProduct = {...selectedproduct,images:updatedArray}
            const response = await editproduct(selectedproduct._id,updatedProduct)
            dispatch(setloading(false))
            if(response.success){
                message.success(response.message)
                setimage(updatedArray)
                getdata()
            }
        } catch (error) {
            dispatch(setloading(false))
            message.error(error.message)
        }
  }
  return (
    <div>
      <div className="flex gap-5 mb-5">
        {images.map((image) => {
          return (
            <div className="flex gap-2 border border-solid border-gray-500 p-2 items-end">
              <img src={image} alt="" className="w-20 h-20 object-cover" />
              <MdDelete className="cursor-pointer" onClick={()=>deleteImage(image)}/>
            </div>
          );
        })}
      </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => setfile(info.file)}
        showUploadList={showpreview}
      >
        <Button type="dashed">Upload Image</Button>
      </Upload>
      <div className="flex justify-end mt-5 gap-5">
        <Button type="dashed" onClick={() => setshowproductform(false)}>
          Cancel
        </Button>
        <Button type="dashed" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Image;
