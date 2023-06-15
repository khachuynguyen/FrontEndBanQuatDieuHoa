import { Button, Space, Spin, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Instance from "../../InstanceAxios";
import ButtonAntd from "../../Components/ButtonAntd";

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
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
    },
    {
        title: 'Ngày đặt hàng',
        dataIndex: 'orderDate',
        key: 'orderDate',
    },
    {
        title: 'Người nhận',
        dataIndex: 'receiverName',
        key: 'receiverName',
    },
]
const data = [
    {
        key: '1',
        orderId: "orderId1",
        total: "Tổng cộng",
        status: "Trạng thái",
        action: "thanh toán"
      }
]
function OrderManagement() {
    let isAdmin = localStorage.getItem('role')?.toUpperCase()=="ADMIN"?true:false;
    const [search,setSearch] = useSearchParams();
    const token = localStorage.getItem('token');
    if(!isAdmin)
        window.location.assign('/');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getData = async()=>{
        await Instance.get('admin/order',{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            console.log(res.data);
            let tmp= [];
            res.data.forEach(order => {
                tmp.push({
                    key: order.id,
                    orderId: order.id,
                    total: order.total.toLocaleString(),
                    status: ( (order.isPayment==1)?"Đã thanh toán, ":"Chưa thanh toán, ")+(order.status == 0 ?"Đợi xác nhận": order.status ==1 ?"Đợi lấy hàng":"Đã từ chối"),
                    action:(
                        <div style={{ display:'flex', justifyContent:'space-evenly' }}>
                            {
                                (
                                    order.status == 0 ? <>
                                    <ButtonAntd order={order} type='accept' text="Duyệt" />
                                    <ButtonAntd order={order} type='decline' text="Từ chối" />
                                    </> : <></> 
                                )
                            }
                            <Link to={'/order-detail?id=' + order.id}>
                                <Button  >Xem chi tiết</Button>
                            </Link>
                            
                        </div>
                    ) ,
                    orderDate: order.orderDate,
                    receiverName: order.receiverName
                });
            });
            setOrders(tmp);
            setIsLoading(false);
        }).catch((err)=>{
            setIsLoading(false);
        })
    }

    useEffect(()=>{
        document.title = "Quản lí đơn hàng";
        getData();
    },[])
    return(
        <Spin spinning={isLoading}>
        <Table pagination={false} columns={columns} dataSource={orders}></Table>
        </Spin>
    )
}
export default OrderManagement;