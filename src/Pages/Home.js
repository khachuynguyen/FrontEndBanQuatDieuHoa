import { Button } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import home from '../assets/Home.jpg'
import { useEffect } from "react";
function HomePage() {
    var price = 5550000;
    useEffect(()=>{
        document.title="Trang chủ";
    },[])
    return ( 
        <Container style={{ marginTop:'100px' }}>
            <Row>
                <Col>
                    <div style={{ marginTop:'100px' }}>
                        <div style={{ display:'flex', justifyContent:'center' }}>
                            
                        <h1>Air Conditioner Fan</h1>
                        </div>
                        <p>The fan comes with 2 boxes of dry ice to help cool more effectively on peak hot days.
                        <br></br>This is a type of chemical ice, when you want to cool, put the box of dry ice in the freezer compartment (this ice can be reused), then put it in the fan's water tank, the dry ice will have a cooling effect. Water helps to keep the steam coming out cooler.
                        <br></br>
In case your home does not have a refrigerator to freeze dry ice, you can still use a fan to cool it normally with water.</p>
                    </div>
                    <div style={{ display:'flex', justifyContent:'center' }}>
                    <Link style={{ textDecoration:'none' }} to={'/product'}>
                        <Button style={{ backgroundColor:'#44d926', color:'white', width:'250px', height:'50px', borderRadius:'20px' }}>Explore more</Button>
                        </Link>
                    </div>
                </Col>
                <Col>
                <div style={{ marginTop:'10px' }}>
                    <img src={home}></img>
                    <div style={{ display:'flex', justifyContent:'center', flexDirection:'row' }}>
                    <h3 >Kangaroo</h3>
                    </div>
                    <div style={{ display:'flex', justifyContent:'center', flexDirection:'row' }}>
                    <h5>{price.toLocaleString()}</h5>
                    </div>
                    
                </div>
                </Col>
            </Row>
        </Container>
     );
}

export default HomePage;