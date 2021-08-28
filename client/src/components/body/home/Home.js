import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function Home() {
    return (
        <div className="home_page">
           <div  class="in">
               <h1>Unlimited  Videos Study Materials,  Audio, Notes and more.</h1>
               <h4>Watch anywhere. Cancel anytime.Ready to watch? </h4>
               <h5>Enter your email to create or restart your membership.</h5>
               <input type="text" placeholder ="Enter Your Email Address" /><Link to="/register" class="btn sm btn-danger"> Get Started</Link>
           </div>
        </div>
    )
}

export default Home
