import { Button, Space, Spin, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Instance from '../InstanceAxios';
import ButtonAntd from "../Components/ButtonAntd";
const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
        title: 'Tổng cộng',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    
    {
        title: 'Ngày đặt hàng',
        dataIndex: 'orderDate',
        key: 'orderDate',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
    },
]
function OrdersPage() {
    const [search,setSearch] = useSearchParams();
    const token = localStorage.getItem('token');
    if(token == null)
        window.location.assign('/auth');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getData = async()=>{
        await Instance.get('order',{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            let tmp= [];
            setIsLoading(true);
            res.data.forEach(order => {
                console.log(res.data);
                tmp.push({
                    key: order.id,
                    orderId: order.id,
                    orderDate: order.orderDate,
                    total: order.total.toLocaleString(),
                    status: (order.status == 1?<span style={{color:"green", fontWeight:"600"}}> Đợi lấy hàng</span> :(order.status == 2?<span style={{color:"red", fontWeight:"600"}}>Đã từ chối</span>:<span>Đợi xác nhận</span>)),
                    action:(
                        <div style={{ display:'flex', justifyContent:'flex-start' }}>
                            {
                                 order.isPayment == 0 && order.status !=2 ?  <>
                                {/* <Button>Thanh toán</Button> */}
                                    <ButtonAntd orderId={order.id} type='payment' text="Thanh toán" />
                                </> :<></>
                            }
                            <Link to={'/order-detail?id=' + order.id}>
                                <Button  >Xem chi tiết</Button>
                            </Link>
                        </div>
                    ) 
                });
            });
            setOrders(tmp);
            setIsLoading(false);
        }).catch((err)=>{
            setIsLoading(false);
        })
    }

    useEffect(()=>{
        document.title = "Đơn hàng";
        getData();
    },[])
    return(
        <Spin spinning={isLoading}>
        <Table pagination={false} columns={columns} dataSource={orders}></Table>
        </Spin>
    )
}
export default OrdersPage;