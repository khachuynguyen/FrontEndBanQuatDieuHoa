import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, redirect, Routes, Redirect  } from 'react-router-dom';
import {  Container } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import LoginPage from './Pages/Login/Login';
import Product from './Pages/Product/Product';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Carts from './Pages/Cart/Cart';
import HomePage from './Pages/Home';
import Register from './Pages/Register/Register';
import ProductManagement from './Pages/Management/ProductManagement';
import EditProduct from './Pages/EditProduct';
import OrdersPage from './Pages/OrderPage';
import SuccessPayment from './Pages/Success';
import OrderManagement from './Pages/Management/OrderManagement';
import OderDetailPage from './Pages/OrderDetail';
import UserManagement from './Pages/Management/UserManagement';
import TransporterManagement from './Pages/Management/TransporterManagement';
import PaymentInfo from './Pages/PaymentInfo';

function App() {
  const role = localStorage.getItem("role");
  return (
    <Container id='container' fluid="auto">
    <Router>
    <NavigationBar></NavigationBar>
      <Routes>
        <Route path='/login' Component={LoginPage}></Route>
        <Route path='/home' Component={HomePage}></Route>
        <Route path='/' Component={HomePage}></Route>
        <Route path='/product' Component={Product}></Route>
        <Route path='/product-detail' Component={ProductDetail}></Route>
        <Route path='/cart' Component={Carts}></Route>
        <Route path='/register' Component={Register}></Route>
        <Route path='/product-management' Component={ProductManagement}></Route>
        <Route path='/edit' Component={EditProduct}></Route>
        <Route path='/order' Component={OrdersPage}></Route>
        <Route path='/success' Component={SuccessPayment}></Route>
        <Route path='/order-management' Component={OrderManagement}></Route>
        <Route path='/order-detail' Component={OderDetailPage}></Route>
        <Route path='/user-management' Component={UserManagement}></Route>
        <Route path='/transporter' Component={TransporterManagement}></Route>
        <Route path='/payment-info' Component={PaymentInfo}></Route>
      </Routes>
    </Router>
    </Container>
  );
}

export default App;
