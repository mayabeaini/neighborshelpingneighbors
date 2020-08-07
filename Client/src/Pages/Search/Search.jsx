import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Header from '../../Components/Header/Header'
import Items from '../../Components/Items/Items'
import CartCounter from '../../Components/CartCounter/CartCounter'
import {apiUrl, apiItems, apiOrders, apiItemOrder, apiUsers} from '../../App'
import search from '../../assets/icons/search-outline.svg'
import './search.scss'

export default class Search extends React.Component {
  state={
    items: [],
    order_length:[],
    order_id: [],
    total_price:[],
    order_price:[],
  }

  componentDidMount(){
    axios.get(`${apiUrl}${apiUsers}/4`)
      .then(res => {
        this.setState({
          order_id: res.data.orders[res.data.orders.length-1].id
        })
        axios.get(`${apiUrl}${apiOrders}/`+ res.data.orders[res.data.orders.length-1].id)
          .then(res => {
            this.setState({
              order_length: res.data.orders.items.length
            })
          })
          .catch(err => console.error("You just got an error: ", err))
      })
      .catch(err => console.error("You just got an error: ", err))
  }

//   POSTS THE ITEMS TO THE APPROPRIATE ORDER ID
  itemSubmit = (key) => {
    axios.post(`${apiUrl}${apiItemOrder}`,{
      order_id: this.state.order_id,
      item_id: key
    })
    .then(()=>{
      axios.get(`${apiUrl}${apiOrders}/`+ this.state.order_id)
        .then(res => {
          this.setState({
            order_length: res.data.orders.items.length,
            total_price: res.data.orders.totalprice
          })
          // .then(response => {
            // axios.put(``)
          // })
        })
        .catch(err => console.error("You just got an error: ", err))
    })
    axios.get(`${apiUrl}${apiItems}/`+ key)
    .then(res => {
      this.setState({
        order_price:res.data.items.price
      });
      // BUG: IF IN SAME SEARCH THEN IT ACCUMULATES BUT WHEN CHANGE SEARCH AND ADD
      // THE TOTAL PRICE SHOWN IS THE LAST ORDER
      let x =this.state.total_price + this.state.order_price
      axios.put(`${apiUrl}${apiOrders}/`+this.state.order_id,{
        totalprice: x
      })
      .then(res=>{
        // console.log(res.data.updatedOrders.totalprice)
        this.setState({
          total_price: res.data.updatedOrders.totalprice
        })
      })
    })

    .catch(err => console.error("You just got an error: ", err))
  }

  // test = (key) => {
  //   axios.get(`${apiUrl}${apiItems}/`+ key)
  //     .then(res => {
  //       this.setState({
  //         order_price:res.data.items.price
  //       });
  //       axios.put(`${apiUrl}${apiOrders}/`+this.state.order_id,{
  //         totalprice: this.state.total_price + this.state.order_price
  //       })
  //     })

  // }

// SEARCHES THE DATABASE THROUGH THE CATEGORY KEY
  searchItem = (event) => {
    event.preventDefault();
    axios.get(`${apiUrl}${apiItems}?category=`+ event.target.item.value)
      .then(res =>{
      this.setState({
        items: res.data.items
      })
      })
      .catch(err => console.error("You just got an error: ", err))
    event.target.item.value = "";
  }

  render(){
    return (
      <>
        <Header />
        <div className="search">
          <Link to="/cart" className="search__link">
            <CartCounter order_length={this.state.order_length} />
          </Link>
          <h1 className="search__title">Search</h1>
          <div className="search__bar">
            <form onSubmit={this.searchItem} className="search__form">
              <input type="text" name="item" className="search__input" placeholder="your search starts here.." />
              <button className="search__button">
                <img src={search} className="search__icon" alt="search icon"/>
              </button>
            </form>
          </div>
          <Items itemSubmit={this.itemSubmit} test={this.test} items={this.state.items} />
        </div>
      </>
    )
  }
}
