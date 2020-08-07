import React, { Component } from 'react';
import PreLoginHeader from "../../Components/PreLoginHeader/PreLoginHeader"
import { apiUrl } from '../../App';
import google from "../../assets/icons/Google__G__Logo.svg"
import facebook from "../../assets/icons/124010.png"
import './loginpage.scss'

// THE FACEBOOK BUTTON IS FOR FUTURE FUNCTIONALITY
// FOR NOW, IT TAKES YOU TO THE GOOGLE ONE

class Login extends Component {
 login = () => {
   const { from } = this.props.location.state || { from: { pathname: '/' } };
   const url = `${window.location.protocol}//${window.location.host}${from.pathname}`
   window.location = `${apiUrl}/login/?from=${url}`;
 }
 
 render() {
   return (
     <>
      <PreLoginHeader />
      <div className="login">
        <button className="login__button login__button-google" onClick={this.login}><img src={google} className="login__google" alt="google icon"/> Sign in with Google</button>
        <button className="login__button login__button-facebook" onClick={this.login}><img src={facebook} className="login__facebook" alt="google icon"/> Login with Facebook</button>
      </div>
     </>
   )
 }
}

export default Login;
