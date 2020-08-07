import React, { Component } from 'react'
import axios from 'axios'
import Header from '../../Components/Header/Header'
import DeliveryItems from '../../Components/DeliveryItems/DeliveryItems'
import {apiUrl, apiUsers, apiOrders} from '../../App'
import './delivery.scss'

export default class Delivery extends Component {
  state={
    orders:[],
    items:[]
  }

  componentDidMount(){
    axios.get(`${apiUrl}${apiUsers}/4`)
      .then(res=> {
        // IN THEORY ALL THE ORDERS ARE PUSHED WHEN POSTED SO IT SHOULD BE LAST INDEX OF ARRAY
        // MAYBE SAFER BET IS TO FIND IT VIA STATUS
        axios.get(`${apiUrl}${apiOrders}/`+ res.data.deliveries[res.data.deliveries.length-1].id)
        .then(res =>{ 
          this.setState({
            orders: res.data.orders,
            items: res.data.orders.items
          })
        })
        .catch(err => console.error("You just got an error: ", err))
      })
      .catch(err => console.error("You just got an error: ", err))
  }
  
  render() {
    return (
      <>
        <Header />
        <div className="delivery">
          <h1 className="delivery__title">Delivery</h1>
          <h3 className="delivery__drop">Drop Off Point:</h3>
          <p className="delivery__address">{this.state.orders.address}</p>
          <h3 className="delivery__items">Items</h3>
          <DeliveryItems items={this.state.items} />
          {/* Non functional yet */}
          <button className="delivery__done">Done</button>
        </div>
      </>
    )
  }
}
