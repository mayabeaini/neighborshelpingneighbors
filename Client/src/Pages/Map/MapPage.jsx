import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import InfoWindowEx from '../../Components/InfoWindow/InfoWindow'
import MapBar from '../../Components/MapBar/MapBar';
import Headers from '../../Components/Header/Header'
import {apiUrl, apiOrders} from '../../App'
import location from '../../assets/icons/location-sharp.svg'
import pin from '../../assets/icons/pin-sharp.svg'
import './mappage.scss'



// STYLING OF THE MAP
const mapStyles = {
  width: '90vw',
  height: '70vh',
  margin: "auto",
  marginTop: "0",
};

// GEOCODE API
const googleApi = "https://maps.googleapis.com/maps/api/geocode/json?address="

// GOOGLE API KEY
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY

export class MapPage extends Component {
  state={
  showingInfoWindow:false,
  activeMarker:{},
  selectedPlace: {},
  // LAT LNG FOR THE PERSONAL LOCATION AND MAP CENTER
  lat: [],
  lng: [],
}

// FOR THE INFO WINDOW TO SHOW
onMarkerClick = (props, marker, e) => {
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
}

// FOR THE INFO WINDOW TO CLOSE
onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

// UPDATES THE CURRENT LOCATION ON MAP
update = (event) => {
  event.preventDefault();
  if (event.target.address.value === ''){
    alert("please fill input")
  } else {
    // TAKES ADDRESS INPUT AND PLACES + SIGNS IN PLACE OF SPACE
    const stg = event.target.address.value
    const newStrg = stg.replace(/ /g, '+')
    // TAKES THE STRING AND PLACES IT IN GEOCODE API TO GET LAT & LNG
    axios.get(`${googleApi}${newStrg}${googleApiKey}`)
      .then(res=>{
        this.setState({
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng
        })
      })
      .catch(err => console.error("You just got an error: ", err))
  }
  event.target.address.value = '';
}

// ORDER THAT YOU WANT TO DELIVER TO: CHANGES STATUS & ADDS YOUR USER ID TO THE DELIVERY ONE
acceptOrder = (e) => {
  e.preventDefault();
  axios.put(`${apiUrl}${apiOrders}/`+ this.state.selectedPlace.id,{
    status: "deliver",
    delivery_id: 4,
  })
  .then(() => {
    this.props.maya();
    this.onClose()
  })
  // .then(this.onClose)
  .catch(err => console.error("You just got an error: ", err))
}

  render() {
    return (
      <>
        <Headers />
        <div className="map">
          <div className="map__intro">
            <h2 className="map__title">Map</h2>
            <p className="map__info">type your address in and find orders around you to help your fellow neighbors out</p>
          </div>
          <MapBar update={this.update} />
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
            }}
            center ={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
           >
            {/* CURRENT LOCATION MARKER (YOUR OWN), VISIBLE WHEN THE LAT AND LNG ARE SET */}
            <Marker 
              position={{lat: this.state.lat, lng: this.state.lng}} 
              visible={this.state.lng == '' ? false : true}
              icon={{
                url: location ,
                scaledSize: new window.google.maps.Size(25,25)
              }}
            />
            {this.props.data.map(item => {
              // ONLY SHOWS READY STATUSES
              if (item.status === "ready"){
              return(
                // OTHER ORDERS MARKERS
                <Marker 
                  key={item.id} 
                  position={{lat:item.lat, lng:item.lng}} 
                  onClick={this.onMarkerClick}
                  address={item.address}
                  price={item.totalprice}
                  status={item.status}
                  id={item.id}
                  icon={{
                    url: pin ,
                    scaledSize: new window.google.maps.Size(25,25)
                  }}
                />
              )
            }
            })}
            <InfoWindowEx
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div className="map__window">
                <h4 className="map__address">{this.state.selectedPlace.address}</h4>
                <p className="map__price">${this.state.selectedPlace.price}</p>
                <button type="button" className="map__accept" onClick={this.acceptOrder}>Accept Order</button>
              </div>
            </InfoWindowEx>
          </Map>
        </div>
      </>
    );
  }
}

// WRAPS ALL THE COMPONENT WITH THE GOOGLE API
export default GoogleApiWrapper({
  apiKey: googleApiKey
})(MapPage);