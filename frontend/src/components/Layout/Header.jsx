import React from 'react'
import {Link} from 'react-router-dom'

export default function Header(props) {
  // console.log(props);
  return (
    <div className="header">
        <h1>
            <Link className='project-info' to="/">MATRIX MASTER COMMUNITY</Link>
        </h1>
        <div>
            <p>Welcome {props.user}</p>
            <Link className="btn btn-info btn-sm btn-login" to="/login">Login</Link>
            <Link className="btn btn-info btn-sm btn-signup" to="/signup">Sign Up</Link>
        </div>
        <form action="/logout" method="Post">
             <button className="btn btn-warning logout">Logout</button>
         </form>
    </div>
  )
}

