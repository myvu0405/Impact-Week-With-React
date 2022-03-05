import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Banner2 from '../../Images/Banner2.png'
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            user: "",
            errors: {
                email:'',
                password:''
            },
            redirect: false //to decide redirection after login

        }
    }
    setLoginInfo = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault();
        const {email,password} = this.state;
        const loginInfo={email,password};

        axios.post('http://localhost:5000/login', loginInfo)
            .then( res => {
                // console.log(res);
                let token= res.data.token;
                localStorage.setItem('user', token);
                
                this.setState({
                    user: res.data.username,
                    errors: {
                        email:'',
                        password:''
                    },
                    redirect:true   //to redirect to Questions page when login is successful

                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    errors: err.response.data,

                })
            })
    }
    render() {
        const {email, password, errors, redirect} = this.state;
        // console.log(this.state.user);
        return (
        <div>
                <Header />
                <div className="loginContainer">
                    <form className="formLogIn" onSubmit={this.handleLogin}>
                        <h2>Login</h2>
                        
                        <label>Email</label>
                        <input type="text" value={email} onChange={this.setLoginInfo} name="email" placeholder="Please write your email"  />
                        {errors.email && <small className='errors'>{errors.email}</small>}
                        
                        <label >Password</label>
                        <input type="password" value={password} onChange={this.setLoginInfo} name="password" placeholder="Please write your password"  />
                        {errors.password && <small className='errors'>{errors.password}</small>}
                        
                        <button className="btn-info" type="submit">Login</button>
                    </form>
                    <div className="imgLogIn">
                        <img src={Banner2} alt="Login_image" />
                    </div>
                </div>
                <Footer />
            {redirect && <Navigate to='/questions' replace={true} user={this.state.user} />}
        </div>
        )
    }
}
