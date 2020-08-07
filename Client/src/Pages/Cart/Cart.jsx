import React from 'react';
import axios from 'axios'
import Header from '../../Components/Header/Header';
import CartItems from '../../Components/CartItems/CartItems'
import {apiUrl, apiOrders, apiUsers} from '../../App'
import './cart.scss'

export default class Cart extends React.Component {
  state={
    items:[],
    status:[],
    price:[]
  }
  
  // I HAVEN'T SET UP THE LOGIN'S CONNECTION TO THE DATABASE YET, THIS IS A SMALL CHEAT
  // ONCE THE USER ID IS GOTTEN FROM THE GOOGLE ID THEN IT WILL BE PROPPED DOWN TO ALL COMPONENTS
  // THE NUMBER 4 WILL BE REPLACED WITH A VARIABLE WITH THE VALUE OF USER ID
  componentDidMount(){
    axios.get(`${apiUrl}${apiUsers}/4`)
    .then((res) => {
      axios.get(`${apiUrl}${apiOrders}/`+ res.data.orders[res.data.orders.length-1].id)
        .then(res => {
          this.setState({
          items: res.data.orders.items,
          status: res.data.orders.status,
          price: res.data.orders.totalprice
        })
        })
        .catch(err => console.error("You just got an error: ", err))
    })
    .catch(err => console.error("You just got an error: ", err))
  }

  saveClick = (e) => {
    e.preventDefault();
    axios.put(`${apiUrl}${apiOrders}/4`,{
      status: "ready"
    })
  }
  render() {
    return (
      <>
        <Header />
        <div className="cart">
          <h1 className="cart__title">Cart</h1>
          {/* TOTAL PRICE FUNCTION IS NOT SET YET, AND ALSO IS NOT ADDED IN THE ONCLICK FUNCTIONALITY TO .PUT() */}
          <h5 className="cart__price">total Price: ${this.state.price}</h5>
          <CartItems items={this.state.items} />
          <button onClick={this.saveClick} className="cart__button">place Order</button>
        </div>
      </>
    )
  }
}