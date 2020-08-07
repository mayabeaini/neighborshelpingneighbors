import React from 'react'
import './cartitems.scss'

export default function CartItems({items}) {
  return (
    <div className="test">
      {items.map(item =>{
      return(
        <div key={item.id} className="cart-items--parter cart-items">
          <div className="cart-items__container">
            <img src={item.image} className="cart-items__image" alt={item.name}/>
            <div className="cart-items--space">
              <p className="cart-items__name">{item.name}</p>
              <p className="cart-items__price">${item.price}</p>
            </div>
          </div>
        </div>
      )})}
    </div>
  )
}
