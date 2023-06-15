import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Instance from '../InstanceAxios';
import cartIcon from '../assets/cart.png';
import Searchs from './Searchs';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const [listCategory, setListCategory] = useState(null);
  const [listBrand, setListBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [cart,setCart] = useState(0);
  const getCart = async ()=>{
    await Instance.get('cart',{
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res)=>{
        setCart(res.data.length)
        // console.log(res.data.length);
    }).catch((err)=>{

    })
  }
  useEffect( ()=>{
    const getData = async ()=>{
      setLoading(true);
      await Instance.get("category").then(
        (response)=>{
          setListCategory(response.data); 
    setLoading(false);
        }
      ).catch((error)=>{
          console.log(error);
      })
    }
    const getBrand = async ()=>{
      setLoading(true);
      await Instance.get("brand").then(
        (response)=>{
          setListBrand(response.data);
    setLoading(false);
        }
      ).catch((error)=>{
          console.log(error);
      })
    }
    getData();
    getCart();
    getBrand();
  },[])
  if(loading || listBrand == null || listCategory == null)
      return <></>
      else
  return (
    <Navbar style={{ color: 'black', fontWeight:'600' }} bg="white"  expand="lg">
      <Container >
        <Navbar.Brand style={{ color: 'black' }} as={Link} to={"/"}>Logo</Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ color: 'black' }} as={Link} to={"/product"}>Product</Nav.Link>
          </Nav>
          <NavDropdown style={{margin:'5px'}} title="Category" id="basic-nav-dropdown">
            {
              loading?<></>:(
                listCategory.map((item)=><NavDropdown.Item as={Link} to={'/product?category='+item.id}  key={item.id} > {item.categoryName}</NavDropdown.Item>)
              )
            }
              {/* <NavDropdown.Item href="#action/3.1">Category1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Category2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Category3</NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown style={{margin:'5px'}} title="Brand" id="basic-nav-dropdown">
            {
              loading?<></>:(
                listBrand.map((item)=><NavDropdown.Item key={item.id} as={Link} to={'/product?brand='+item.id}>{item.brandName}</NavDropdown.Item>)
              )
            }
              {/* <NavDropdown.Item href="#action/3.1">Hang1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Hang2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Hang3</NavDropdown.Item> */}
            </NavDropdown>
            {/* <Search style={{ marginRight:'20px' }}  size='middle'></Search>
             */}
             <Searchs/>
          {
            role!=null?<>
            <Nav.Link style={{ marginRight:'20px' }}  as={Link} to={"/cart"}>
                  <div style={{ display:'inline-block' , width:'40px',position: 'relative' }}>
                      <img style={{ width:'30px', height:'30px' }} src={cartIcon}></img>
                      <sup style={{ fontWeight:'700', color:'red', position:'absolute', top:'0', right:'0' }}>{cart}</sup>
                  </div>
            </Nav.Link>
              <NavDropdown title={role == "ADMIN"?"ADMIN":"USER"} id="basic-nav-dropdown">
              {
                role == "ADMIN"?<>
                <NavDropdown.Item as={Link} to={"/order-management"}>Quản lí đơn hàng</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/product-management"}>Quản lí sản phẩm</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/user-management"}>Quản trị người dùng</NavDropdown.Item>
                </>:<>
                <NavDropdown.Item as={Link} to={'/order'}>Đơn hàng</NavDropdown.Item>
                </>
              }
                <NavDropdown.Item as={Link} to="/payment-info">Về thanh toán</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/transporter"}>Về vận chuyển</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Tài khoản</NavDropdown.Item>
              <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
            </NavDropdown>
            </>:<Nav.Link style={{ marginRight:'20px' }} href="/login">Login</Nav.Link>
          }
            {/* <Nav.Link style={{ marginRight:'20px' }} href="/cart">Cart</Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item  >Hang1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Hang2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Hang3</NavDropdown.Item>
            </NavDropdown> */}
        </Navbar.Collapse>
         
      </Container>
    </Navbar>
  );
}

export default NavigationBar;