import React from 'react'
import {Link} from 'react-router-dom'
import './preloginheader.scss'

// AS NAME SUGGESTS: PRELOGIN HEADER

export default function PreLoginHeader() {
    return (
        <div className="header align">
            <Link to="/" style={{textDecoration:"none"}}>
                <p className="header__logo">O</p>
            </Link>
        </div>
    )
}
