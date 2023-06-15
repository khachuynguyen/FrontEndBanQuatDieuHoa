import { Button, Form, Modal, InputNumber, Input } from "antd";
import { useState } from "react";
import Instance from "../InstanceAxios";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";

function ButtonAntd(props) {
  const navigate = useNavigate();
  var type = props.type;
  var text = props.text;
  var quantity = props.quantity;
  var productId = props.productId;
  var onclick = props.onclick;
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const doOnclick = async () => {
    await Instance.delete("cart/" + onclick, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Lỗi");
      });
  };
  const deleteCategory = async()=>{
    await Instance.delete('category/'+props.categoryId,{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((res)=>{
        window.location.reload();
    })
  }
  const deleteBrand = async()=>{
    await Instance.delete('brand/'+props.brandId,{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((res)=>{
        window.location.reload();
    })
  }
  
  const onFinish = async (values) => {
    await Instance.put('cart/'+productId,values,{
        headers: {
            'Authorization': 'Bearer ' + token
          }
    }).then((res)=>{
            window.location.reload();
    }).catch((err)=>{
            console.log(err)
    })
  };
  const doAcceptOrder = async()=>{
    let order = props.order;
    order.status = 1;
      await Instance.put('admin/order/'+order.id,order,{
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then((res)=>{
        window.location.reload();
      }).catch((err)=>{
        alert("lỗi")
      })
  }
  const doPayment = async()=>{
    await Instance.get('order/payment/'+props.orderId,{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((res)=>{
      window.location.replace(res.data);
    }).catch((err)=>{
      alert("Không thể thực hiện giao dịch này")
    })
  }
  const deleteUser = async()=>{
    await Instance.delete('admin/user/'+props.userId,{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((res)=>{
      window.location.reload();
    }).catch((err)=>{
      alert("lỗi")
    })
  }
  const doDeclineOrder = async()=>{
    let order = props.order;
    order.status = 2;
    console.log(order);
      await Instance.put('admin/order/'+order.id,order,{
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then((res)=>{
        window.location.reload();
      }).catch((err)=>{
        alert("lỗi")
      })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const doChange = async () => {
    
    await Instance.get("product/" + productId)
      .then((res) => {
        setProduct(res.data);
        setIsModalOpen(true);
      })
      .catch((err) => {
        alert("Lỗi");
      });
  };
  return (
    <div>
      {type == "delete" ? (
        <>
          <Button onClick={doOnclick}>{text}</Button>
        </>
      ) : (
        <></>
      )}
      {type == "change" ? (
        <>
          <Button onClick={doChange}>{text}</Button>
          <Modal
            title="Update Cart"
            open={isModalOpen}
            footer={false}
            // onOk={onFinish}
            onCancel={handleCancel}
          >
          {
            product!=null?
            <Form
            initialValues={{
                quantity: quantity,
              }}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
                <h4>ProductName: {product.productName}</h4>
                <img style={{ width: '100%' }} src={`data:image/png;base64,${product.avatar}`}></img>
                <div style={{ margin:'20px' ,display: 'flex', justifyContent:'space-evenly' }}>
                <span> <h5>Số lượng</h5> </span>
                <FormItem name="quantity">
                <InputNumber  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  size="large"
                  min={1}
                  max={product.quantity}
                  ></InputNumber>
                  </FormItem>
                </div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                <FormItem>

                <Button htmlType="submit">Ok</Button>
                </FormItem>
                </div>
            </Form>:<></>
          }
            
          </Modal>
        </>
      ) : (
        <></>
      )}
      
      {
        type=="delete-category"
        ?
        <Form onFinish={deleteCategory}>
          <Button htmlType="submit" >Delete</Button>
        </Form>
        :
        <></>
      }
      {
        type=="delete-brand"
        ?
        <Form onFinish={deleteBrand}>
          <Button htmlType="submit" >Delete</Button>
        </Form>
        :
        <></>
      }
      {
          type=='accept'?
          <>
            <Button onClick={doAcceptOrder}>{text}</Button>
          </>:
          <>
          </>
        }
        {
          type=='deleteUser'?
          <>
            <Button onClick={deleteUser} danger>{text}</Button>
          </>:
          <>
          </>
        }
        {
          type=='decline'?
          <>
            <Button type="primary" danger onClick={doDeclineOrder}>{text}</Button>
          </>:
          <>
          </>
        }
        {
          type=='payment'?
          <>
            <Button onClick={doPayment}>{text}</Button>
          </>:
          <>
          </>
        }
    </div>
  );
}

export default ButtonAntd;
