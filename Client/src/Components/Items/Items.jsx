import React from 'react'
import './items.scss'

// SEARCH PAGE RESULT COMPONENT

export default function Items({items, itemSubmit, test}) {
    
    return (
        <div>
        {items.map(item => {
            return(
                <div className="items__result" key={item.id}>
                    <div className="items__info">
                        <img src={item.image} className="items__image" alt={item.name}/>
                        <div className="items__info--margin">
                                <p className="items__name">{item.name}</p>
                                <p className="items__price">${item.price}</p>
                            <button onClick={() => itemSubmit(item.id)} className="items__add-me">Add Me to Cart</button>
                        </div>
                    </div>
                    <p className="items__description">{item.description}</p>
                    {/* itemSubmit(item.id) */}
                </div>
            )
        })}
    </div>
)
}
