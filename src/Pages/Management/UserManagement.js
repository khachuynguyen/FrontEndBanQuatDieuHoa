import { Button, Space, Spin, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Instance from "../../InstanceAxios";
import ButtonAntd from "../../Components/ButtonAntd";

const columns = [
    {
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
        title: 'UserName',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'FullName',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
    },
]
const data = [
    {
        userId: "orderId1",
        userName:"1232",
        fullName: "fullName",
        address: "adres",
        phone:"12312",
        role:"user",
        action:"xóa"
      }
]
function UserManagement() {
    let isAdmin = localStorage.getItem('role')?.toUpperCase()=="ADMIN"?true:false;
    const [search,setSearch] = useSearchParams();
    if(search.has('manufacturer'))
        window.location.assign('/');
    const token = localStorage.getItem('token');
    if(!isAdmin)
        window.location.assign('/');
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getData = async()=>{
        await Instance.get('admin/user',{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            console.log(res.data);
            let tmp= [];
            res.data.forEach(user => {
                tmp.push({
                    userId: user.id,
                    userName: user.userName,
                    fullName: user.fullName,
                    address: user.address,
                    phone: user.phone,
                    role: user.role,
                    action: (
                        <div style={{display:"flex", justifyContent:"space-around"}}>
                        {/* <ButtonAntd userName={user.userName} text="Chỉnh sửa" type = "updateUser"></ButtonAntd> */}
                        <ButtonAntd userId= {user.id} text="Xóa" type = "deleteUser"></ButtonAntd>
                        {/* <Button danger>Xóa</Button> */}
                        </div>
                    )
                });
            });
            setUser(tmp);
            setIsLoading(false);
        }).catch((err)=>{
            setIsLoading(false);
        })
    }

    useEffect(()=>{
        document.title = "Quản lí người dùng";
        getData();
    },[])
    return(
        <Spin spinning={false}>
        <Table pagination={false} columns={columns} dataSource={user}></Table>
        </Spin>
    )
}
export default UserManagement;