import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Header from '../../Components/Header/Header';
import {apiUrl, apiOrders} from '../../App'
import arrow from '../../assets/icons/arrow-forward-outline.svg'
import './orderform.scss'

// GEOCODE API
const googleApi = "https://maps.googleapis.com/maps/api/geocode/json?address="

// GOOGLE API KEY
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY


export default function OrderForm() {

  const orderSubmit = (event) => {
    event.preventDefault();
    if (event.target.address.value === ''){
      alert("please fill input")
    } else {
      const stg = event.target.address.value
      const newStrg = stg.replace(/ /g, '+')
      
      axios.get(`${googleApi}${newStrg}${googleApiKey}`)
        .then(res=>{
          const lat= res.data.results[0].geometry.location.lat;
          const lng =res.data.results[0].geometry.location.lng;
          const address = res.data.results[0].formatted_address;
          axios.post(`${apiUrl}${apiOrders}`,{
            address: address,
            totalprice:"0",
            user_id: 4,
            lng: lat,
            lat: lng,
            status:"cart",
          })
          // .then(res=>console.log(res))
          .catch(err => console.error("You just got an error: ", err))
        })
        .catch(err => console.error("You just got an error: ", err))
    }
    event.target.address.value = "";
  }

  return (
    <>
      <Header />
      <form onSubmit={orderSubmit} className="order-form">
          <h2 className="order-form__title">Pick-Up Address</h2>
          <input type="text" className="order-form__address" name="address" placeholder="insert your address" />
          <button className="order-form__submit">Submit</button>
      </form>
      <Link to="/search">
          <img src={arrow} className="order-form__icon" alt="arrow to continue"/>
      </Link>
    </>
  )
}
