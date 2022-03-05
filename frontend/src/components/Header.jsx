import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';    
import {Link} from 'react-router-dom'

function Header() {

    const [username, setUsername]=useState('');
    const [email, setEmail] = useState('');
    const [isLogout, setIsLogout] = useState(false);

    const navigate= useNavigate();
    let token=localStorage.getItem('user');


    useEffect( () => {
        if(token) {
            const decoded = jwt_decode(token);
            setUsername(decoded.username);
            setEmail(decoded.email);
        }
        else {
            setUsername('');
            setEmail('');
        }

    },[isLogout,token]);

    const logOut = () => {
        localStorage.removeItem('user');
        setIsLogout(true);
        navigate('/');
    }

    return (
        <div className='header'>
            <h2>Impact Project with React</h2>
            <div className='header-links'>
                {!username && <h4><Link to='/login'>Login</Link></h4>}
                {!username && <h4><Link to='/signup'>Signup</Link></h4>}
                {username && <h4><Link to='/questions'>All Questions</Link></h4>}
                {username && <h4><button onClick={logOut}>Logout</button></h4>}

            </div>
            {username && <label>Welcome {username} ({email})</label>}
        </div>
    )
}

export default Header