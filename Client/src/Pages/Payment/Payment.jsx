import React from 'react'
import Header from '../../Components/Header/Header'
import "./payment.scss"

export default function Payment() {
    return (
        <div>
            <Header />
            <div className="payment">
                <h1 className="payment__title">Payment</h1>
                <form className="payment__form">
                    <label className="payment__fullname">
                        Full Name
                    </label>
                    <input type="text" className="payment__name" name="fullName" placeholder="enter your full name" />
                    <label className="payment__method">
                        Payment Method
                    </label>
                    <select className="payment__select" name="method">
                        <option value="e-transfer">E-transfer</option>
                        <option value="cash">Cash</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="debit-card">Debit Card</option>
                    </select>
                    <button className="payment__button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
