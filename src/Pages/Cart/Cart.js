import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { Checkbox } from "antd";
import dathang from "../../assets/dat-hang.png";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Instance from "../../InstanceAxios";
import { Space, Tag } from "antd";
import { notification } from "antd";
import { Col, Container, Row, Tab, Table } from "react-bootstrap";
import ButtonAntd from "../../Components/ButtonAntd";
import FormItem from "antd/es/form/FormItem";
const { TextArea } = Input;
const columns = [
  {
    title: "Tên Sản phẩm",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "Tổng cộng",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Hành động",
    dataIndex: "delete",
    key: "delete",
  },
];

function Carts() {
  let token = localStorage.getItem("token");
  const [total, setTotal] = useState(0);
  //modal checkout
  const [checkOut, setCheckout] = useState(false);
  const [formValue, setFormValue] = useState([]);
  const onCancel = () => {
    setCheckout(false);
  };
  const onChange = (checkedValues) => {
    setFormValue(checkedValues);
    let tmp = 0;
    checkedValues.forEach((item) => {
      tmp = tmp + item.total;
    });
    setTotal(tmp);
  };

  const onFinish = async (value) => {
    // console.log(formValue);
    if (Object.keys(carts).length == 0) {
      api["error"]({
        message: "Giỏ hàng trống",
      });
    } else {
      // console.log(value.listProduct);
      if (value.listProduct.length == 0) {
        api["error"]({
          message: "Vui lòng chọn sản phẩm cần đặt",
        });
      } else {
        if (token == null) {
          alert("Chưa đăng nhập, mời bạn đăng nhập");
          window.location.assign("/");
        } else {
          // alert("Show modal")
          setCheckout(true);
          console.log(formValue);
          // await Instance.post('/orders',value,{
          // headers: {
          //     'Authorization': 'Bearer ' + token
          //   }
          // }).then((res)=>{
          //     setOrderId(res.data.id);
          //     setIsSuccess(true);
          // }).catch((err)=>{
          //     api['error']({
          //         message: 'Lỗi đặt hàng',
          //     });
          //     console.log(err.response);
          // })
        }
      }
    }
  };
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const [carts, setCarts] = useState([]);
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(true);
  const [transporter, setTransporter] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [success, setIsSuccess] = useState(false);
  if (search.has("manufacturer")) window.location.assign("/");
  if (token == null) window.location.assign("/auth");
  const getTransporter = async () => {
    await Instance.get("transporter")
      .then((res) => {
        let tmp = [];
        res.data.forEach((item) => {
          tmp.push({
            value: item.id,
            label: item.transporterName,
          });
        });

        setTransporter(tmp);
      })
      .catch((err) => {});
  };
  const getPaymentMethod = async () => {
    await Instance.get("payment/method")
      .then((res) => {
        let tmp = [];
        res.data.forEach((item) => {
          tmp.push({
            value: item.id,
            label: item.paymentName,
          });
        });
        setPaymentMethod(tmp);
      })
      .catch((err) => {});
  };
  const doOrder = (values) => {
    values.listCart = formValue
    console.log(values);
    Instance.post('order',values,{
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res)=>{
      console.log(res);
      if(values.paymentId == 1)
        window.location.replace(res.data.paymentUrl);
      else
        window.location.assign("/order");
    }).catch((err)=>{
      console.log(err);
    })
  };
  const getData = async () => {
    await Instance.get("cart", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        // console.log(res.data);
        let tmp = [];
        let i = 0;
        res.data.forEach((element) => {
          tmp.push({
            key: element,
            name: element.productName,
            avatar: (
              <img
                style={{ width: "75px", height: "50px" }}
                src={`data:image/png;base64,${element.avatar}`}
              ></img>
            ),
            price: element.price,
            total: element.total,
            count: (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {element.quantity}{" "}
                <ButtonAntd
                  type="change"
                  quantity={element.quantity}
                  productId={element.cartID.productId}
                  onclick={element.cartID.productId}
                  text="Change"
                ></ButtonAntd>
              </div>
            ),
            delete: (
              <Space size="middle">
                <ButtonAntd
                  type="delete"
                  onclick={element.cartID.productId}
                  text="Delete"
                ></ButtonAntd>
              </Space>
            ),
          });
        });
        setCarts(tmp);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    document.title = "Giỏ hàng";
    getData();
    getTransporter();
    getPaymentMethod();
  }, []);
  return (
    <Spin spinning={loading} size="large">
      {contextHolder}
      {/* <Modals setIsSuccess={setIsSuccess}  doPayment={doPayment} open={success} text="Đặt hàng thành công, chọn phương thức thanh toán" type='success'>
            
            </Modals> */}
      <Modal
        width="100"
        height="100"
        title={"Đặt hàng"}
        open={checkOut}
        onCancel={onCancel}
        footer={false}
      >
        <div>
          <Container>
            <Form
              initialValues={{
                paymentId: 1,
                transporterId: 1,
                receiverName: localStorage.getItem("fullName"),
                phone: localStorage.getItem("phone"),
                address: localStorage.getItem("address"),
              }}
              onFinish={doOrder}
            >
              <Row>
                <Col>
                  <Table>
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng cộng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formValue.map((item) => (
                        <tr key={item.cartID.productId}>
                          <td>{item.productName}</td>
                          <td>{item.price.toLocaleString()}</td>
                          <td>{item.quantity}</td>
                          <td>{item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>Tổng cộng</td>
                        <td></td>
                        <td></td>
                        <td>{total.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <img style={{ width: "50%" }} src={dathang}></img>
                </Col>
                <Col>
                  <FormItem
                    name="transporterId"
                    label="Đơn vị vận chuyển:"
                    rules={[
                      {
                        required: true,
                        message: "Chọn đơn vị vận chuyển",
                      },
                    ]}
                  >
                    <Select options={transporter} />
                  </FormItem>
                  <FormItem
                    name="paymentId"
                    label="Phương thức thanh toán:"
                    rules={[
                      {
                        required: true,
                        message: "Chọn phương thức thanh toán",
                      },
                    ]}
                  >
                    <Select options={paymentMethod} />
                  </FormItem>
                  <FormItem
                    name="receiverName"
                    label="Tên người nhận"
                    rules={[
                      {
                        required: true,
                        message: "Nhập tên người nhận",
                      },
                    ]}
                  >
                    <Input></Input>
                  </FormItem>
                  <FormItem
                    name="address"
                    label="Địa chỉ:"
                    rules={[
                      {
                        required: true,
                        message: "Nhập địa chỉ",
                      },
                    ]}
                  >
                    <Input></Input>
                  </FormItem>
                  <FormItem
                    name="phone"
                    label="Số điện thoại:"
                    rules={[
                      {
                        required: true,
                        message: "Nhập số điện thoại",
                      },
                      {
                        message: "Số điện thoại chưa đúng",
                        validator: (_, value) => {
                          var regex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
                          if (
                            regex.test(value) &&
                            value.length >= 10 &&
                            value.length <= 11
                          ) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject();
                          }
                        },
                      },
                    ]}
                  >
                    <Input></Input>
                  </FormItem>
                  <FormItem name="description" label="Mô tả:">
                    <TextArea rows={4}></TextArea>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormItem>
                    <Button type="primary" htmlType="submit">
                      Xác nhận
                    </Button>
                  </FormItem>
                </div>
              </Row>
            </Form>
          </Container>
        </div>
      </Modal>
      <Form
        initialValues={{ listProduct: [] }}
        style={{ width: "100%" }}
        onFinish={onFinish}
      >
        <Form.Item style={{ width: "100%" }} name="listProduct">
          <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Avatar</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng cộng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item) => (
                  <tr key={item.key.cartID.productId}>
                    <td>
                      <Checkbox value={item.key}></Checkbox>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.avatar}</td>
                    <td>{item.count}</td>
                    <td>{item.price}</td>
                    <td>{item.total}</td>
                    <td>{item.delete}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Checkbox.Group>
        </Form.Item>
        {/* <Table pagination={false} dataSource={carts} columns={columns}></Table> */}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        >
          {/* <Button onClick={doCheckOut}>Đặt hàng</Button> */}
          <Form.Item>
            <Button htmlType="submit">Đặt hàng</Button>
          </Form.Item>
        </div>
      </Form>
    </Spin>
  );
}
export default Carts;
