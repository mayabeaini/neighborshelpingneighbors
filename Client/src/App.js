import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios'
import PrivateRoute from './Components/PrivateRoute';
import LoginPage from './Pages/LoginPage';
import ProtectedPage from './Pages/ProtectedPage';
import MapPage from './Pages/Map/MapPage';
import Home from './Pages/Home/Home'
import Search from './Pages/Search/Search';
import Delivery from './Pages/Delivery/Delivery';
import About from './Pages/About/About';
import Cart from './Pages/Cart/Cart';
import OrderForm from './Pages/OrderForm/OrderForm';
import Payment from './Pages/Payment/Payment';
import Presentation from './Pages/Presentation/Presentation'
import './App.scss';


// Authentication server + API URL
export const apiUrl = 'http://localhost:8080';
 
// api get all users
export const apiUsers = "/user"

// api get all orders
export const apiOrders = "/order"

// api get all items
export const apiItems = "/item"

export const apiItemOrder = "/item-order"

export default class App extends Component {
  state={
    data:[],
    personalGoogleId: [],
  }

  maya = () => {
    axios.get(`${apiUrl}${apiOrders}`)
    .then(res =>{
      this.setState({
        data : res.data.orders,
      })
    })
    .catch(err => console.error("You just got an error",err))

  }
  componentDidMount(){
    this.maya()
  }
  
  // PROPPED TO PROTECTED PAGE COMPONENT TO HAVE ACCESS TO GOOGLEID WHEN LOGGED IN
  getGoogleId = (id) => {
    this.setState({
      personalGoogleId: id
    })
    console.log(this.state.personalGoogleId)
  }



  render() {
   return (
     <Router>
       <Route path="/presentation" component={Presentation} />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/cart" component={Cart} />
        <Route path="/search" component={Search}/>
        <Route path="/map" ><MapPage data={this.state.data} maya={this.maya} /></Route>
        <Route path="/orderform" component={OrderForm} />
        <Route path="/payment" component={Payment} />
        <Route path="/login" component={LoginPage}/>
        <PrivateRoute path="/profile"
          component={ProtectedPage} 
          getGoogleId={this.getGoogleId}
        />
     </Router>
   )
 }
}