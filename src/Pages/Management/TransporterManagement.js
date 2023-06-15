import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Instance from "../../InstanceAxios";
import { Spin } from "antd";

function TransporterManagement() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getData = async()=>{
        await Instance.get('transporter')
        .then((res)=>{
            console.log(res.data)
            setData(res.data);
            setLoading(false);
        }).catch((er)=>{setLoading(false)})
    }
    useEffect(()=>{
        document.title ="Đối tác vận chuyển";
        getData();
    }, [])
    return ( 
        <Spin spinning={loading}>
        <Container>
            <div style={{ marginTop:'10px' }}>
                <h3>Các đối tác vận chuyển</h3>
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
                        <td>{item.transporterName}</td>
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

export default TransporterManagement;