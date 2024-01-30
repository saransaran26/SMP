import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setloading } from "../../redux/loaderSlice";
import { GetAllBids, GetProductByID } from "../../apicalls/product";
import { Button, message } from "antd";
import Divider from "../../components/Divider";
import moment from "moment";
import BidModel from "./BidModel";

function Productinfo() {
  const[showAddNewBid,setshowAddNewBid] = useState(false)
  const { id } = useParams();
  const{user} = useSelector((state)=>state.users)
  const dispatch = useDispatch();
  const [selectedImageIndex, setselectedImageIndex] = useState(0);
  const [product, setproduct] = useState(null);

  const getdata = async () => {
    try {
      dispatch(setloading(true));
      const response = await GetProductByID(id);
      dispatch(setloading(false));
      if (response.success) {
        const bidsresponse = await GetAllBids({product:id})
        console.log("bids",bidsresponse);
        setproduct({
          ...response.data,
          bids:bidsresponse.data
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    product && (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* image */}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 rounded-md object-cover"
            />

            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    src={image}
                    alt=""
                    className={"w-20 h-20 object-cover rounded-md cursor-pointer"+
                    (selectedImageIndex === index ? 'border border-green-700 p-2 border-dashed' : "")
                  }
                    onClick={()=>setselectedImageIndex(index)}
                  />
                );
              })}
            </div>
            <Divider/>
            <div>
              <h1 className="text-gray-600">Added on</h1>
              <span>{moment(product.createdAt).format("MMM D YYYY hh:mm A")}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">{product.name}</h1>
              <span className="">{product.description}</span>
            </div>
            <Divider/>
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">Product Details</h1>
            
            <div className="flex justify-between mt-2">
              <span>Price</span>
              <span>$ {product.price}</span>
            </div>
            <div className="flex justify-between mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span> {product.billAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Purchased Year</span>
                <span>{moment().subtract(product.age,'years').format('YYYY')} ({product.age} years ago)</span>
              </div>
              <Divider/>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-orange-900">Seller Details</h1>
                <div className="flex justify-between mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
              </div>
              <Divider/>
              <div className="flex flex-col">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
                    <Button onClick={()=>setshowAddNewBid(!showAddNewBid)}
                     disabled={user._id === product.seller._id}
                    >New Bid</Button>
                </div>

                {product.showBidsOnProductPage && product?.bids?.map((bid)=>{
                  return <div className="border border-gray-300 border-solid rounded mt-5 p-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Name</span>
                      <span>{bid.buyer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bid Amount</span>
                      <span>{bid.bidAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bid placed on</span>
                      <span>{moment(bid.createdAt).format("MMM D , YYYY hh:mm a")}</span>
                    </div>
                  </div>
                })}
              </div>
          </div>
         
        </div>
        {showAddNewBid && <BidModel product={product} reloaddata={getdata} showbidmodel={showAddNewBid} setshowbitmodel={setshowAddNewBid} />}
      </div>
    )
  );
}

export default Productinfo;
