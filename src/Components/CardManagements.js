import React, { useState } from "react";
import { Button, Card, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Instance from "../InstanceAxios";
import Modals from "./Modals";

function CardsManagement(props) {
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const item = props.item;
    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = async () => {
        await Instance.delete('product/'+item.id,{
            headers: {
                'Authorization': 'Bearer ' + token,
                "Accept": "application/json,text/*;q=0.99"
              }
        }).then((res)=>{
            // setIsSuccess(true);
            setTimeout(()=>{
                // setIsSuccess(false);
                window.location.assign("/product-management");
            },2000);
        }).catch((err)=>{
            alert('Xóa thất bại');
        })
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    return (
        <Card 
        bordered={true}
            hoverable
            style={{
                width: 350,
                margin: '20px',
            }}
            cover={<img object-fit= 'cover' height='280px' alt="example" src={`data:image/png;base64,${item.avatar}`} />}
        >
            <div style={{ textAlign: 'left' }}>
                <h5>{item.productName}</h5>
                <h6>Giá bán: {item.price.toLocaleString()} VND</h6> 
                <div style={{ display:"flex" , flexWrap:'wrap', flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Link to={'/edit?id='+item.id}>
                        <Button style={{width:'120px', color:'white', backgroundColor:'#198754'}}>Cập nhật</Button>
                    </Link>
                    <Button style={{width:'120px', color:'white', backgroundColor:'#dc3545'}} type="primary" onClick={showModal}>
                        Xóa
                    </Button>
                    <Modals item={item} type="delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}></Modals>
                    <Modals  text="Xóa sản phẩm thành công" type="success" open={isSuccess}></Modals>
                </div>
            </div>
        </Card>)
        ;
}
export default CardsManagement;