import React from 'react'
import {Link } from 'react-router-dom'
import githubLogo from "../assets/github2.png"

function Footer() {

  return (
    <div className="footer">
        <div>
            <p> Developed by Yago and Helena @Ironhack 🚀</p>
        </div>
        <div>
            <p><a href="https://github.com/Helsinky91/whatcha-cookin-app-client" target="_blank"><img src={githubLogo} alt="GithubLogo" width={25} /> </a> </p>    
        </div>
    </div>
  )
}

export default Footer