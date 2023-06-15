import { Button, Form, Input } from "antd";
import Instance from "../../InstanceAxios";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Auth from "../../assets/Authentication.png";
function Register() {
  const [messageRegiter, setMessageRegister] = useState();
  const onFinishRegister = async (values) => {
    console.log(values);
    await Instance.post("auth/register", values)
      .then((res) => {
        setMessageRegister("Đăng ký thành công");
      })
      .catch((err) => {
        setMessageRegister(err.response.data);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Container style={{ margin: "20px" }}>
      <Row>
        <Col>
          <img id="image" src={Auth}></img>
        </Col>
        <Col>
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinishRegister}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Your Fullname"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
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
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  color: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>{messageRegiter}</span>
              </div>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
