import React from 'react'
import {Link} from 'react-router-dom'
import PreLoginHeader from '../../Components/PreLoginHeader/PreLoginHeader'
import './home.scss'

export default function Home() {
  return (
    <>
      <PreLoginHeader />
      <div className="home">
        <h1 className="home__welcome">Welcome!</h1>
        <p className="home__paragraph">Our belief is that progress is one kindness away. </p>
        <p className="home__paragraph">

        Don't know who to help?
        </p>
        <p className="home__paragraph">

        Have no fear! This app lets you help your community without contacting them.
        </p>
        <p className="home__paragraph">
        ...An introvert's wildest dream...
        </p>
        <Link to="/profile" style={{textDecoration:"none"}} className="home__link" >
          <button className="home__button">Login to Continue</button>
        </Link>
      </div>
    </>
  )
}
