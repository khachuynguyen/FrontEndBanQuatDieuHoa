import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import "./style.css";
import { Link } from 'react-router-dom';
function Cards(props) {
  const product = props.data;
  return (
    <Link style={{ textDecoration:'none' }} to={'/product-detail?id='+product.id}>
    <Card
      id="card"
      hoverable
      style={{
        width: 380,
        backgroundColor:'#fefefe'
      }}
      cover={
        <img style={{ objectFit:'contain' }}
        height='340px'
          id="cardimage"
          alt="example"
          src={`data:image/png;base64,${product.avatar}`}
        />
      }
    >
      <h5>{product.productName}</h5>
      <div id="card-price">
        <span id="line-through">{product.cost.toLocaleString()} đ</span>
        <span>-{product.percent} %</span>
      </div>
      <p > <h5 id="card-price">{product.price.toLocaleString()} đ</h5> </p>
      {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
    </Card>
    </Link>
  );
}

export default Cards;
