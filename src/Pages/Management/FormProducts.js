import React, { useEffect, useState } from "react";
import { AutoComplete, Modal, Spin } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Empty, Form, Input, InputNumber, Select } from 'antd';
import { useNavigate, useSearchParams } from "react-router-dom";
import Instance from "../../InstanceAxios";
import FormItem from "antd/es/form/FormItem";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    string: {
        range: '${label} must be between ${min} and ${max}',
    }
};

function FormProducts(props) {
    const token = localStorage.getItem('token');
    const setIsModalOpen = props.setIsModalOpen;
    const [imagePreview, setImagePreview] = useState(true);
    const [isChangeFile, setIsChangeFile] = useState(false);
    const navigate = useNavigate();
    let initValues = {
        brand :1,
        category:1
    };
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const getCategory = async () => {
        await Instance.get("category")
          .then((res) => {
            let tmp = [];
            res.data.forEach((item) => {
              tmp.push({
                value: item.id,
                label: item.categoryName,
              });
            });
    
            setCategory(tmp);
          })
          .catch((err) => {});
      };
      const getBrand = async () => {
        await Instance.get("brand")
          .then((res) => {
            let tmp = [];
            res.data.forEach((item) => {
              tmp.push({
                value: item.id,
                label: item.brandName,
              });
            });
            setBrand(tmp);
          })
          .catch((err) => {});
      };
    const handleCancel = ()=>{
        if(props.method=='put')
            navigate(-1);
        else
            setIsModalOpen(false);
    }
    const  getBase64File = async(file)=>{
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            setImagePreview(reader.result);
        }
    }
    const handleFileInputChange = async (e)=>{
        await getBase64File(e.target.files[0]); 
        setIsChangeFile(true);
    }
    const onFinish = async (value) => {
        let tmp = 'data:image/jpeg;base64,';
        let base64Code = imagePreview.slice(tmp.length, imagePreview.length);
        value['avatar'] = base64Code;
        if(props.method=='put'){
            if(!isChangeFile)
                value['avatar'] = props.data.avatar;
            await Instance.put('product/'+props.data.id,value,{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Accept": "application/json,text/*;q=0.99"
                  }
            }).then((res)=>{
                navigate('/product-detail?id='+props.data.id);
            }).catch((error)=>{
                console.log(error);
            });
        }
        if(props.method=='post'){
            console.log(value.avatar);
            await Instance.post('product',value,{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Accept": "application/json,text/*;q=0.99"
                  }
            }).then((res)=>{
                setTimeout(()=>{
                    setIsModalOpen(false);
                },2000);
                navigate('/product-detail?id='+res.data.id);
            }).catch((error)=>{
                console.log(error.response.data);
            });
            
            
        }
    }
    if(props.method=='put'){
        initValues = {
            productName: props.data.productName,
            brandId: props.data.brandId,
            price: props.data.price,
            categoryId:props.data.categoryId,
            coolingRange:props.data.coolingRange,
            wattage:props.data.wattage,
            cost: props.data.cost,
            windSpeed: props.data.windSpeed,
            control: props.data.control,
            highestNoiseLevel: props.data.highestNoiseLevel,
            dimensionsAndWeight: props.data.dimensionsAndWeight,
            quantity: props.data.quantity,
            percent: props.data.percent,
            utilities: props.data.utilities,
            watterBottle: props.data.watterBottle,
        }
    }
    useEffect(()=>{
        if(props.method=='put')
            setImagePreview(`data:image/png;base64,${props.data.avatar}`);
        getCategory();
        getBrand();
    },[]);
    
    
    return (
        <Spin spinning={false}>
            <Container style={{ width: '100%', minHeight: '100vh', backgroundColor: 'white' }}>
                        <Form  initialValues={initValues} 
                            style={{ marginRight: '10px' }} {...layout} /* form={form}*/ name="control-hooks" onFinish={onFinish} validateMessages={validateMessages}>
                <Row>
                    <Col style={{ padding: '10px' }}>
                            <Form.Item
                                name="productName"
                                label="Tên sản phẩm"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        message: 'Lớn hơn 6 kí tự',
                                        validator: (_, value) => {
                                            if ( (value).length >6 ) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject();
                                            }
                                        }
                                    }
                                ]}
                            >
                                <Input />

                            </Form.Item>
                            <FormItem label="Danh mục" 
                            rules={[
                                {required:true}
                            ]}
                            name="categoryId">
                                <Select  options={category} />
                            </FormItem>
                            
                            <Form.Item
                                name="brandId"
                                label="Thương hiệu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập hãng sản xuất',
                                    },
                                ]}
                            >
                               <Select options={brand} />
                            </Form.Item>

                            
                            <Form.Item
                                name="cost"
                                label="Giá gốc sản phẩm"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        message: 'Giá sản phẩm không đúng',
                                        validator: (_, value) => {
                                            if (Number(value) < 10000 || Number(value) > 1000000000) {
                                                return Promise.reject();
                                            } else {

                                                return Promise.resolve();
                                            }
                                        }
                                    }
                                ]}
                            >
                                <InputNumber style={{
                                    width: 200,
                                }} />
                            </Form.Item>
                            <Form.Item
                                name="quantity"
                                label="Số lượng"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        message: 'Số lượng sản phẩm không đúng',
                                        validator: (_, value) => {
                                            if (Number(value) < 0 || Number(value) > 1000) {
                                                return Promise.reject();
                                            } else {

                                                return Promise.resolve();
                                            }
                                        }
                                    }
                                ]}
                            >
                                <InputNumber style={{
                                    width: 200,
                                }} />
                            </Form.Item>
                            <Form.Item
                                name="percent"
                                label="Phần trăm"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        message: 'Phần trăm sản phẩm không đúng',
                                        validator: (_, value) => {
                                            if (Number(value) < 0 || Number(value) > 100) {
                                                return Promise.reject();
                                            } else {

                                                return Promise.resolve();
                                            }
                                        }
                                    }
                                ]}
                            >
                                <InputNumber style={{
                                    width: 200,
                                }} />
                            </Form.Item>
                            <Form.Item
                                name="coolingRange"
                                label="PV làm mát"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        message: 'Không quá 100 kí tự',
                                        validator: (_, value) => {
                                            if ((value).length <= 100) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject();
                                            }
                                        }
                                    }
                                ]}
                            >
                                <Input />

                            </Form.Item>
                            <Form.Item
                                name="wattage"
                                label="Công suất"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    
                                ]}
                            >
                                <Input style={{
                                    width: 200,
                                }} />
                            </Form.Item>
                            <Form.Item name="utilities" label="Tiện ích"
                                rules={[
                                    {
                                        type: 'string'
                                    },
                                    {
                                        required:true
                                    },
                                    {
                                        message: 'Không quá 500 kí tự',
                                        validator: (_, value) => {
                                            if (!value || (value).length <= 500)
                                                return Promise.resolve();
                                            return Promise.reject();

                                        }
                                    }
                                ]}
                            >
                                <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
                            </Form.Item>
                           
                    </Col>
                    <Col style={{ padding: '10px' }}>
                    
                        <Row>
                        <Form.Item
                                name="windSpeed"
                                label="Tốc độ gió"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="control"
                                label="Điều khiển"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="highestNoiseLevel"
                                label="Độ ồn"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="watterBottle"
                                label="Bình nước"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            
                            <Form.Item
                                name="dimensionsAndWeight"
                                label="Kích thước"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        message: 'Không quá 100 kí tự',
                                        validator: (_, value) => {
                                            if ((value).length <= 100) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject();
                                            }
                                        }
                                    }
                                ]}
                                >
                                <Input />
                            </Form.Item>
                            
                        </Row>
                        <Row>
                            <Form.Item
                                name="avatar"
                                label="Avatar"
                                rules={
                                    [
                                        {
                                            message: 'Avatar is required',
                                            validator: (_, value) => {
                                                if (Object.keys(imagePreview).length != 0) {
                                                    return Promise.resolve();
                                                } else {
                                                    return Promise.reject();
                                                }
                                            }
                                        }
                                    ]
                                }
                            >
                                <Input accept="image/png, image/jpg, image/jpeg" onChange={handleFileInputChange} multiple={false} type="file" />
                            </Form.Item>
                            {
                                Object.keys(imagePreview).length != 0 ? (<img src={imagePreview} />):<></>
                            }
                            
                        </Row>
                    </Col>
                </Row>
                <Row>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Button /*disabled={disabled} */ style={{ margin: '20px', width: '160px', fontWeight: 'bold', color: '#00CCFF', borderRadius: '5px', borderColor: '#00CCFF' }}  onClick={handleCancel}  >
                                    Hủy
                                </Button>
                                <Button /*disabled={disabled}*/ style={{ margin: '20px', backgroundColor: '#00CCFF', marginRight: '15px', width: '160px', color: 'white' }} htmlType="submit">
                                    Lưu
                                </Button>
                            </div>
                </Row>
                        </Form>
            </Container>
        </Spin>
    );
}

export default FormProducts;