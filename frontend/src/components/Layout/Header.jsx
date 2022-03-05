import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Header(props) {
  // console.log(props);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/login");
  }

  return (
    <div className="header">
        <h1>
            <Link className='project-info' to="/">MATRIX MASTER COMMUNITY</Link>
        </h1>
        { props.token ?
          <div className='logout'>
            <p>Welcome {props.user}</p>
            <button className="btn btn-warning logout" onClick={handleLogout} >Logout</button>
          </div>
        :
          <div>
            <Link className="btn btn-info btn-sm btn-login" to="/login">Login</Link>
            <Link className="btn btn-info btn-sm btn-signup" to="/signup">Sign Up</Link>
          </div>
        }
              
        
        
    </div>
  )
}

