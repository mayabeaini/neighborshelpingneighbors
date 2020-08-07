import React from 'react'
import { Link } from 'react-router-dom'
import AuthButton from '../AuthButton'
import cart from '../../assets/icons/cart-outline.svg'
import search from '../../assets/icons/search-outline.svg'
import menu from '../../assets/icons/ellipsis-horizontal-outline.svg'
import map from '../../assets/icons/navigate-outline.svg'
import delivery from '../../assets/icons/delivery.png'
import info from '../../assets/icons/information-circle-outline.svg'
import profile from '../../assets/icons/person-outline.svg'
import payment from "../../assets/icons/card-outline.svg"
import './header.scss'

export default class Header extends React.Component {
    state={
        display: false
    }

    // menu list to appear and disappear when ellipsis is clicked
    menu = () => {
        this.setState({ display: !this.state.display })
    }
    render() {
    return (
        <div className="header">
            <Link to="/profile" className="header__logo-link">
                <p className="header__logo">O</p>
            </Link>
            <div className="header__bar">
                {/* CHANGES ACCORDING TO WHETHER THE ELLIPSIS IS CLICKED OR NOT */}
                <div className={`${this.state.display ? "header__menu" : "header__hide"}`}>
                    {/* <div> */}
                        <Link to="/orderform">
                            <img src={search} className="header__icon" alt="search Icon"/>
                        </Link>
                        <Link to="/cart">
                            <img src={cart} className="header__icon" alt="shopping cart icon"/>
                        </Link>
                        <Link to="/map">
                            <img src={map} className="header__icon" alt="map icon"/>
                        </Link>
                        <Link to="/delivery">
                            <img src={delivery} className="header__icon header__delivery" alt="delivery cart icon"/>
                        </Link>
                    {/* </div> */}
                    {/* <div> */}
                        <Link to="/about">
                            <img src={info} className="header__icon" alt="info icon"/>
                        </Link>
                        <Link to="/profile">
                            <img src={profile} className="header__icon" alt="profile icon"/>
                        </Link>
                        <Link to="/payment">
                            <img src={payment} className="header__icon" alt="payment icon"/>
                        </Link>
                        <AuthButton />
                    {/* </div> */}
                </div>
                {/* ELLIPSIS */}
                <div>
                    <img src={menu} className="header__menu-icon" alt="Menu icon" onClick={this.menu} />
                </div>
            </div>
        </div>
    )
}
}