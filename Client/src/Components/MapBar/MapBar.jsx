import React from 'react'
import './mapbar.scss'

// SEARCH BAR IN THE MAP COMPONENT

export default function MapBar({ update }) {
    return (
        <div className="search-bar">
            <form onSubmit={update} id="search" className="search-bar__form">
                <input name="address" className="search-bar__address" placeholder="Address: Street, City, Province"/>
                <button className="search-bar__address-button">Let's Go</button>
            </form>
        </div>
    )
}
