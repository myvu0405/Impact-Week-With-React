import React, {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode';  

export default function Header() {

  const [username, setUsername]=useState('');
  const navigate = useNavigate();
  let token=localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/login");
  }

  useEffect( () => {
    if(token) {
        const decoded = jwt_decode(token);
        setUsername(decoded.username);
    }
    else {
        setUsername('');
    }

},[]);

  return (
    <div className="header">
        <h1>
            <Link className='project-info' to="/">MATRIX MASTER COMMUNITY</Link>
        </h1>
        { username ?
          <div className='logout'>
            <p>Welcome {username}</p>
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

