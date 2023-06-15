import { Container } from "react-bootstrap";
import './Product.css';
import Cards from "../../Components/Cards/Cards";
import Instance from "../../InstanceAxios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Empty } from "antd";

function Product() {
  const [listProduct, setListProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useSearchParams();
  useEffect(()=>{
    document.title="Sản phẩm";
},[])
  useEffect( ()=>{
    let api="product?"+search;
    // if(search.has("category")){
    //   api+="?category="+search.get("category");
    // }
    // if(search.has("brand")){
    //   api+="?brand="+search.get("brand");
    // }
    // if(search.has("search"))
    console.log(api)
    const getData = async ()=>{
      setLoading(true);
      await Instance.get(api).then(
        (response)=>{
            setListProduct(response.data);
            setLoading(false);
            // console.log(listProduct.length);
        }
      ).catch((error)=>{
          console.log(error);
      })
    }
    getData();
  },[search]);
  return (
    <Container>
    {
      loading?<></>:<div id="body">
         {
            listProduct.length == 0? <div style={{  width:'100%', display: 'inline-block', justifyContent:'center' }}><Empty/></div> :
            listProduct.map((item)=><Cards key={item.id} data={item}/>)
         }
      </div>
    }
    </Container>
  );
}

export default Product;
