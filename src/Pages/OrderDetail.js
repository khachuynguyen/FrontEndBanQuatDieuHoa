import { Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Instance from "../InstanceAxios";

const columns = [
    {
      title: 'Tên Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'userName',
        key: 'userName',
      },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Số lượng',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: 'Tổng cộng',
        dataIndex: 'total',
        key: 'total',
    },
]
function OderDetailPage(params) {
    const [search,setSearch] = useSearchParams();
    const [order,setOrder] = useState();
    const [list,setList] = useState([]);
    const token = localStorage.getItem('token');
    const [loading,setLoading] = useState(true);
    const getData = async()=>{
        await Instance.get('order/'+search.get('id'),{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            let tmp = [];
            let total = Number(0);
            res.data.forEach(element => {
                tmp.push({
                    key: element.orderDetailsId.productId,
                    name: element.productName,
                    userName: element.name,
                    avatar: (<img style={{ width:'75px', height:'50px'}} src={`data:image/png;base64,${element.avatar}`}></img>),
                    price: element.price.toLocaleString(),
                    total:(element.price*element.quantity).toLocaleString(),
                    count: element.quantity
                  })
                  total +=  (element.price*element.quantity);
            });
            setList(tmp);
            setOrder(total);
            setLoading(false);
        }).catch((err)=>{
            setLoading(false);
        })
    }
    useEffect(()=>{
        document.title="Chi tiết đơn hàng";
        getData();
    },[]);
    return(
        <Spin spinning={loading}>
            <Table pagination={false} dataSource={list} columns={columns}></Table>
            
            <div>
                <div style={{display:'flex', justifyContent:'space-evenly'}}>
                    <span><strong>Tổng cộng</strong></span>
                </div>
                <div style={{ color:'red', display:'flex', justifyContent:'flex-end'}}>
                    <span > <strong>{order?.toLocaleString()}</strong> </span>
                    <span>VNĐ</span>
                </div>
            </div>
        </Spin>
    )
}
export default OderDetailPage;