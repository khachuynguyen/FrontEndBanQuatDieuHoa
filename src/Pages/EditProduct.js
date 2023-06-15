import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import {  Spin } from 'antd';
import { useSearchParams, useNavigate } from "react-router-dom";
import FormProducts from "./Management/FormProducts";
import Instance from "../InstanceAxios";
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const onfinish = (values) => {
    console.log(values);
}
function EditProduct() {
    const isAdmin = localStorage.getItem('role')?.toUpperCase() == 'ADMIN' ? true : false;
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();
    let id = search.get('id');
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    // if(search.has('id') == false)
    if (search.has('manufacturer') || !search.has('id')) {
        search.delete('id');
        navigate("/product-management?" + search);
    }
    const getData = async () => {
            const response = await Instance.get('product/' + id).then(
                (response)=>{
                    setProduct(response.data);
                    setLoading(false);
                }
            ).catch((err) => {
                // console.log(err);
                if(err.response.status == 404)
                    navigate('/empty');
                setLoading(false);
                setProduct([]);
            });
    }
    useEffect(() => {
        document.title = "Cập nhật sản phẩm";
        setLoading(true);
        getData();
    }, [search])
    if(!isAdmin)
        return(<div>
            <h1>Access dinied</h1>
        </div>);
    if (loading)
        return (<Spin></Spin>);
    else
        return (
            <FormProducts data={product} method = 'put'></FormProducts>
        );
}
export default EditProduct;