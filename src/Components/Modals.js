import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';

function Modals(props){
    const doPayment = props.doPayment;
    const setIsSuccess = props.setIsSuccess;
  if(props.type == 'delete')
    return (
        <>
        <Modal title={'Bạn chắc chắn muốn xóa sản phẩm '+props.item.productName} open={props.open} onOk={props.onOk} onCancel={props.onCancel}>
            <p>Giá: {props.item.price}</p>
            <p>Hãng: {props.item.manufacturer}</p>
            <img width='480px' src={`data:image/png;base64,${props.item.avatar}`}></img>
        </Modal>
        </>
    );
    else
        if(props.type == 'success')
        return(
            <Modal width={1000} footer={false} open={props.open}>
                <div >
                    <Container>
                        <Row>
                            <div style={{ minHeight:'350px', display: 'flex', justifyContent: 'space-around' }}>
                                <span><h2>{props.text}</h2></span> 
                            </div>
                        </Row>
                    </Container>
                </div>
            </Modal>
        );
};

export default Modals;