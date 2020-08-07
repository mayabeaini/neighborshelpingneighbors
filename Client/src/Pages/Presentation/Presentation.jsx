import React from 'react'
import PreLoginHeader from '../../Components/PreLoginHeader/PreLoginHeader'
import express from '../../assets/icons/Expressjs.png'
import html from '../../assets/icons/HTML5_Badge.svg.png'
import mysql from '../../assets/icons/mysql.svg'
import node from '../../assets/icons/Node.js_logo.svg.png'
import react from '../../assets/icons/React-icon.svg.png'
import sass from '../../assets/icons/Sass_Logo_Color.svg.png'
import google from '../../assets/icons/touchicon-180.png'
import './presentation.scss'

export default function Presentation() {
    return (
        <>
            <PreLoginHeader />
            <div className="presentation">
                <h1 className="presentation__title">Neighbors Helping Neighbors</h1>
                <h3 className="presentation__by">Maya Beaini</h3>
                <p className="presentation__par">a web-app, aspiring to be a mobile-app, designed to let people in your community deliver groceries on behalf of the vulnerable or very busy people with little to no contact</p>

                {/* <p className="presentation__web">Web Developer Graduate from BrainStation - Spring 2020</p> */}

                <div className="presentation__container">
                    <h3 className="presentation__duration">Duration:</h3>
                    <p className="presentation__days">10 days</p>

                    <h2 className="presentation__tool">Tools Used</h2>
                </div>

                <div className="presentation__image">
                    <img className="presentation__google" src={google} alt="google logo"/>
                    <img className="presentation__express" src={express} alt="express logo"/>
                    <img className="presentation__sass" src={sass} alt="sass logo"/>
                    <img className="presentation__html" src={html} alt="html logo"/>
                    <img className="presentation__node" src={node} alt="node logo"/>
                    <img className="presentation__react" src={react} alt="react logo"/>
                    <img className="presentation__mysql" src={mysql} alt="mysql logo"/>
                </div>
            </div>
        </>
    )
}
