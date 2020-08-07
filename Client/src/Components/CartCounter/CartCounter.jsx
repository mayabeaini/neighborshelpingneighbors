import React from 'react'
import cart from '../../assets/icons/cart-outline.svg'
import './cartcounter.scss'

export default function CartCounter ({order_length}) {
    // Icon in top right side of the search page
    return (
        <div>
            <div className="counter__dot">{order_length}</div>
            <img src={cart} className="counter__cart" alt="cart icon"/>
        </div>
    )
}
