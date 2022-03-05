import React, {useState, useEffect} from 'react';
// import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Questions() {

    const [questions, setQuestions]=useState([]);
    const [error, setError] = useState('');
    // const [redirect, setRedirect] = useState(false);

    const navigate= useNavigate();

    const getQuestions = (token) => {
        axios.get(`http://localhost:5000/all-questions`, {
            headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                setQuestions(res.data);
            })
            .catch(err=> {
                setError(err.response.data);
            })
    }
    useEffect( () =>{

        const token=localStorage.getItem('user');
        if(token) {
            // const user=jwt.decode(token);
            // if(!user) {
            //     localStorage.removeItem('user');
            //     window.location.href=('/');
            //     // useNavigate('/');
            // }
            // else getQuestions(token);
            getQuestions(token);
        }
        else {
            navigate('/');
        }
    },[navigate]);

    return (
        <div>
            <h3>Questions dashboard</h3>
            {questions.length>0 && ( questions.map( (question, index) => 
                (<div key={index} className='question'>
                    <label>Question: {question.question}</label>
                    <label >Description: {question.description}</label>
                    <label >Created at: {question.createdAt}</label>
                    <label >Last updated at: {question.updatedAt}</label>
                </div>)))}
            
            {error && <p className='errors'>{error}</p>}
        </div>
    )
}
