import "./Signup.css";
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import signup_img from '../../Images/signup.jpg'
import Header from '../../Layout/Header'


const defaultUser = {
    username:'',
    email:'',
    password:'',
    password2:''
};
const defaultErrors = {
    username:'',
    email:'',
    password:'',
    password2:''
};

export default class Signup extends Component {

    constructor(props) {
        super(props);
        
        
        this.state={
            user: defaultUser,
            result:'',
            errors: defaultErrors,
            redirect: false //to decide redirection after registration
        }
    }

    setupUserData = ({target}) => {
        const user= this.state.user;
        user[target.name]= target.value;
        this.setState({
            user:user
        })
    }

    handleSignup = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signup', this.state.user)
            .then( res => {
                this.setState({
                    result:res.data,
                    // errors:defaultErrors,
                    redirect:true   //to redirect to login page when registering is successful
                })
            })
            .catch((err) => {
                this.setState({errors: err.response.data})

            })

    }
    render() {
        const {user,errors,result,redirect} = this.state;
        // console.log(errors);
        return (
        <div>
            <Header />

            <div className="signUpContainer">
                <form className="formSignUp" onSubmit={this.handleSignup}>
                    <h2>Sign up</h2>
                    <label >Username</label>
                    <input type="text" value={user.username} name="username" onChange={this.setupUserData} placeholder="Please write your username"/>
                    {errors.username && <small className='errors'>{errors.username}</small>}
                    
                    <label>Email</label>
                    <input type="text" value={user.email} name="email" onChange={this.setupUserData} placeholder="Please write your email"/>
                    {errors.email && <small className='errors'>{errors.email}</small>}
                    
                    <label >Password</label>
                    <input type="password" value={user.password} name="password" onChange={this.setupUserData} placeholder="Please write your password"/>
                    {errors.password && <small className='errors'>{errors.password}</small>}
                    
                    <label >Repeat Password</label>
                    <input type="password" value={user.password2} name="password2" onChange={this.setupUserData} placeholder="Please repeat your password"/>
                    {errors.password2 && <small className='errors'>{errors.password2}</small>}

                    <button className="btn-info" type="submit">Sign up</button>
                </form>
                <div className="imgSignUp">
                    <img src={signup_img} alt="SignUp_image" />
                 </div>
            </div>
            {redirect && <Navigate to='/login' replace={true} />}
        </div>
        )
    }
}
