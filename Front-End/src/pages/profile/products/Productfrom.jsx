import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "../../../redux/loaderSlice";
import { Addproduct, editproduct } from "../../../apicalls/product";
import Image from "./Image";

const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Productfrom({
  showproductform,
  setshowproductform,
  selectedproduct,
  getdata,
}) {
  const formref = useRef(null);
  const [selectedtab, setselectedtab] = useState("1");
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onfinish = async (value) => {
    dispatch(setloading(true));
    console.log(value);
    try {
      let response = null;
      if (selectedproduct) {
        response = await editproduct(selectedproduct._id, value);
      } else {
        value.seller = user._id;
        value.status = "pending";
        response = await Addproduct(value);
      }

      dispatch(setloading(false));
      if (response.success) {
        message.success(response.message);
        getdata();
        setshowproductform(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setloading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (selectedproduct) {
      formref.current.setFieldsValue(selectedproduct);
    }
  }, [selectedproduct]);
  return (
    <div>
      <Modal
        open={showproductform}
        title=""
        onCancel={() => setshowproductform(false)}
        centered
        okText="Save"
        width={1000}
        onOk={() => {
          formref.current.submit();
        }}
        {...(selectedtab === "2" && { footer: false })}
      >
        <div>
          <h1 className="text-center font-semibold uppercase text-2xl text-primary">
            {selectedproduct ? "Edit Product" : "Add Product"}
          </h1>
          <Tabs
            defaultActiveKey="1"
            activeKey={selectedtab}
            onChange={(key) => setselectedtab(key)}
            className="overflow-auto"
          >
            <Tabs.TabPane tab="General" key="1">
              <Form layout="vertical" onFinish={onfinish} ref={formref}>
                <Form.Item label="Name" name="name" rules={rules}>
                  <Input type="text"></Input>
                </Form.Item>
                <Form.Item label="Description" name="description" rules={rules}>
                  <TextArea type="text"></TextArea>
                </Form.Item>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Form.Item label="Price" name="price" rules={rules}>
                      <Input type="number"></Input>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Category" name="category" rules={rules}>
                      <select>
                        <option value="">Select</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="sports">Sports</option>
                      </select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Age" name="age" rules={rules}>
                      <Input type="number"></Input>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="flex gap-10">
                  {additionalThings.map((item) => {
                    return (
                      <Form.Item
                        label={item.label}
                        name={item.name}
                        valuePropName="checked"
                      >
                        <Input
                          type="checkbox"
                          value={item.name}
                          onChange={(e) => {
                            formref.current.setFieldsValue({
                              [item.name]: e.target.checked,
                            });
                          }}
                          checked={formref.current?.getFieldValue(item.name)}
                        />
                      </Form.Item>
                    );
                  })}
                </div>
                <Form.Item
                        label="Show Bids On product page"
                        name="showBidsOnProductPage"
                        valuePropName="checked"
                      >
                        <Input
                          type="checkbox"
                          
                          onChange={(e) => {
                            formref.current.setFieldsValue({
                              showBidsOnProductPage:e.target.checked
                            });
                          }}
                          checked={formref.current?.getFieldValue("showBidsOnProductPage")}
                          style={{width:50,marginLeft:20}}
                        />
                      </Form.Item>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Image" key="2" disabled={!selectedproduct}>
              <Image
                getdata={getdata}
                setshowproductform={setshowproductform}
                selectedproduct={selectedproduct}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </div>
  );
}

export default Productfrom;
