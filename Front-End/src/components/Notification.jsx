import { Modal, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setloading } from "../redux/loaderSlice";
import { Deletenotify } from "../apicalls/notification";
import moment from "moment";

function Notification({
  notification,
  getdata,
  shownotification,
  setshownotification,
}) {
  const dispatch = useDispatch();
  const deletenoti = async (id) => {
    try {
      dispatch(setloading(true));
      const response = await Deletenotify(id);
      dispatch(setloading(false));
      if (response.success) {
        message.success(response.message);
        getdata();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };
  const navigate = useNavigate();
  return (
    <Modal
      title="Notification"
      open={shownotification}
      centered
      footer={null}
      onCancel={() => setshownotification(false)}
      width={800}
      className="overflow-auto"
    >
      <div className="flex flex-col gap-2">
        {notification.map((notify) => {
          return (
            <div
              className="flex flex-col border border-solid p-3 border-gray-300"
              key={notify._id}
            >
              <div className="flex items-center justify-between">
                <div
                className="cursor-pointer"
                  onClick={() => {
                    navigate(notify.onClick);
                    setshownotification(false);
                  }}
                >
                  <h1 className="text-gray-700">{notify.title}</h1>
                  <span className="text-gray-600">{notify.message}</span>
                  <h1 className="text-gray-500">
                    {moment(notify.createdAt).fromNow()}
                  </h1>
                </div>

                <div>
                  <MdDelete
                    className="text-2xl cursor-pointer"
                    onClick={() => deletenoti(notify._id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default Notification;
