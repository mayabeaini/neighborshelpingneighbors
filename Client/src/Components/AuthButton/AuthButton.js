import React, { Component } from 'react';
import axios from 'axios';
import { apiUrl } from '../../App';
import logout from '../../assets/icons/log-out-outline.svg'
 
class AuthButton extends Component {
 state = {
   isAuthenticated: false,
   user: null
 }
 
 componentDidMount() {
   // Check auth
   axios
     .get(`${apiUrl}/check-auth`, { withCredentials: true })
     .then(res => {
       this.setState({
         isAuthenticated: true,
         user: res.data
       });
     })
     .catch(() => {
       this.setState({
         isAuthenticated: false
       });
     });
 }
 
 signOut = () => {
   // Change location to /logout server route while passing it
   // the URL for redirecting back to a client
   const url = `${window.location.protocol}//${window.location.host}`;
   window.location = `${apiUrl}/logout?from=${url}`;
 }
 
 render() {
   // Display user name and sign out button for logged in user
   // or a "not logged in" message
   return (
     this.state.isAuthenticated && (
         <img src={logout} alt="logout icon" className="header__icon" onClick={this.signOut}/>
     )
   )
 }
}
 
export default AuthButton;
