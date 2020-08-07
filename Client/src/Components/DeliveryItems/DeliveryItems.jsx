import React from 'react'

export default function DeliveryItems({items}) {
  return (
    <div >
      {items.map(item => {
       return(
        <div className="delivery__parts" key={item.id}>
          <img src={item.image} className="delivery__image" alt={item.name}/>
          <div className="delivery__info">
            <p className="delivery__name">{item.name}</p>
            <div className="delivery__info--align">
              <p className="delivery__price">${item.price} </p>
              {/* PHASE 2: AMOUNT FUNCTIONALITY */}
              <p className="delivery__amount">Amount: 1</p>
            </div>
          </div>
        </div>
      )})}
    </div>
    )
}
