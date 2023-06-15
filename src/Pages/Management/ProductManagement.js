import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, Modal } from "antd";
import CardsManagement from "../../Components/CardManagements";
import { Container, Table } from "react-bootstrap";
import FormProducts from "./FormProducts";
import Instance from "../../InstanceAxios";
import FormItem from "antd/es/form/FormItem";
import ButtonAntd from "../../Components/ButtonAntd";
const instance = axios.create({
    baseURL: 'https://fine-crown-production.up.railway.app/api/',
    timeout: 10000,
});


function ProductManagement() {
    let token = localStorage.getItem('token');
    let isAdmin = localStorage.getItem('role')?.toUpperCase()=="ADMIN"?true:false;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const getCategory = async () =>{
        await instance.get('category').then((res)=>{
            setCategory(res.data);
        }).catch((err)=>{

        })
    }
    const onAddCategory = async(values)=>{
        await instance.post('category',values,{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            window.location.reload();
        }).catch((err)=>{})
    }
    const addBrand = async(values)=>{
        await instance.post('brand',values,{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            window.location.reload();
        }).catch((err)=>{})
    }
    const getBrand = async () =>{
        await instance.get('brand').then((res)=>{
            setBrand(res.data);
        }).catch((err)=>{

        })
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showBrandModal = () => {
        setIsBrandModalOpen(true);
    };
    const showCategryModal = () => {
        setIsCategoryModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setIsBrandModalOpen(false);
        setIsCategoryModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsBrandModalOpen(false);
        setIsCategoryModalOpen(false);
    };
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [search, setSearch] = useSearchParams();
    const getData= async ()=>{
        let api="product?"+search;
        const response = await instance.get(api);
        try {
            const data = await response.data;
            setList(data); 
            setLoading(false);
        } catch (error) {
            setList([]);
            setLoading(false);
        }
        
    }
    useEffect(()=>{
        document.title="Quản lí sản phẩm";
        setLoading(true);
        getData();
        getCategory();
        getBrand();
    },[search])
    if(!isAdmin)
        return(
            <div>
                Access denied
            </div>
        );
    if (loading)
        return (<div></div>);
    else
        return (
            <Container>
            <div style={{ padding:'20px' , width: '100%' }}>
                <div>
                    <Button style={{ color:'black', marginLeft:'10px', backgroundColor:'#def0ec' }} type="primary" onClick={showModal}>
                        Thêm sản phẩm
                    </Button>
                    <Modal footer={false} width={1000} title="Thêm sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <FormProducts setIsModalOpen={setIsModalOpen} method='post'></FormProducts>
                    </Modal>
                    <Button style={{ color:'black', marginLeft:'10px', backgroundColor:'#def0ec' }} type="primary" onClick={showCategryModal}>
                        Thêm danh mục sản phẩm
                    </Button>
                    <Modal footer={false} width={1000} title="Thêm danh mục sản phẩm sản phẩm" open={isCategoryModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form onFinish={onAddCategory}>
                            <FormItem label="Tên danh mục" name="categoryName">
                                <Input/>
                            </FormItem>
                            <FormItem >
                            <div style={{ display:'flex' , justifyContent:'center' }}>
                                <Button htmlType="submit">Thêm</Button>
                            </div>
                            </FormItem>
                        </Form>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Mã danh mục</th>
                                    <th>Tên danh mục</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    category.map((item)=><tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.categoryName}</td>
                                        <td> <ButtonAntd categoryId ={item.id} type="delete-category"></ButtonAntd>  </td>
                                    </tr>)
                                }
                            </tbody>
                        </Table>
                    </Modal>
                    <Button style={{ color:'black', marginLeft:'10px', backgroundColor:'#def0ec' }} type="primary" onClick={showBrandModal}>
                        Thêm thương hiệu
                    </Button>
                    <Modal footer={false} width={1000} title="Thêm thương hiệu sản phẩm" open={isBrandModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form onFinish={addBrand}>
                            <FormItem label="Tên thương hiệu" name="brandName">
                                <Input/>
                            </FormItem>
                            <FormItem >
                            <div style={{ display:'flex' , justifyContent:'center' }}>
                                <Button htmlType="submit">Thêm</Button>
                            </div>
                            </FormItem>
                        </Form>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Mã thương hiệu</th>
                                    <th>Tên thương hiệu</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    brand.map((item)=><tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.brandName}</td>
                                        <td> <ButtonAntd brandId ={item.id} type="delete-brand"></ButtonAntd>  </td>
                                    </tr>)
                                }
                            </tbody>
                        </Table>
                    </Modal>
                </div>
                <div style={{ background: 'black', paddingLeft: '10px', width: '100%', minHeight: '500px', backgroundColor: 'white', flexWrap: 'wrap', justifyContent: 'flex-start', display: 'flex' }}>
                    {
                        list.map((item) =>
                            <CardsManagement list={list} setList={setList} key ={item.id} item={item}></CardsManagement>
                        )
                    }
                </div>
            </div>
            </Container>
        );
}
export default ProductManagement;