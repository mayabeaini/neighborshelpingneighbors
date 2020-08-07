import React from 'react'
import {Link} from 'react-router-dom';
import Header from '../../Components/Header/Header';
import './profile.scss'


export default function PrivatePage (props) {
  return (
    <>
      <Header />
      <div onClick={()=>props.getGoogleId(props.user.id)} className="profile">
        <h2 className="profile__title">Welcome Back!</h2>
        <h3 className="profile__name"> {props.user.name.givenName}</h3>
        <div className="profile__orders">
          <Link to="/orderform">
            <button id="place" className="profile__place profile__button">Place Order</button>
          </Link>
          <Link to="/map">
            <button className="profile__find profile__button">Deliver Order</button>
          </Link>
        </div>
      </div>
    </>
  )
}
