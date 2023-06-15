import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Spin } from "antd";
import Instance from "../InstanceAxios";

function PaymentInfo() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async()=>{
        await Instance.get('payment/method')
        .then((res)=>{
            console.log(res.data)
            setData(res.data);
            setLoading(false);
        }).catch((er)=>{setLoading(false)})
    }
    useEffect(()=>{
        document.title ="Phương thức thanh toán";
        getData();
    }, [])
    return ( 
        <Spin spinning={loading}>
        <Container>
            <div style={{ marginTop:'10px' }}>
                <h3>Có thể thanh toán qua các phương thức sau</h3>
            </div>
            <Table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Avatar</th>
                                </tr>
                            </thead>
                            <tbody>
            {
                data.map((item)=>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.paymentName}</td>
                        <td>
                            <img style={{ width:'200px', height:'150px' }} src={`data:image/png;base64,${item.avatar}`}></img>
                        </td>
                    </tr>
                )
            }
            </tbody>
           </Table>             
        </Container>
        </Spin>
     );
}

export default PaymentInfo;