import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import { Button, Empty, Form, Input, InputNumber, Spin } from "antd";
import Col from "react-bootstrap/Col";
import { useSearchParams, useNavigate } from "react-router-dom";
import Instance from "../../InstanceAxios";
function ProductDetail() {
  const [search, setSearch] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  let id = search.get("id");
  const [loading, setLoading] = useState(true);
  let token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  const getData = async () => {
    const response = await Instance.get("product/" + id)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status == 404) navigate("/empty");
        setLoading(false);
        setProduct([]);
      });
  };
  const onFinish = async (values) => {
    setLoading(true)
    if(token == null )
        navigate('/login');
    await Instance.post('cart',values,{
        headers: {
            'Authorization': 'Bearer ' + token
          }
    }).then((res)=>{
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            window.location.assign('/cart');
        }, 2000);
    }).catch((err)=>{
      alert('Thêm vào giỏ hàng thất bại')
      setLoading(false)
    })
    console.log(values);
  };
  useEffect(() => {
    document.title = "Chi tiết sản phẩm";
    setLoading(true);
    getData();
  }, [search]);
  if (loading) return <Spin></Spin>;
  else
    return (
      <Container
        style={{ width: "100%", minHeight: "100vh", backgroundColor: "white" }}
      >
        <Row style={{ width: "100%", margin: "10px" }}>
          <Col style={{ padding: "10px" }}>
            <h5>{product.productName}</h5>
            <img
              width={"500px"}
              alt="example"
              src={`data:image/png;base64,${product.avatar}`}
            />
            <h6>Giá bán: {product.price.toLocaleString()} VND</h6>
            <h6 style={{ color: "red" }}>
              Giá gốc <del>{product.cost.toLocaleString()} VND</del>
            </h6>
            <div>{product.utilities}</div>
          </Col>
          <Col style={{ padding: "10px" }}>
            <p>Chi tiết</p>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Tên sản phẩm</td>
                  <td>{product.productName}</td>
                </tr>
                <tr>
                  <td>Hãng sản xuất</td>
                  <td>{product.brandId}</td>
                </tr>
                <tr>
                  <td>Danh mục</td>
                  <td>{product.categoryId}</td>
                </tr>
                <tr>
                  <td>Phạm vi làm mát</td>
                  <td>{product.coolingRange}</td>
                </tr>
                <tr>
                  <td>Công suất</td>
                  <td>{product.wattage}</td>
                </tr>
                <tr>
                  <td>Tốc độ gió</td>
                  <td>{product.windSpeed}</td>
                </tr>
                <tr>
                  <td>Điều khiển</td>
                  <td>{product.control}</td>
                </tr>
                <tr>
                  <td>Độ ồn cao nhất</td>
                  <td>{product.highestNoiseLevel}</td>
                </tr>
              </tbody>
            </Table>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                quantity: 1,
                productId: product.id,
              }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <label>Số lượng còn: {product.quantity}</label>
              <Form.Item label="Số lượng" name="quantity">
                <InputNumber
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  size="large"
                  min={1}
                  max={product.quantity}
                  defaultValue={1}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#ffc007",
                    width: "200px",
                    height: "50px",
                  }}
                  type="dashed"
                  htmlType="submit"
                >
                  Thêm vào giỏ hàng
                </Button>
                <Form.Item name="productId">
                  <Input type="hidden" />
                </Form.Item>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Container>
    );
}

export default ProductDetail;
