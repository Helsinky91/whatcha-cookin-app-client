import React from 'react'
import {Link} from 'react-router-dom'
import githubLogo from "../assets/github.png"

function Footer() {
  return (
    <div class="footer">
        <div>
            <p> Developed by Yago and Helena @Ironhack 🚀</p>
        </div>
        <div>
            <p><Link to="https://github.com/Helsinky91/whatcha-cookin-app-client"><img src={githubLogo} alt="GithubLogo" width={25} /> </Link> </p>    
        </div>
    </div>
  )
}

export default Footer