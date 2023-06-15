import { Col, Container, Row } from "react-bootstrap";
import Auth from "../../assets/Authentication.png";
import "./Login.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import Instance from "../../InstanceAxios";
import { Link, useNavigate} from "react-router-dom";
function LoginPage() {
  localStorage.clear();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const onFinish = async (values) => {
    Instance.post("auth/login",values).then((response)=>{
        localStorage.clear();
        localStorage.setItem("userName",response.data.userName);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        localStorage.setItem("fullName",response.data.fullName);
        localStorage.setItem("phone",response.data.phone);
        localStorage.setItem("address",response.data.address);
        window.location.assign("/product");
    }).catch((err)=>{
        setMessage("Sai tên đăng nhập hoặc mật khẩu")
    })
  };
  return (
    <Container>
      <Row>
        <Col>
          <img id="image" src={Auth}></img>
        </Col>
        <Col id="col2">
          <h1>Welcome to</h1>
          <h2>Air Conditional Fan Shop</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="UserName"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <p>{message}</p>
            <Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <div id="buttom">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                Don't have account? <a href="/register">register now!</a>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
