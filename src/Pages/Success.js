import { Spin } from "antd";
import { useSearchParams } from "react-router-dom";
import Instance from "../InstanceAxios";
import { useEffect } from "react";

function SuccessPayment() {
  const [search, setSearch] = useSearchParams();
  let api = "payment?" + search;
  const token = localStorage.getItem("token");
  console.log(api);
  const doPayment = async ()=>{
    await Instance.post(api,{},{
        headers: {
            Authorization: "Bearer " + token,
          },
    })
    .then((res)=>{
        window.location.assign('order');
        console.log(res);
    }).catch((err)=>{
        console.log(err);
        // window.location.assign('order');
    })
  } 
  useEffect(()=>{
    if (search.get("vnp_ResponseCode").toString() == "00") {
        doPayment();
  } else {
    window.location.assign('order');
  }
  },[])
  
  return <Spin spinning={true}></Spin>;
}

export default SuccessPayment;
