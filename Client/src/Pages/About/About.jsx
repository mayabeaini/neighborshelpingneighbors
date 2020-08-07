import React from 'react'
import Header from '../../Components/Header/Header'
import linkedin from '../../assets/icons/logo-linkedin.svg'
import github from '../../assets/icons/logo-github.svg'
import email from '../../assets/icons/mail-outline.svg'
import './about.scss'

export default function About() {
  return (
    <>
      <Header />
      <div className="about">
        {/* <div className="about__help">
          <h2>Neighbors Helping Neighbors</h2>
          <p>this app is to fehfiewhrqioeh</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et praesentium, perferendis aut delectus quisquam iste, ea, sed dignissimos repellendus ut inventore autem! Quo dolore doloremque porro deleniti reiciendis consectetur nam.</p>
        </div> */}
        <div className="about__me">
          <h1 className="about__title">About Me</h1>
          <p className="about__name"> - Maya Beaini - </p>  
          <p className="about__web">Full-Stack Web Developer</p>
          <p className="about__reach">BrainStation Graduate - Spring 2020</p>
          {/* <p className="about__">My name is Maya Beaini</p> */}
          <p className="about__reachme">You can reach me at:</p>
          <a href="mailto:beaini.maya@gmail.com">
            <img className="header__icon" src={email} alt="email icon"/>
            <p>beaini.maya@gmail.com</p>
          </a>
          <a href="https://www.linkedin.com/in/maya-beaini/" target="_blank">
            <img className="header__icon" src={linkedin} alt="linkedin icon"/>
            <p>https://www.linkedin.com/in/maya-beaini/</p>
          </a>
          <a href="https://github.com/mayabeaini" target="_blank">
            <img className="header__icon" src={github} alt="github icon"/>
            <p>https://github.com/mayabeaini</p>
          </a>
        </div>
      </div>
    </>
  )
}
